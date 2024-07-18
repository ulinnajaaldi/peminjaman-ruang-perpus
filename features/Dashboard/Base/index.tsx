"use client";

import React from "react";
import { useShallow } from "zustand/react/shallow";

import useAuthStore from "@/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const DashboardFeature: React.FC = () => {
  const [data] = useAuthStore(useShallow((state) => [state.data]));

  const { data: countData, isLoading } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const response = await axiosInstance.get("/v1/api/count");
      return response.data;
    },
    enabled: data?.data?.role === "Admin" || data?.data?.role === "Superadmin",
  });

  return (
    <main>
      <div>
        <h1 className="text-base font-medium md:text-xl">
          Assalamualaikum {data?.data?.firstName} {data?.data?.lastName}
        </h1>
      </div>
      {data?.data?.role === "Admin" || data?.data?.role === "Superadmin" ? (
        <div className="mt-10">
          <h3 className="mb-2 text-sm font-medium md:text-base">
            Data Peminjaman Ruang
          </h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4">
                <p className="text-center font-medium">
                  Total Daftar Peminjaman
                </p>
                <p className="text-3xl font-medium">
                  {countData?.data?.peminjamanRuang}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4">
                <p className="text-center font-medium">Total Ruangan</p>
                <p className="text-3xl font-medium">
                  {countData?.data?.ruangan}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4">
                <p className="text-center font-medium">Total Sapras</p>
                <p className="text-3xl font-medium">
                  {countData?.data?.sapras}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4">
                <p className="text-center font-medium">Total User</p>
                <p className="text-3xl font-medium">{countData?.data?.user}</p>
              </div>
              {data?.data?.role === "Superadmin" && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4">
                  <p className="text-center font-medium">Total Admin</p>
                  <p className="text-3xl font-medium">
                    {countData?.data?.admin}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </main>
  );
};

export default DashboardFeature;
