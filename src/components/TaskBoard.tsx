"use client";
import { socket } from "@/lib/socket-client"
import {
  DragDropContext,
} from "@hello-pangea/dnd";

import Column from "./Column";

interface Props {
  tasks: any[];
  refreshTasks: () => void;
}

export default function TaskBoard({
  tasks,
  refreshTasks,
}: Props) {
  const todo = tasks.filter(
    (t) => t.status === "todo"
  );

  const inprogress = tasks.filter(
    (t) => t.status === "inprogress"
  );

  const done = tasks.filter(
    (t) => t.status === "done"
  );

  const onDragEnd = async (
    result: any
  ) => {
    if (!result.destination) return;

    const taskId =
      result.draggableId;

    const newStatus =
      result.destination.droppableId;

    await fetch(
      `/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: tasks.find(
          (t) => t._id === taskId
        )?.boardId,
        user: "Anudeep",
        action: "MOVE_TASK",
        details: `Moved to ${newStatus}`,
      }),
    });
    socket.emit(
    "task-updated",
    {
      taskId,
      status: newStatus,
    }
  );
  socket.emit("activity-updated");
    refreshTasks();
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="grid grid-cols-3 gap-6">
        <Column
          title="Todo"
          tasks={todo}
          droppableId="todo"
          refreshTasks={refreshTasks}
        />

        <Column
          title="In Progress"
          tasks={inprogress}
          droppableId="inprogress"
          refreshTasks={refreshTasks}
        />

        <Column
          title="Done"
          tasks={done}
          droppableId="done"
          refreshTasks={refreshTasks}
        />
      </div>
    </DragDropContext>
  );
}