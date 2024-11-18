import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(_: NextRequest) {
  try {
    const reviews = await prisma.review.groupBy({
        by: ["resumeId"],
        _avg: {
            structure: true,
            clarity: true,
            formatting: true,
            relevance: true,
            wording: true,
        },
        orderBy: {
            resumeId: 'asc'
        }
    })

    return NextResponse.json(reviews);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { message: "Failed to create upload resume" },
      { status: 500 }
    );
  }
}