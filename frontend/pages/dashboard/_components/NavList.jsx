"use client";

import Link from "next/link";
import { navRoutes } from "../data";
import { usePathname } from "next/navigation";

export const NavList = ({ route, setIsOpen }) => {
  const pathname = usePathname();

  const highlightActive = (arg) =>
    pathname.split(/\//).includes(arg.split(/\//)[0]);

  return (
    <ul className="flex flex-col gap-y-4 my-[2vh]">
      {route?.map((item, index) => (
        <li
          key={index}
          className={`pl-4 pr-5 border-l- ${
            highlightActive(item.route)
              ? "border-l-[#00A0DF]"
              : "border-l-white"
          }`}
        >
          <Link
            href={`/dashboard/${item.route}`}
            onClick={() => {
              setIsOpen && setIsOpen(false);
            }}
            className={`flex rounded-md flex-row  px-3 py-3.5 items-center gap-2  hover:text-[#00A0DF]  hover:bg-[#CAE5F1] ${
              highlightActive(item.route)
                ? "!bg-[#00A0DF] !text-white"
                : "text-zinc-600"
            }`}
          >
            <span className={`flex font-medium rounded-md flex-row gap-2.5 `}>
              {item.icon}
              <p className="text-md">{item.text}</p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
