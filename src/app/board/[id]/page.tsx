import BoardPageClient from "@/components/BoardPageClient";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen p-8">
      <BoardPageClient boardId={id} />
    </main>
  );
}