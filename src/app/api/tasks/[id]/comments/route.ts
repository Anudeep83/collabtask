import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const body = await req.json();

  const task = await Task.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: body,
      },
    },
    { new: true }
  );

  return NextResponse.json(task);
}