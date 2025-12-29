import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

const validateSubject = (subject: string): boolean => {
  return subject.trim().length >= 3 && subject.trim().length <= 100;
};

const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10 && message.trim().length <= 500;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      subject,
      message,
      captchaAnswer,
      captchaExpected,
      acceptedPrivacy,
    } = body;

    // Validate privacy policy acceptance
    if (!acceptedPrivacy) {
      return NextResponse.json(
        { message: "You must accept the privacy policy" },
        { status: 400 }
      );
    }

    // Validate CAPTCHA
    if (captchaAnswer !== captchaExpected) {
      return NextResponse.json(
        { message: "Invalid CAPTCHA answer" },
        { status: 400 }
      );
    }

    // Backend validation
    if (!validateName(name)) {
      return NextResponse.json(
        { message: "Invalid name format" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!validateSubject(subject)) {
      return NextResponse.json(
        { message: "Invalid subject format" },
        { status: 400 }
      );
    }

    if (!validateMessage(message)) {
      return NextResponse.json(
        { message: "Invalid message format" },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "heyome9a@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "", // User needs to fill this
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || "heyome9a@gmail.com",
      to: "heyome9a@gmail.com",
      subject: `New Query: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <p style="color: #666; font-size: 12px;">
            This email was sent from the FileConverter at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER || "heyome9a@gmail.com",
      to: email,
      subject: "We received your message - FileConverter",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Thank You for Contacting Us!
          </h2>
          
          <p style="line-height: 1.6; color: #333;">
            Hi ${name},
          </p>
          
          <p style="line-height: 1.6; color: #333;">
            Thank you for reaching out to FileConverter. We've received your message and will get back to you within 24-48 hours.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message:</h3>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="white-space: pre-wrap; line-height: 1.6; margin-top: 10px;">${message}</p>
          </div>
          
          <p style="line-height: 1.6; color: #333;">
            Best regards,<br />
            <strong>The FileConverter Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Contact form error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
