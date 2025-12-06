import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get statistics
    const [
      totalOrders,
      pendingOrders,
      totalProducts,
      totalMessages,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: {
          status: {
            in: ['NEW', 'UNDER_REVIEW'],
          },
        },
      }),
      prisma.product.count(),
      prisma.contactMessage.count({
        where: {
          isRead: false,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalOrders,
        pendingOrders,
        totalProducts,
        totalMessages,
      },
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    );
  }
}

