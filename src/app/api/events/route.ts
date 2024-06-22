import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, description, email } = await req.json();
  
  try {
    const user = await prisma.user.findMany({
      where: {
        OR:   [{ email: email }],
      },
    });

    if (user) {
      const event = await prisma.event.create({
        data: {
          title,
          description,
          user: { connect: { id: user[0].id } },
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
