import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";
import Header from "../header";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

function ListView({ id, setIsModalNewTaskOpen }: Props) {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="mb-3 h-max rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && !!task.attachments.length && (
        <div className="pb-4">
          <strong>Attachments:</strong>
          <div className="mt-2 flex flex-wrap">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="rounded-t-md"
            />
          </div>
        </div>
      )}

      <p>
        <strong>ID:</strong> {task.id}
      </p>

      <p>
        <strong>Title:</strong> {task.title}
      </p>

      <p>
        <strong>Description:</strong>{" "}
        {task.description ?? "No description provided"}
      </p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>

      <p>
        <strong>Tags:</strong> {task.tags ?? "No tags"}
      </p>

      <p>
        <strong>Start date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>

      <p>
        <strong>Due date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>

      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>

      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
}

export default ListView;
