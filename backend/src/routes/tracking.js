import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// Track order by orderId
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id: orderId },
          { orderId: orderId },
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
    console.error('Error tracking order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

