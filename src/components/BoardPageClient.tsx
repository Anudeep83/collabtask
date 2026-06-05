"use client";
import { socket } from "@/lib/socket-client";
import { useEffect, useState } from "react";
import TaskBoard from "./TaskBoard";
import CreateTaskModal from "./CreateTaskModal";
import ActivityFeed from "./ActivityFeed";

export default function BoardPageClient({
  boardId,
}: {
  boardId: string;
}) {
  const [tasks, setTasks] = useState([]);
  const [onlineUsers, setOnlineUsers] =
  useState(0);

  const fetchTasks = async () => {
    const res = await fetch(
      `/api/tasks?boardId=${boardId}`
    );

    const data = await res.json();

    setTasks(data);
  };

  useEffect(() => {
  fetchTasks();

  socket.on("task-updated", (data) => {
  console.log(
    "Received socket update:",
    data
  );

  fetchTasks();
});

socket.on("online-users", (count) => {
  console.log(
    "ONLINE USERS EVENT:",
    count
  );

  setOnlineUsers(count);
});

socket.on("connect", () => {
  console.log(
    "Socket Connected:",
    socket.id
  );
});

  return () => {
  socket.off("task-updated");
  socket.off("online-users");
  socket.off("connect");
};
}, []);

return (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          🚀 CollabTask
        </h1>

        <p className="text-slate-500 mt-1">
          Real-Time Collaborative Task Management
        </p>

        <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {onlineUsers} user(s) online
        </div>
      </div>

      <CreateTaskModal
        boardId={boardId}
        onTaskCreated={fetchTasks}
      />
    </div>

    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <TaskBoard
          tasks={tasks}
          refreshTasks={fetchTasks}
        />
      </div>

      <div className="col-span-3">
        <ActivityFeed boardId={boardId} />
      </div>
    </div>
  </div>
);
}