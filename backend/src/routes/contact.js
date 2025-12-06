import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// Create contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        isRead: false,
      },
    });

    // TODO: Send notification email to admin

    res.status(201).json({
      success: true,
      data: {
        id: contactMessage.id,
        message: 'Contact message received successfully',
      },
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get all contact messages (Admin only)
router.get('/', async (req, res) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;

    const where = {};
    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: parseInt(limit),
      }),
      prisma.contactMessage.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    res.json({
      success: true,
      data: { message },
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

