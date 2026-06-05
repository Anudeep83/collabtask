import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Board from "@/models/Board";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name } = await req.json();

    const board = await Board.create({
      name,
    });

    return NextResponse.json(board, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create board",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const boards = await Board.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch boards",
      },
      {
        status: 500,
      }
    );
  }
}

