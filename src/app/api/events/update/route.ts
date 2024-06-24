import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, title, description, date, time, location, imageUrl } = await req.json();

  try {
    const event = await prisma.event.update({
      data: {
        title,
        description,
        date,
        time,
        location,
        imageUrl
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
