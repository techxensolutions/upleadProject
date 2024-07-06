import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function PricingDetail() {
  const router = useRouter();
  const cardContent = [
    {
      heading: "Test Drive",
      pkgHeading: "Free Trial",
      priceHead: 0,
      day: "/07 days",
      itemText: "5 Credits",
      BtnText: "Try For Free",
      servicePkg: "Everything in Free and:",
      list1: "10 Leads per month",
      list2: "Verified phone number",
      list3: "Verified Email",
      lastElement: "Show plan comparison",
    },
    {
      heading: "The Basics",
      pkgHeading: "Standard",
      priceHead: 29.99,
      day: "/30 days",
      itemText: "10 Credits",
      BtnText: "Try For Free",
      servicePkg: "Everything in Free and:",
      list1: "300 Leads per month",
      list2: "Verified phone number",
      list3: "Verified Email",
      list4: "Physical Address",
      lastElement: "Show plan comparison",
    },
    {
      heading: "For Individuals",
      pkgHeading: "Premium Plan",
      priceHead: 49.99,
      day: "/30 days",
      itemText: "15 Credits",
      BtnText: "Try For Free",
      servicePkg: "Everything in Plus and:",
      list1: "500 Leads per month",
      list2: "Verified phone number",
      list3: "Verified Email",
      list4: "Physical Address",
      list5: "Address",
      lastElement: "Show plan comparison",
    },
    {
      heading: "For Organizations",
      pkgHeading: "Enterprise",
      priceHead: "",
      day: "/30 days",
      itemText: "15 Credits",
      BtnText: "Try For Free",
      servicePkg: "Gold includes:",
      list1: "Contact Us",
      lastElement: "Show plan comparison",
    },
  ];

  return (
    <>
      <div className="container m-auto py-20 px-24">
        <div className="text-center">
          <h1 className="text-[42px] font-bold">SMB LEADS Plans & Pricing</h1>
          <p className="text-[22px] text-[#69727a] mt-2">
            Find the plan that’s right for you.{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-full gap-5 mt-5">
          {cardContent?.map((item, index) => (
            <div key={index} className="">
              {/* <h5 className="bg-[#F6F8F9] rounded-md py-2 font-medium text-center">
                {item.heading}
              </h5> */}
              <div
                className={`p-4 mt-5 rounded-md ${
                  index === 3 ? "bg-[#00A2BB]" : ""
                } `}
                style={{
                  boxShadow:
                    "0 0 2px 1px rgba(25.000000000000004, 33, 61, .08)",
                  height: "95%",
                }}
              >
                <h1
                  className={`text-[26px] font-bold border-b-[1px] pb-3 ${
                    index === 3 ? "!text-white" : ""
                  }`}
                >
                  {item.pkgHeading}
                </h1>
                <div className="flex items-end mt-5">
                  <h1
                    className={`text-[42px] font-bold ${
                      index === 3 ? "!text-white" : ""
                    }`}
                  >
                    {item.priceHead}
                  </h1>
                  <span
                    className={`text-[#69727a] text-[16px] font-bold ${
                      index === 3 ? "!text-white" : ""
                    }`}
                  >
                    {item.day}{" "}
                  </span>
                </div>
                {/* <div className="flex items-center gap-2 mt-3">
                  <span
                    className={`text-black ${index === 3 ? "!text-white" : ""}`}
                  >
                    {item.itemText}
                  </span>
                  <div
                    className={`bg-[#E4F9FD] w-5 h-5 flex items-center justify-center rounded-full ${
                      index === 3 ? "!text-white" : ""
                    }`}
                  >
                    <span className={`text-[#69727a] `}>?</span>
                  </div>
                </div> */}
                <div className="border-b-[1px] pt-8 pb-8">
                  <button
                    onClick={() => router.push("/dashboard/changeSubscription")}
                    className={`rounded-full w-full text-lg tracking-wider font-bold font-cerapro text-[#002c9b] h-14 bg-transparent hover:bg-[#69727a] hover:text-white border-[1px] border-[#69727a] ${
                      index === 3 ? "bg-white text-[#69727a]" : ""
                    }`}
                  >
                    {item.BtnText}
                  </button>
                </div>
                <div>
                  <div className="h-[200px]">
                    <h5
                      className={`text-[16px] font-bold py-5 ${
                        index === 3 ? "!text-white" : ""
                      }`}
                    >
                      {item.servicePkg}
                    </h5>
                    {Object.keys(item)?.map((key, index) => {
                      if (key.startsWith("list")) {
                        return (
                          <>
                            <div
                              key={index}
                              className="flex gap-2 items-center pb-4"
                            >
                              <span
                                className={`${index === 3 ? "text-white" : ""}`}
                              >
                                {item[key]}
                              </span>
                              <div
                                className={`bg-[#E4F9FD] w-5 h-5 flex items-center justify-center rounded-full`}
                              >
                                <span
                                  className={`text-[#69727a] ${
                                    index === 3 ? "!text-white" : ""
                                  }`}
                                >
                                  ?
                                </span>
                              </div>
                            </div>
                          </>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="pt-28 pb-8">
                    <button
                      className={`rounded-full w-full text-lg tracking-wider font-bold font-cerapro text-[#002c9b] h-14 bg-transparent hover:bg-[#69727a] hover:text-white border-[1px] border-[#69727a] ${
                        index === 3 ? "bg-white text-[#69727a]" : ""
                      }`}
                    >
                      {item.BtnText}
                    </button>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <span
                      className={`text-black ${
                        index === 3 ? "!text-white" : ""
                      }`}
                    >
                      {item.lastElement}
                    </span>
                    <img
                      className=""
                      src="/down-arrow.png"
                      width={20}
                      height={6}
                      alt="icons"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
