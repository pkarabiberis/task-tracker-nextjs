"use client";

import React, { useState } from "react";

type Props = {
  params: { id: string };
};

export default function Page({ params: { id } }: Props) {
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return <div></div>;
}
