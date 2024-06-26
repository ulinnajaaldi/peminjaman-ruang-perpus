"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { CircleUser, Menu } from "lucide-react";

import { ROUTES_PATH } from "@/constants/routes";
import useAuthStore from "@/hook/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Navbar = () => {
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

  const NAVBAR_MENU = [
    {
      name: "Home",
      path: ROUTES_PATH.home,
    },
    {
      name: "Ruangan",
      path: ROUTES_PATH.ruangan,
    },
    {
      name: "Tentang",
      path: ROUTES_PATH.tentang,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-slate-50 to-transparent backdrop-blur-sm">
      <nav className="container">
        <div className="hidden items-center justify-between py-3 md:flex">
          <div className="flex items-center justify-center gap-32">
            <div>
              <Image
                src="/images/perpus-ums-logo.png"
                alt="Perpus UMS Logo"
                width={80}
                height={80}
              />
            </div>
            <div className="flex items-center justify-center gap-8">
              {NAVBAR_MENU.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.path}
                  className={`${isActive === menu.path ? "text-blue-500" : "text-gray-700"} font-medium transition-colors hover:text-blue-500`}
                  onClick={() => setIsActive(menu.path)}
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
          {data !== null ? (
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
                  <Link href={ROUTES_PATH.dashboard}>Dashboard</Link>
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
          ) : (
            <Button variant="outline" asChild>
              <Link href={ROUTES_PATH.login}>Login</Link>
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between py-2 md:hidden">
          <div>
            <Image
              src="/images/perpus-ums-logo.png"
              alt="Perpus UMS Logo"
              width={50}
              height={50}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <div>
                    <Image
                      src="/images/perpus-ums-logo.png"
                      alt="Perpus UMS Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-3 flex flex-col gap-2">
                {NAVBAR_MENU.map((menu, index) => (
                  <Link
                    key={index}
                    href={menu.path}
                    className={`${isActive === menu.path ? "text-blue-500" : "text-gray-500"} font-medium transition-colors hover:text-blue-500`}
                    onClick={() => setIsActive(menu.path)}
                  >
                    {menu.name}
                  </Link>
                ))}
              </div>
              <Button variant="outline" asChild className="mt-5">
                {data !== null ? (
                  <Link href={ROUTES_PATH.dashboard}>Dashboard</Link>
                ) : (
                  <Link href={ROUTES_PATH.login}>Login</Link>
                )}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
