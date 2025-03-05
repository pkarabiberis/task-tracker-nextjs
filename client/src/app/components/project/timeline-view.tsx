import { useGetTasksQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { useMemo, useState } from "react";
import { DisplayOption, Gantt, Task, ViewMode } from "@wamra/gantt-task-react";
import "@wamra/gantt-task-react/dist/style.css";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

function TimelineView({ id, setIsModalNewTaskOpen }: Props) {
  const { isDarkMode } = useAppSelector((s) => s.global);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    isShowTaskNumbers: false,
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>

        <div className="relative inline-block w-64">
          <select
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            icons={{
              renderAddIcon: () => null,
              renderEditIcon: () => null,
              renderDeleteIcon: () => null,
            }}
            TaskListHeader={({ columns }) => (
              <div className="flex w-full">
                {columns.map((column) => (
                  <div
                    style={{ width: `${window.innerWidth / 3 - 21}px` }}
                    className="pl-[5px] dark:bg-dark-tertiary"
                    key={column.id}
                  >
                    <p className="text-base font-semibold dark:text-white">
                      {column.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
            columns={[
              {
                title: "Id",
                id: "1",
                width: window.innerWidth / 3 - 21,
                canResize: false,
                Cell: ({ data }) => (
                  <div
                    className={`flex min-h-[34px] ${Number(data.indexStr) % 2 === 0 ? "dark:bg-dark-tertiary" : "dark:bg-dark-secondary"} `}
                  >
                    <span
                      className="self-center px-2 dark:text-white"
                      style={{ width: `${window.innerWidth / 3 - 21}px` }}
                    >
                      {data.task.name}
                    </span>
                  </div>
                ),
              },
              {
                title: "From",
                id: "2",
                width: window.innerWidth / 3 - 21,
                canResize: false,
                Cell: ({ data }) => (
                  <div
                    className={`flex min-h-[34px] ${Number(data.indexStr) % 2 === 0 ? "dark:bg-dark-tertiary" : "dark:bg-dark-secondary"} `}
                  >
                    <span
                      className="self-center px-2 dark:text-white"
                      style={{ width: `${window.innerWidth / 3 - 21}px` }}
                    >
                      {(data.task as Task).start.toDateString()}
                    </span>
                  </div>
                ),
              },
              {
                title: "To",
                id: "3",
                width: window.innerWidth / 3 - 21,
                canResize: false,
                Cell: ({ data }) => (
                  <div
                    className={`flex min-h-[34px] ${Number(data.indexStr) % 2 === 0 ? "dark:bg-dark-tertiary" : "dark:bg-dark-secondary"} `}
                  >
                    <span
                      className="self-center px-2 dark:text-white"
                      style={{ width: `${window.innerWidth / 3 - 21}px` }}
                    >
                      {(data.task as Task).end.toDateString()}
                    </span>
                  </div>
                ),
              },
            ]}
            canResizeColumns={false}
            tasks={ganttTasks}
            {...displayOptions}
            canMoveTasks={false}
          />
        </div>

        <div className="pb-5 pl-2 pt-4">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimelineView;
