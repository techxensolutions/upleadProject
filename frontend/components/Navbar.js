import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const loggedInUser =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));
  const [NavbarClicked, setNavbarClicked] = useState(false);
  function handleClick() {
    setNavbarClicked(!NavbarClicked);
    console.log(NavbarClicked);
  }
  const handleSignOut = () => {
    if (typeof window !== "undefined" && loggedInUser) {
      localStorage.removeItem("userToken");
      router.push("/");
      toast.success("Logout Successfully");
    }
  };
  return (
    <nav className="w-full  border-b">
      <div className="px-6 m-auto flex justify-between h-[68px] items-center ">
        <div className="flex gap-10 justify-center items-center">
          <Link href="/">
            <div className="flex  h-16 justify-center items-center">
              <img className="w-full h-full " src="/logo1.png" alt="Logo" />
            </div>
          </Link>
          <ul className="flex gap-8 text-gray-500 max-md:hidden text-sm ">
            <Link href="/PricingDetail" className="hover:text-[#002c9b]">
              <li>View Plans</li>
            </Link>
            <Link href="/about" className="hover:text-[#002c9b]">
              <li>About Us</li>
            </Link>
            <Link href="/faqs" className="hover:text-[#002c9b]">
              <li>FAQs</li>
            </Link>
            <Link href="/contact-us" className="hover:text-[#002c9b]">
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
        <div>
          {loggedInUser ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-[#002c9b] text-gray-500 text-sm mr-5 max-md:hidden"
              >
                Dashboard
              </Link>

              <button
                onClick={handleSignOut}
                className="font-semibold  bg-[#245091] hover:bg-[#0F346C] text-white text-sm w-[136px] h-[38px] hover:opacity-90 rounded-sm max-md:hidden"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-[#002c9b] text-gray-500 text-sm mr-5  max-md:hidden"
              >
                LOG IN{" "}
              </Link>
              <Link href="/signup">
                <button className="font-semibold  bg-[#245091] hover:bg-[#0F346C] text-white text-sm w-[136px] h-[38px] hover:opacity-90 rounded-sm max-md:hidden">
                  SIGN UP
                </button>
              </Link>
            </>
          )}
        </div>
        <div
          className="hidden max-md:block border-[#60cde8bb] p-[7px] border w-10 h-10 hover:bg-[#d4e6eb62] rounded-md cursor-pointer relative z-30"
          onClick={handleClick}
        >
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 448 512"
          >
            {" "}
            <path
              fill="#00ccff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </div>
      </div>
      {NavbarClicked && (
        <div className="relative z-30 w-screen bg-white text-center">
          <ul className="flex flex-col gap-3 font-semibold p-4">
            <Link href="/PricingDetail">
              <li className="hover:text-[#002c9b]">Pricing</li>
            </Link>
            <Link href="/contact-us">
              <li className="hover:text-[#002c9b]">Contact Us</li>
            </Link>
            <Link href="/about">
              <li className="hover:text-[#002c9b]">About Us</li>
            </Link>
            <Link href="/faqs">
              <li className="hover:text-[#002c9b]">FAQs</li>
            </Link>
            {loggedInUser ? (
              <>
                <Link href="/dashboard">
                  <li className="hover:text-[#002c9b]">Dashboard</li>
                </Link>
                <div className="text-center">
                  <button
                    onClick={handleSignOut}
                    className="font-semibold  bg-[#245091] hover:bg-[#0F346C] text-white text-sm w-[136px] h-[38px] hover:opacity-90 rounded-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <li className="hover:text-[#002c9b]">LOG IN</li>
                </Link>
                <Link href="/signup">
                  <li className="hover:text-[#002c9b]">
                    <div className="text-center">
                      <button className="font-semibold  bg-[#245091] hover:bg-[#0F346C] text-white text-sm w-[136px] h-[38px] hover:opacity-90 rounded-sm">
                        SIGN UP
                      </button>
                    </div>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
