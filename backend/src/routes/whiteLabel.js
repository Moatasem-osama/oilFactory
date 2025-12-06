import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// Create white label request
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      company,
      country,
      oilType,
      quantity,
      packaging,
      hasDesign,
      designFiles,
      needDesign,
      notes,
    } = req.body;

    if (!customerName || !email || !country || !oilType || !quantity || !packaging) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const whiteLabelRequest = await prisma.whiteLabelRequest.create({
      data: {
        customerName,
        email,
        phone: phone || null,
        company: company || null,
        country,
        oilType,
        quantity: parseFloat(quantity),
        packaging,
        hasDesign: hasDesign || false,
        designFiles: designFiles || [],
        needDesign: needDesign || false,
        notes: notes || null,
        status: 'PENDING',
      },
    });

    // TODO: Send notification emails

    res.status(201).json({
      success: true,
      data: {
        id: whiteLabelRequest.id,
        message: 'White label request submitted successfully',
      },
    });
  } catch (error) {
    console.error('Error creating white label request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get all white label requests (Admin)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (status) {
      where.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [requests, total] = await Promise.all([
      prisma.whiteLabelRequest.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: parseInt(limit),
      }),
      prisma.whiteLabelRequest.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching white label requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch requests',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

