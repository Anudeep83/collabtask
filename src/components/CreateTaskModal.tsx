"use client";
import { socket } from "@/lib/socket-client";
import { useState } from "react";

interface Props {
  boardId: string;
  onTaskCreated: () => void;
}

export default function CreateTaskModal({
  boardId,
  onTaskCreated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const createTask = async () => {
    await fetch("/api/tasks", {
      method: "POST",
      
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        boardId,
      }),
      
    });

    await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId,
        user: "Anudeep",
        action: "CREATE_TASK",
        details: title,
      }),
    });

    setTitle("");
    setDescription("");
    setOpen(false);

    onTaskCreated();
    socket.emit(
    "task-updated",
    {
        boardId,
    }
    );
    socket.emit("activity-updated");

  };
  

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        New Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Create Task
            </h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <div className="flex gap-2">
              <button
                onClick={createTask}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}