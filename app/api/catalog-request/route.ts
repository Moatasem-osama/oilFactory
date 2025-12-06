import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await prisma.catalogRequest.create({
      data: {
        name: data.name,
        email: data.email,
        country: data.country || null,
        catalogType: data.catalogType || 'catalog',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Catalog request received successfully',
    });
  } catch (error: any) {
    console.error('Error creating catalog request:', error);
    return NextResponse.json(
      { error: 'Failed to submit request', details: error.message },
      { status: 500 }
    );
  }
}

