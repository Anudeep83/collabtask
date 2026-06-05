import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  tasks: any[];
  refreshTasks: () => void;
  droppableId: string;
}

export default function Column({
  title,
  tasks,
  refreshTasks,
  droppableId,
}: Props) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-slate-100 rounded-lg p-4 min-h-[500px]"
        >
          <h2 className="font-bold text-xl mb-4">
            {title}
          </h2>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onDelete={refreshTasks}
              />
            ))}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}