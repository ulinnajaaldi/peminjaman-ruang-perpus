import { Users, LandPlot, ArrowLeftRight, UserRoundCog } from "lucide-react";
import type { SidebarItem } from "@/types/DashboardTypes";

export const ROUTES_PATH = {
  home: "/",
  register: "/auth/register",
  login: "/auth/login",
  dashboard: {
    home: "/dashboard",
    ruangan: "/dashboard/ruangan",
    daftarPeminjaman: "/dashboard/daftar-peminjaman",
    peminjaman: "/dashboard/peminjaman",
    manageUsers: "/dashboard/manage-users",
    manageAdmins: "/dashboard/manage-admins",
  },
};

export const SIDEBAR_SUPERADMIN: SidebarItem[] = [
  {
    title: "Ruangan",
    icons: LandPlot,
    href: ROUTES_PATH.dashboard.ruangan,
  },
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboard.daftarPeminjaman,
  },
  {
    title: "Manage Users",
    icons: Users,
    href: ROUTES_PATH.dashboard.manageUsers,
  },
  {
    title: "Manage Admins",
    icons: UserRoundCog,
    href: ROUTES_PATH.dashboard.manageAdmins,
  },
];

export const SIDEBAR_ADMIN: SidebarItem[] = [
  {
    title: "Ruangan",
    icons: LandPlot,
    href: ROUTES_PATH.dashboard.ruangan,
  },
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboard.daftarPeminjaman,
  },
  {
    title: "Manage Users",
    icons: Users,
    href: ROUTES_PATH.dashboard.manageUsers,
  },
];

export const SIDEBAR_USER: SidebarItem[] = [
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboard.peminjaman,
  },
];
