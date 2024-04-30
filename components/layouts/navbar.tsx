"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

import { ROUTES_PATH } from "@/constants/routes";
import useAuthStore from "@/hook/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [data, getUser] = useAuthStore(
    useShallow((state) => [state.data, state.getUser]),
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
              <h1 className="font-bold">Logo</h1>
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
          <Button variant="outline" asChild>
            {data !== null ? (
              <Link href={ROUTES_PATH.dashboard.home}>Dashboard</Link>
            ) : (
              <Link href={ROUTES_PATH.login}>Login</Link>
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between py-2 md:hidden">
          <div>
            <h1 className="font-bold">Logo</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Logo</SheetTitle>
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
                  <Link href={ROUTES_PATH.dashboard.home}>Dashboard</Link>
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
