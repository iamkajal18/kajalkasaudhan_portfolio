import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import Subscriber from '@/model/Subscribes';
import connectDB from "@/lib/util";
export async function POST(req: Request) {
  await connectDB()
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email message
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to LearnLive!',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You’ll now receive updates from LearnLive directly in your inbox.</p>
        <p>— Kajal from LearnLive 🌟</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Subscription successful. Confirmation email sent!' }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
