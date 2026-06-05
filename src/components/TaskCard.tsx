"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { socket } from "@/lib/socket-client";

interface Props {
  task: any;
  index: number;
  onDelete?: () => void;
}

export default function TaskCard({
  task,
  index,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description
  );
  const [status, setStatus] = useState(task.status);
  const [comment, setComment] = useState("");

  const deleteTask = async () => {
    const confirmed = confirm(
        "Delete this task?"
    );

    if (!confirmed) return;

    await fetch(
        `/api/tasks/${task._id}`,
        {
        method: "DELETE",
        }
    );
    await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: task.boardId,
        user: "Anudeep",
        action: "DELETE_TASK",
        details: task.title,
      }),
    });
    socket.emit(
        "task-updated",
        {
        taskId: task._id,
        }
    
    );
    socket.emit("activity-updated");
    onDelete?.();
    };

  const updateTask = async () => {
    await fetch(
        `/api/tasks/${task._id}`,
        {
        method: "PUT",
        headers: {
            "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            status,
        }),
        }
    );

    await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: task.boardId,
        user: "Anudeep",
        action: "EDIT_TASK",
        details: title,
      }),
    });
    

    socket.emit(
        "task-updated",
        {
        taskId: task._id,
        }
    );
    socket.emit("activity-updated");
    setOpen(false);

    onDelete?.();
    };
  const addComment = async () => {
    if (!comment.trim()) return;

    await fetch(
      `/api/tasks/${task._id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Anudeep",
          text: comment,
        }),
      }
    );

    await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: task.boardId,
        user: "Anudeep",
        action: "COMMENT",
        details: comment,
      }),
    });

    socket.emit("task-updated", {
      taskId: task._id,
    });
    socket.emit("activity-updated");

  setComment("");

  onDelete?.();
};
  return (
    <>
      <Draggable
        draggableId={task._id}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setOpen(true)
                  }
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={deleteTask}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-2">
              {task.description}
            </p>

            <div className="mt-4 flex items-center text-xs text-slate-400">
              💬 {task.comments?.length || 0} comments
            </div>
          </div>
        )}
      </Draggable>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Edit Task
            </h2>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border p-2 mb-3"
            />

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border p-2 mb-3"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="w-full border p-2 mb-3"
            >
              <option value="todo">
                Todo
              </option>

              <option value="inprogress">
                In Progress
              </option>

              <option value="done">
                Done
              </option>
            </select>
              <h3 className="font-semibold mt-4 mb-2">
              Comments
            </h3>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {task.comments?.map(
                (comment: any) => (
                  <div
                    key={comment._id}
                    className="bg-slate-100 p-2 rounded"
                  >
                    <p className="font-medium">
                      {comment.user}
                    </p>

                    <p>{comment.text}</p>
                  </div>
                )
              )}
            </div>
            <div className="mt-3">
              <input
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                placeholder="Add comment..."
                className="w-full border p-2 rounded"
              />

              <button
                onClick={addComment}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Comment
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={updateTask}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
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