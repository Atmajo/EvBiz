import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
