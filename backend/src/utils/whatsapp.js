export async function sendWhatsAppNotification(order) {
  const whatsappApiKey = process.env.WHATSAPP_API_KEY;
  const whatsappPhoneNumber = process.env.WHATSAPP_PHONE_NUMBER;
  const customerPhone = order.customerPhone;

  if (!whatsappApiKey || !whatsappPhoneNumber || !customerPhone) {
    console.log('WhatsApp not configured or customer phone not provided');
    return false;
  }

  const message = `
Hello ${order.customerName},

Thank you for your order!

Order ID: ${order.orderId}
Order Type: ${order.orderType}
Status: ${order.status}

We have received your order and will review it shortly. Our team will contact you soon.

Track your order: ${process.env.FRONTEND_URL}/tracking?orderId=${order.orderId}

Best regards,
Oil Factory Team
  `.trim();

  try {
    // Example using Twilio or another WhatsApp API service
    // Replace with your actual WhatsApp API implementation
    const response = await fetch(`https://api.whatsapp.com/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${whatsappApiKey}`,
      },
      body: JSON.stringify({
        to: customerPhone,
        from: whatsappPhoneNumber,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error('WhatsApp API request failed');
    }

    console.log('WhatsApp notification sent to:', customerPhone);
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
}

