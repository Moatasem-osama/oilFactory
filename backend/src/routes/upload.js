import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client, { BUCKET_NAME } from '../config/aws.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, PDF, DOC, DOCX are allowed.'));
    }
  },
});

// Upload single file
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided',
      });
    }

    // Generate unique filename
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `uploads/${Date.now()}-${fileName}`;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'private',
    });

    await s3Client.send(command);

    // Generate file URL
    const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;

    res.json({
      success: true,
      data: {
        url: fileUrl,
        fileName: req.file.originalname,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Upload multiple files
router.post('/multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files provided',
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `uploads/${Date.now()}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
      });

      await s3Client.send(command);

      return {
        url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`,
        fileName: file.originalname,
        size: file.size,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.json({
      success: true,
      data: {
        files: uploadedFiles,
      },
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

