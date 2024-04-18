import React from "react";
import { Metadata } from "next";

import DashboardHomeFeature from "@/features/Dashboard/Home";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardHome = () => {
  return <DashboardHomeFeature />;
};

export default DashboardHome;
