"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useShallow } from "zustand/react/shallow";
import { CircleUser, Home, Menu, Package2 } from "lucide-react";

import useAuthStore from "@/hook/useAuth";
import { SidebarItem } from "@/types/DashboardTypes";
import {
  ROUTES_PATH,
  SIDEBAR_ADMIN,
  SIDEBAR_SUPERADMIN,
  SIDEBAR_USER,
} from "@/constants/routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [data, getUser, logoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.logoutHandler]),
  );
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  let sidebar = [] as any;
  switch (data?.data?.role) {
    case "Superadmin":
      sidebar = SIDEBAR_SUPERADMIN;
      break;
    case "Admin":
      sidebar = SIDEBAR_ADMIN;
      break;
    case "User":
      sidebar = SIDEBAR_USER;
      break;
    default:
      break;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">UMS Library</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href={ROUTES_PATH.dashboard}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive === ROUTES_PATH.dashboard ? "bg-muted" : ""
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              {sidebar?.map((item: SidebarItem, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive === item.href ? "bg-muted" : ""
                  }`}
                >
                  <item.icons className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Informasi</CardTitle>
                <CardDescription>
                  Detail informasi mengenai ruangan Perpustakaan UMS yang dapat
                  dilihat disini.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full" asChild>
                  <Link href={ROUTES_PATH.home}>Daftar Ruangan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 md:justify-end lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Peminjaman Ruang Perpus UMS</span>
                </Link>
                {sidebar?.map((item: SidebarItem, index: number) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                      isActive === item.href ? "bg-muted" : ""
                    }`}
                  >
                    <item.icons className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi</CardTitle>
                    <CardDescription>
                      Detail informasi mengenai ruangan Perpustakaan UMS yang
                      dapat dilihat disini.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full" asChild>
                      <Link href={ROUTES_PATH.home}>Daftar Ruangan</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            <p className="inline-flex">
              <span className="hidden md:block">
                Peminjaman Ruang Perpus UMS&nbsp;|&nbsp;
              </span>
              {data?.data?.firstName} {data?.data?.lastName}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {data?.data?.firstName} {data?.data?.lastName} <br />
                  <span className="text-sm font-normal">
                    {data?.data?.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={ROUTES_PATH.home}>Homepage</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={logoutHandler}
                    className="w-full cursor-pointer"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
