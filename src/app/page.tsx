export const dynamic = "force-dynamic";

import Link from "next/link";
import Board from "@/models/Board";
import { connectDB } from "@/lib/mongodb";

async function getBoards() {
  await connectDB();

  const boards = await Board.find();

  return JSON.parse(
    JSON.stringify(boards)
  );
}

export default async function Dashboard() {
  const boards = await getBoards();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        CollabTask
      </h1>

      <div className="grid gap-4">
        {boards.map((board: any) => (
          <Link
            key={board._id}
            href={`/board/${board._id}`}
          >
            <div className="border rounded-lg p-4 hover:bg-slate-100">
              {board.name}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}