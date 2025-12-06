import express from 'express';
import prisma from '../config/database.js';
import { sendCatalogEmail } from '../utils/email.js';

const router = express.Router();

// Create catalog request
router.post('/', async (req, res) => {
  try {
    const { name, email, country, catalogType } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const catalogRequest = await prisma.catalogRequest.create({
      data: {
        name,
        email,
        country: country || null,
        catalogType: catalogType || 'catalog',
      },
    });

    // Send catalog email
    try {
      await sendCatalogEmail(email, name, catalogType || 'catalog');
    } catch (emailError) {
      console.error('Error sending catalog email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      data: {
        id: catalogRequest.id,
        message: 'Catalog request received successfully',
      },
    });
  } catch (error) {
    console.error('Error creating catalog request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

