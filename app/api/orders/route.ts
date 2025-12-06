import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderId } from '@/lib/utils';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const dataStr = formData.get('data') as string;
    
    if (!dataStr) {
      return NextResponse.json(
        { error: 'Missing order data' },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataStr);
    const attachments: string[] = [];
    
    // Handle file uploads
    const files = formData.getAll('attachments') as File[];
    for (const file of files) {
      // Files should already be uploaded to S3 via /api/upload
      // Here we just collect the URLs
      attachments.push(file.name);
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderId,
        customerName: data.customerName,
        customerEmail: data.email,
        customerPhone: data.phone,
        company: data.company,
        country: data.country,
        orderType: data.orderType,
        incoterm: data.incoterm || null,
        shippingDate: data.shippingDate ? new Date(data.shippingDate) : null,
        status: 'NEW',
        notes: data.notes || null,
        attachments: attachments,
        items: {
          create: data.items.map((item: any) => ({
            productName: item.productName || 'Custom Product',
            quantity: item.quantity,
            unit: item.unit,
            packaging: item.packaging,
            customLabel: item.customLabel || null,
            productId: item.productId || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Create initial status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: 'NEW',
        notes: 'Order created',
        changedBy: 'SYSTEM',
      },
    });

    // Send notifications
    try {
      await sendOrderConfirmationEmail(order);
      await sendWhatsAppNotification(order);
    } catch (error) {
      console.error('Error sending notifications:', error);
      // Don't fail the request if notifications fail
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      message: 'Order created successfully',
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (orderId) {
      // Get single order by orderId
      const order = await prisma.order.findUnique({
        where: { orderId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          statusHistory: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ order });
    }

    // Get all orders (for admin)
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        statusHistory: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}

