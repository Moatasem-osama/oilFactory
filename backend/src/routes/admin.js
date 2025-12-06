import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@oilfactory.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          email,
          role: 'admin',
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get dashboard statistics
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
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

    res.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          pendingOrders,
          totalProducts,
          totalMessages,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

