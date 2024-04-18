"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES_PATH } from "@/constants/routes";
import useAuthStore from "@/hook/useAuth";
import { useShallow } from "zustand/react/shallow";

const Navbar = () => {
  const [data, getUser] = useAuthStore(
    useShallow((state) => [state.data, state.getUser]),
  );

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <header className="">
      <nav className="container flex items-center justify-between">
        <h1>Navbar</h1>
        <Button variant="outline" asChild>
          {data !== null ? (
            <Link href={ROUTES_PATH.dashboard.home}>Dashboard</Link>
          ) : (
            <Link href={ROUTES_PATH.login}>Login</Link>
          )}
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
