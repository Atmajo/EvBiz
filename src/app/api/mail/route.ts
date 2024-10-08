import transporter from "@/components/transporter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, msg } = body;

  try {
    const info = await transporter.sendMail({
      from: '"EvBiz" <atmajoc@gmail.com>',
      to: email,
      subject: "Verify your OTP",
      text: "Hello world?", // plain text body
      html: `<b>Verification token : ${msg}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ msgId: info.messageId });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error Occured" });
  }
}
