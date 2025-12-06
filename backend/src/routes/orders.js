import express from 'express';
import prisma from '../config/database.js';
import { generateOrderId } from '../utils/orderId.js';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '../utils/email.js';
import { sendWhatsAppNotification } from '../utils/whatsapp.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      company,
      email,
      phone,
      country,
      orderType,
      incoterm,
      shippingDate,
      notes,
      items,
      attachments = [],
    } = req.body;

    // Validate required fields
    if (!customerName || !email || !phone || !country || !orderType || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Create order
    const order = await prisma.order.create({
      data: {
        orderId,
        customerName,
        customerEmail: email,
        customerPhone: phone,
        company: company || null,
        country,
        orderType,
        incoterm: incoterm || null,
        shippingDate: shippingDate ? new Date(shippingDate) : null,
        status: 'NEW',
        notes: notes || null,
        attachments: attachments,
        items: {
          create: items.map((item) => ({
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

    // Send notifications (non-blocking)
    Promise.all([
      sendOrderConfirmationEmail(order).catch(console.error),
      sendAdminNotificationEmail(order).catch(console.error),
      sendWhatsAppNotification(order).catch(console.error),
    ]);

    res.status(201).json({
      success: true,
      data: {
        orderId: order.orderId,
        id: order.id,
        message: 'Order created successfully',
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get all orders (with pagination and filters)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      orderType,
      search,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {};

    if (status) {
      where.status = status;
    }

    if (orderType) {
      where.orderType = orderType;
    }

    if (search) {
      where.OR = [
        { orderId: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
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
            take: 1,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: parseInt(limit),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get single order by ID or orderId
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id },
          { orderId: id },
        ],
      },
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
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, changedBy } = req.body;

    const validStatuses = ['NEW', 'UNDER_REVIEW', 'QUOTED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        notes: notes || null,
        changedBy: changedBy || 'SYSTEM',
      },
    });

    res.json({
      success: true,
      data: { order: updatedOrder },
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

