import { useGetTasksQuery } from "@/state/api";
import Header from "../header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useAppSelector } from "@/app/redux";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: ({ value }) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: ({ value }) => value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: ({ value }) => value.username || "Unassigned",
  },
];

function TableView({ id, setIsModalNewTaskOpen }: Props) {
  const { isDarkMode } = useAppSelector((s) => s.global);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full p-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Table" isSmallText />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
}

export default TableView;
