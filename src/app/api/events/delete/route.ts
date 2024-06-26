import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const event = await prisma.event.delete({
      where: {
        id: id,
      },
    });

    if (event) {
      return NextResponse.json({ message: "Event deleted" });
    }

    return NextResponse.json({ message: "Event not found" });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
