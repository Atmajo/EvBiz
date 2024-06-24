import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, answer, clerkId } = await req.json();

  try {
    const invited = await prisma.invited.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (invited) {
      await prisma.invited.update({
        where: {
          clerkId: clerkId,
        },
        data: {
          answer: answer,
        },
      });

      return NextResponse.json({ message: "Invite updated" });
    } else {
      await prisma.invited.create({
        data: {
          event: { connect: { id: id } },
          clerkId: clerkId,
          answer: answer,
        },
      });

      return NextResponse.json({ message: "Invited" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
