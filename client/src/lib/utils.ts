export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-seconday dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    '& [role="row"] > *': {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : ""}`,
    },
    "& .MuiIconbutton-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiDataGrid-menuIcon": {
      color: `${isDarkMode ? "white" : ""}`,
      svg: {
        color: `${isDarkMode ? "white" : ""}`,
      },
    },
    "& .MuiDataGrid-cell": {
      border: "none",
      color: `${isDarkMode ? "white" : "#1d1f21"}`,
    },
    "& .MuiDataGrid-iconButtonContainer": {
      button: {
        color: `${isDarkMode ? "white" : "#1d1f21"}`,
      },
    },
    "& .MuiDataGrid-footerContainer": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
      button: {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
    },
  };
};
