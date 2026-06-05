import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const body = await req.json();

  const { id } = await params;

  const task = await Task.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  await Task.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}