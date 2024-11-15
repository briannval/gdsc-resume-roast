import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib_prisma/db";

export async function POST(request: NextRequest) {
  try {
    const { resumeId, formatting, relevance, quantification, clarity, wording } = await request.json();

    await prisma.review.create({
      data: {
        resumeId,
        formatting,
        relevance,
        quantification,
        clarity,
        wording
      }
    });

    return NextResponse.json("Review added successfully");
  } catch (e) {

    return NextResponse.json(
      { message: "Failed to add review" },
      { status: 500 }
    );
  }
}
