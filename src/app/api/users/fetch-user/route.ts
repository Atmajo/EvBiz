import prisma from "@/app/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clerkId } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      }
    });

    if (user) {
      return NextResponse.json(user);
    }

    return NextResponse.json({ message: "User not found" });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
