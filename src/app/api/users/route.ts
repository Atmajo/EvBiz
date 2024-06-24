import prisma from "@/app/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, clerkId, imageUrl, phone } = await req.json();

  try {
    const user = await prisma.user.create({
      data: { name, email, clerkId, imageUrl, phone },
    });

    if (user) {
      return NextResponse.json({ message: "User created" });
    }

    return NextResponse.json({ message: "User not created" });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
