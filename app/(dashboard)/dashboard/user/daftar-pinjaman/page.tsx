import React from "react";
import UserDaftarPinjamanFeature from "@/features/Dashboard/User/DaftarPinjaman";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Daftar Pinjaman",
};

const UserDaftarPinjaman = () => {
  return <UserDaftarPinjamanFeature />;
};

export default UserDaftarPinjaman;
