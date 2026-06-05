import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
) {
  await connectDB();

  const { searchParams } =
    new URL(req.url);

  const boardId =
    searchParams.get("boardId");

  const activities =
    await Activity.find({
      boardId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(50);

  return NextResponse.json(
    activities
  );
}

export async function POST(
  req: NextRequest
) {
  await connectDB();

  const body = await req.json();

  const activity =
    await Activity.create(body);

  return NextResponse.json(
    activity
  );
}