import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to MongoDB so you can review messages from the dashboard even if email fails
    try {
      await connectDB();
      await Message.create({ name, email, subject, message });
    } catch (dbErr) {
      console.error("Failed to save message to DB:", dbErr);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = subject ? escapeHtml(subject) : "New message";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const html = buildEmailHtml({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
    });

    await transporter.sendMail({
      from: `"${name} via Portfolio" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: subject ? `[Portfolio] ${subject}` : "[Portfolio] New message",
      text: `From: ${name} <${email}>\nSubject: ${subject || "N/A"}\n\n${message}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#13131a;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

            <!-- Gradient header -->
            <tr>
              <td style="padding:28px 32px;background-image:linear-gradient(90deg,#8b5cf6,#e879f9,#fbbf24);">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(0,0,0,0.55);">
                  Portfolio Contact
                </p>
                <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#0a0a0f;">
                  New message received
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                  <tr>
                    <td style="padding:4px 0;font-size:12px;color:#8b8b9a;text-transform:uppercase;letter-spacing:1px;">From</td>
                  </tr>
                  <tr>
                    <td style="padding:2px 0 10px;font-size:15px;color:#f4f4f7;font-weight:600;">
                      ${name} &nbsp;<span style="color:#8b5cf6;font-weight:400;">&lt;${email}&gt;</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;font-size:12px;color:#8b8b9a;text-transform:uppercase;letter-spacing:1px;">Subject</td>
                  </tr>
                  <tr>
                    <td style="padding:2px 0;font-size:15px;color:#f4f4f7;">${subject}</td>
                  </tr>
                </table>

                <div style="height:1px;background:linear-gradient(90deg,rgba(139,92,246,0.4),rgba(232,121,249,0.4),rgba(251,191,36,0.4));margin-bottom:20px;"></div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
                  <tr>
                    <td style="padding:18px 20px;font-size:14px;line-height:1.7;color:#d4d4dc;">
                      ${message}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:24px 32px 8px;">
                <a href="mailto:${email}" style="display:inline-block;padding:11px 22px;border-radius:999px;background-image:linear-gradient(90deg,#8b5cf6,#e879f9);color:#0a0a0f;font-size:13px;font-weight:700;text-decoration:none;">
                  Reply to ${name.split(" ")[0]}
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px 28px;">
                <p style="margin:0;font-size:11px;color:#5c5c6b;">
                  Sent automatically from your portfolio contact form.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}