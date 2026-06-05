import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json([]);
    }

    const tasks = await Task.find({ boardId });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const task = await Task.create(body);

    return NextResponse.json(task, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}