"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket-client";

export default function ActivityFeed({
  boardId,
}: {
  boardId: string;
}) {
  const [activities, setActivities] =
    useState([]);

  const fetchActivities =
    async () => {
      const res = await fetch(
        `/api/activity?boardId=${boardId}`
      );

      const data =
        await res.json();

      setActivities(data);
    };

    useEffect(() => {
  fetchActivities();

  socket.on(
    "activity-updated",
    () => {
      console.log(
        "Activity event received"
      );

      fetchActivities();
    }
  );

  return () => {
    socket.off(
      "activity-updated"
    );
  };
}, []);

  return (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 h-[700px] overflow-y-auto">
    <h2 className="text-xl font-bold text-slate-800 mb-5">
      Activity Feed
    </h2>

    <div className="space-y-4">
      {activities.map((activity: any) => (
        <div
          key={activity._id}
          className="bg-slate-50 rounded-xl p-3 border border-slate-200"
        >
          <p className="font-semibold text-slate-800">
            {activity.user}
          </p>

          <p className="text-sm text-slate-600 mt-1">
            {activity.action === "CREATE_TASK" &&
              "➕ Created Task"}

            {activity.action === "EDIT_TASK" &&
              "✏️ Edited Task"}

            {activity.action === "DELETE_TASK" &&
              "🗑 Deleted Task"}

            {activity.action === "COMMENT" &&
              "💬 Commented"}

            {activity.action === "MOVE_TASK" &&
              "📌 Moved Task"}
          </p>

          <p className="text-sm mt-1 text-slate-800">
            {activity.details}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {new Date(
              activity.createdAt
            ).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}