// pages/api/contact.js

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Email content
    const mailOptions = {
      from: `📧 Kajal Kasaudhan Portfolio <${process.env.OTP_EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📧 New Message from ${name} via Kajal Kasaudhan Portfolio!`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; background: #f9f9ff; padding: 24px; border-radius: 12px;">
          <h2 style="color: #6c63ff;">🐾 You've got a new connection!</h2>
          <p style="font-size: 1.1em;">Hi there! <strong>${name}</strong> just sent you a message through the Kajal Kasaudhan Portfolio contact form. 🎉</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #6c63ff;">${email}</a></p>
          <p><strong>💬 Message:</strong></p>
          <blockquote style="background: #fffbe7; padding: 12px 18px; border-left: 4px solid #ffd700; border-radius: 6px;">
            ${message}
          </blockquote>
          <p style="margin-top: 24px; color: #888;">Sent with ❤️ from your Kajal Kasaudhan Portfolio website!</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' });
  }
}
