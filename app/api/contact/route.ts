import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        isRead: false,
      },
    });

    // TODO: Send notification email to admin

    return NextResponse.json({
      success: true,
      message: 'Contact message received successfully',
    });
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to send message', details: error.message },
      { status: 500 }
    );
  }
}

