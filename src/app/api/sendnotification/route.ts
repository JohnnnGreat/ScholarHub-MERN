import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { notifyHtml } from "@/utils/newResourceNotificationHtml";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const supabase = createClient();
  const body = await req.json();
  const { emails, id } = body;
  const demoEmail = ["johnossai20@gmail.com", "ossaijohn20@gmail.com"];

  try {
    // Get the Resources from the Database
    const { data: resourceInfo, error: errorFetchingResourceInfo } = await supabase
      .from("Resource")
      .select("*")
      .eq("id", id)
      .single();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "johnossai20@gmail.com",
        pass: "kblgyogjwalbiwja",
      },
    });
    const sendNotification = await Promise.all(
      emails.map(async (email: string) => {
        const responseHtml = notifyHtml(resourceInfo);

        const mailOptions = {
          from: `New Resource <johnossai20@gmail.com>`,
          to: email,
          subject: `You are missing a resource ${email}`,
          html: responseHtml,
        };

        await transporter.sendMail(mailOptions);
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
