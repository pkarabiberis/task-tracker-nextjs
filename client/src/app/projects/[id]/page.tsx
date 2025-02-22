"use client";

import React, { use, useState } from "react";
import ProjectHeader from "../project-header";
import BoardView from "../board-view";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
}
