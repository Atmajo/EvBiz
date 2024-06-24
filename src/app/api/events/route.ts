import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description, email } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const event = await prisma.event.create({
        data: {
          title,
          description,
          user: { connect: { id: user.id } },
        },
      });
      
      if (event) {
        return NextResponse.json({ message: "Event created" });
      }
    }

    return NextResponse.json({ message: "Event not created" });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
