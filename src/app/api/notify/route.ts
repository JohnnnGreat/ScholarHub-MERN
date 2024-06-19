import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { notifyHtml } from "@/utils/notificationHtml";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const body = await req.json();

  const { requesterName, resourceDescription, resourceLink, resourceTitle, sendTo } = body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use other email services
      auth: {
        user: "johnossai20@gmail.com",
        pass: "kblgyogjwalbiwja",
      },
    });

    const responseHtml = notifyHtml(body);

    const mailOptions = {
      from: "johnossai20@gmail.com",
      to: sendTo,
      subject: "Resource Request Notification",
      html: responseHtml,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Request Sent Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
