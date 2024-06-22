import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { clerkId } = await req.json();

  try {
    const user = await prisma.user.findMany({
      where: {
        clerkId: clerkId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const event = await prisma.event.findMany({
      where: {
        userId: user[0].id,
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
