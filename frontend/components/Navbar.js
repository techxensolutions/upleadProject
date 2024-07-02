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
                className="hover:text-[#002c9b] text-gray-500 text-sm mr-5"
              >
                Dashboard
              </Link>

              <button
                onClick={handleSignOut}
                className="font-semibold bg-orange-600 text-white text-sm w-[136px] h-[38px] hover:opacity-90 rounded-sm max-md:hidden"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-[#002c9b] text-gray-500 text-sm mr-5"
              >
                LOG IN{" "}
              </Link>
              <Link href="/signup">
                <button className="font-semibold bg-orange-600 text-white text-sm w-[136px] h-[38px] hover:opacity-90 rounded-sm max-md:hidden">
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
        <div className="relative z-30 w-screen h-44 bg-inherit text-center">
          {" "}
          <ul className="flex flex-col gap-3 font-semibold">
            <Link href="/PricingDetail">
              <li>Pricing</li>
            </Link>
            <Link href="/contact-us">
              <li>Contact Us</li>
            </Link>
            <Link href="/about">
              <li>About Us</li>
            </Link>
            <Link href="/faqs">
              <li>FAQs</li>
            </Link>
          </ul>
          {/* <button className="font-semibold bg-[#7dd3fc] rounded-full w-[186px] h-[48px] mt-4 ">
            Get Sybil Now
            <svg
              className="inline-block ml-4"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.586 11.1569L11.636 7.20692C11.4538 7.01832 11.353 6.76571 11.3553 6.50352C11.3576 6.24132 11.4628 5.99051 11.6482 5.8051C11.8336 5.61969 12.0844 5.51452 12.3466 5.51224C12.6088 5.50997 12.8614 5.61076 13.05 5.79292L18.707 11.4499C18.8002 11.5426 18.8741 11.6527 18.9246 11.7741C18.9751 11.8954 19.001 12.0255 19.001 12.1569C19.001 12.2883 18.9751 12.4184 18.9246 12.5398C18.8741 12.6611 18.8002 12.7713 18.707 12.8639L13.05 18.5209C12.9578 18.6164 12.8474 18.6926 12.7254 18.745C12.6034 18.7974 12.4722 18.825 12.3394 18.8262C12.2066 18.8273 12.0749 18.802 11.952 18.7517C11.8291 18.7015 11.7175 18.6272 11.6236 18.5333C11.5297 18.4394 11.4555 18.3278 11.4052 18.2049C11.3549 18.082 11.3296 17.9503 11.3307 17.8175C11.3319 17.6847 11.3595 17.5535 11.4119 17.4315C11.4643 17.3095 11.5405 17.1992 11.636 17.1069L15.586 13.1569H6C5.73478 13.1569 5.48043 13.0516 5.29289 12.864C5.10536 12.6765 5 12.4221 5 12.1569C5 11.8917 5.10536 11.6373 5.29289 11.4498C5.48043 11.2623 5.73478 11.1569 6 11.1569H15.586Z"
                fill="black"
              />
            </svg>
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
