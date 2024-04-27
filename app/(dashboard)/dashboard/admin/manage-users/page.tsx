import React from "react";
import type { Metadata } from "next";
import ManageUsersFeature from "@/features/Dashboard/Admin/ManageUsers";

export const metadata: Metadata = {
  title: "Dashboard Manage Users",
};

const ManageUsers = () => {
  return <ManageUsersFeature />;
};

export default ManageUsers;
