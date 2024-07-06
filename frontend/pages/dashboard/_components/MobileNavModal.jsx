import Image from "next/image";
import Link from "next/link";
import { memo, useState, useEffect } from "react";
import { NavList } from "./NavList";
import { adminNavRoutes, userNavRoutes } from "../data";

const MobileNavMenuModal = memo(({ isOpen, setIsOpen }) => {
  const [navRoutes, setNavRoutes] = useState([]);

  useEffect(() => {
    const fetchNavRoutes = async () => {
      const loggedInUser =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("userToken"));

      const isAdmin = loggedInUser?.role === "admin";

      const routes = isAdmin ? adminNavRoutes : userNavRoutes;
      setNavRoutes(routes);
    };

    fetchNavRoutes();
  }, []);

  if (isOpen) {
    return (
      <aside className="bg-white z-[1] fixed md:hidden bottom-0 left-0 w-full h-full border border-r-slate-200">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link
          href="/"
          className="relative px-4 flex flex-row max-w-max items-center gap-x-2"
        >
          <Image
            width={150}
            height={150}
            loading="lazy"
            src="/logo1.png"
            className=""
            alt="Logo"
          />
        </Link>

        <NavList setIsOpen={setIsOpen} route={navRoutes} />
      </aside>
    );
  }

  return null;
});

MobileNavMenuModal.displayName = "MobileNavMenuModal";
export default MobileNavMenuModal;
