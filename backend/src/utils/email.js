import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderConfirmationEmail(order) {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@oilfactory.com',
    to: order.customerEmail,
    subject: `Order Confirmation - ${order.orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .order-id { font-size: 24px; font-weight: bold; color: #0ea5e9; }
            .info { margin: 10px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear ${order.customerName},</p>
              <p>Thank you for your order! We have received your request and will review it shortly.</p>
              <div class="info">
                <p><strong>Order ID:</strong> <span class="order-id">${order.orderId}</span></p>
                <p><strong>Order Type:</strong> ${order.orderType}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                ${order.company ? `<p><strong>Company:</strong> ${order.company}</p>` : ''}
                <p><strong>Country:</strong> ${order.country}</p>
              </div>
              <p>You can track your order status using your Order ID on our website.</p>
              <p>Our team will contact you soon with further details.</p>
              <p>Best regards,<br>Oil Factory Team</p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', order.customerEmail);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendAdminNotificationEmail(order) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@oilfactory.com';
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@oilfactory.com',
    to: adminEmail,
    subject: `New Order Received - ${order.orderId}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Email:</strong> ${order.customerEmail}</p>
      <p><strong>Phone:</strong> ${order.customerPhone || 'N/A'}</p>
      <p><strong>Company:</strong> ${order.company || 'N/A'}</p>
      <p><strong>Country:</strong> ${order.country}</p>
      <p><strong>Order Type:</strong> ${order.orderType}</p>
      <p><a href="${process.env.FRONTEND_URL}/admin/orders/${order.id}">View Order Details</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent');
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
}

export async function sendCatalogEmail(email, name, catalogType = 'catalog') {
  const catalogLinks = {
    catalog: '/catalogs/main-catalog.pdf',
    certificate: '/catalogs/certificates.pdf',
    specs: '/catalogs/technical-specs.pdf',
    all: '/catalogs/all-documents.zip',
  };

  const catalogLink = catalogLinks[catalogType] || catalogLinks.catalog;
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@oilfactory.com',
    to: email,
    subject: 'Product Catalog - Oil Factory',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .button { display: inline-block; padding: 12px 24px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Product Catalog</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for your interest in our products! As requested, please find the catalog attached.</p>
              <p><a href="${baseUrl}${catalogLink}" class="button">Download Catalog</a></p>
              <p>If you have any questions or need further information, please don't hesitate to contact us.</p>
              <p>Best regards,<br>Oil Factory Team</p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Catalog email sent to:', email);
    return true;
  } catch (error) {
    console.error('Error sending catalog email:', error);
    throw error;
  }
}

