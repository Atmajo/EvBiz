import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id, title, description, date, time, location } = await req.json();

  try {
    const event = await prisma.event.update({
      data: {
        title,
        description,
        date,
        time,
        location,
      },
      where: {
        id: id,
      },
    });

    if (event) {
      return NextResponse.json({ message: "Event updated" });
    }

    return NextResponse.json({ message: "Event not found" });
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
