import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const whiteLabelRequest = await prisma.whiteLabelRequest.create({
      data: {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        country: data.country,
        oilType: data.oilType,
        quantity: data.quantity,
        packaging: data.packaging,
        hasDesign: data.hasDesign || false,
        designFiles: data.designFiles || [],
        needDesign: data.needDesign || false,
        notes: data.notes || null,
        status: 'PENDING',
      },
    });

    // TODO: Send notification emails

    return NextResponse.json({
      success: true,
      id: whiteLabelRequest.id,
      message: 'White label request submitted successfully',
    });
  } catch (error: any) {
    console.error('Error creating white label request:', error);
    return NextResponse.json(
      { error: 'Failed to submit request', details: error.message },
      { status: 500 }
    );
  }
}

