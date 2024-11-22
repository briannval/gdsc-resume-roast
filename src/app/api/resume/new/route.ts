import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { link } = await request.json();

    const r = await prisma.resume.create({
        data: {
            link,
        }
    })

    return NextResponse.json(r);
  } catch (e) {

    return NextResponse.json(
      { message: "Failed to create new resume" },
      { status: 500 }
    );
  }
}