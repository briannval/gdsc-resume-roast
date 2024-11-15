import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib_prisma/db";

export async function GET(_: NextRequest) {
  try {
    const resumes = await prisma.resume.findMany();

    return NextResponse.json(resumes);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { message: "Failed to create upload resume" },
      { status: 500 }
    );
  }
}