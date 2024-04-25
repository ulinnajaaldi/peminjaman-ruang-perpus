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
  },
  dashboardSuperAdmin: {
    home: "/dashboard",
    ruangan: "/dashboard/superadmin/ruangan",
    daftarPeminjaman: "/dashboard/superadmin/daftar-peminjaman",
    peminjaman: "/dashboard/superadmin/peminjaman",
    manageUsers: "/dashboard/superadmin/manage-users",
    manageAdmins: "/dashboard/superadmin/manage-admins",
  },
  dashboardAdmin: {
    home: "/dashboard",
    ruangan: "/dashboard/ruangan",
    daftarPeminjaman: "/dashboard/daftar-peminjaman",
    peminjaman: "/dashboard/peminjaman",
    manageUsers: "/dashboard/manage-users",
  },
};

export const SIDEBAR_SUPERADMIN: SidebarItem[] = [
  {
    title: "Ruangan",
    icons: LandPlot,
    href: ROUTES_PATH.dashboardSuperAdmin.ruangan,
  },
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboardSuperAdmin.daftarPeminjaman,
  },
  {
    title: "Manage Users",
    icons: Users,
    href: ROUTES_PATH.dashboardSuperAdmin.manageUsers,
  },
  {
    title: "Manage Admins",
    icons: UserRoundCog,
    href: ROUTES_PATH.dashboardSuperAdmin.manageAdmins,
  },
];

export const SIDEBAR_ADMIN: SidebarItem[] = [
  {
    title: "Ruangan",
    icons: LandPlot,
    href: ROUTES_PATH.dashboardAdmin.ruangan,
  },
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboardAdmin.daftarPeminjaman,
  },
  {
    title: "Manage Users",
    icons: Users,
    href: ROUTES_PATH.dashboardAdmin.manageUsers,
  },
];

export const SIDEBAR_USER: SidebarItem[] = [
  {
    title: "Daftar Peminjaman",
    icons: ArrowLeftRight,
    href: ROUTES_PATH.dashboard.peminjaman,
  },
];
