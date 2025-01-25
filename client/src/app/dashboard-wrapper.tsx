"use client";

import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import StoreProvider, { useAppSelector } from "./redux";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed, isDarkMode } = useAppSelector(
    (state) => state.global,
  );

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 ${isSidebarCollapsed ? "" : "md:pl-64"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
}
