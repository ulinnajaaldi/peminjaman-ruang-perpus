"use client";

import React from "react";

import { useGetUsers } from "@/useCases/UserUseCases";
import { Input } from "@/components/ui/input";
import { columns } from "./section/columns";
import { DataTable } from "./section/data-table";
import useManageUsersFeature from "./hook";

const ManageUsersFeature = () => {
  const { page, setPage, limit, setLimit, search, setSearch, value } =
    useManageUsersFeature();

  const { data, isLoading } = useGetUsers(value, page, limit);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Manage User</h1>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages}
      />
    </div>
  );
};

export default ManageUsersFeature;
