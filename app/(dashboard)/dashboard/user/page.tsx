import React from "react";
import { Metadata } from "next";

import DashboardUserFeature from "@/features/Dashboard/User/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard User",
};

const DashboardHome = () => {
  return <DashboardUserFeature />;
};

export default DashboardHome;
