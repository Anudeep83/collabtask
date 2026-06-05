import Link from "next/link";

async function getBoards() {
  const res = await fetch(
    "http://localhost:3000/api/boards",
    {
      cache: "no-store",
    }
  );

  return res.json();
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