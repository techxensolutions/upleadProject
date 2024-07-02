"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { adminNavRoutes, userNavRoutes } from "./data";
import { NavList } from "./_components/NavList";
import DashboardNav from "./_components/DashboardNav";
import { Toaster } from "react-hot-toast";

export default function DashboardPage({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [navRoutes, setNavRoutes] = useState([]);

  useEffect(() => {
    const fetchNavRoutes = async () => {
      const loggedInUser =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("userToken"));

      const isAdmin = loggedInUser?.role === "admin";

      const routes = isAdmin ? adminNavRoutes : userNavRoutes;
      setNavRoutes(routes);
      setLoading(false);
    };

    fetchNavRoutes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-[#00A0DF] animate-spin absolute"></div>
      </div>
    );
  }

  return (
    <div className="grid fixed w-full grid-cols-1 lg:grid-cols-[max-content_1fr]">
      <aside className="hidden lg:block max-w-[270px] w-[20vw] min-w-[250px] h-screen border border-r-zinc-100">
        <Link href="/" className="flex justify-center mt-3 items-center">
          <Image
            width={70}
            height={70}
            alt="Logo"
            src="https://png.pngtree.com/png-vector/20230302/ourmid/pngtree-dashboard-line-icon-vector-png-image_6626604.png"
          />
        </Link>
        <NavList route={navRoutes} />
      </aside>
      <main className="w-full relative overflow-y-scroll h-screen max-h-[100vh] min-h-max grid grid-rows-[max-content_1fr]">
        <DashboardNav />
        <Toaster />
        {children}
      </main>
    </div>
  );
}
