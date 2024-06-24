import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clerkId } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const event = await prisma.event.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
