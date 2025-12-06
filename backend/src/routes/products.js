import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, isActive } = req.query;

    const where = {};

    if (category) {
      where.category = category;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: { products },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Create product (Admin only - add auth middleware)
router.post('/', async (req, res) => {
  try {
    const {
      nameEn,
      nameAr,
      descriptionEn,
      descriptionAr,
      image,
      category,
      specifications,
      packaging,
      coaFile,
      msdsFile,
      isActive = true,
    } = req.body;

    if (!nameEn || !nameAr || !descriptionEn || !descriptionAr) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const product = await prisma.product.create({
      data: {
        nameEn,
        nameAr,
        descriptionEn,
        descriptionAr,
        image: image || null,
        category: category || null,
        specifications: specifications || null,
        packaging: packaging || null,
        coaFile: coaFile || null,
        msdsFile: msdsFile || null,
        isActive,
      },
    });

    res.status(201).json({
      success: true,
      data: { product },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Update product
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

