import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { link } = await request.json();

    await prisma.resume.create({
        data: {
            link,
        }
    })

    return NextResponse.json("Success");
  } catch (e) {

    return NextResponse.json(
      { message: "Failed to create upload resume" },
      { status: 500 }
    );
  }
}