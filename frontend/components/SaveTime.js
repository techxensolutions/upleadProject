import React from "react";
import Link from "next/link";
import Image from "next/image";

const SaveTime = () => {
  return (
    <div className="bg-[#00a0df]">
      <div className=" text-center w-[65%]  max-sm:w-[90%] m-auto py-20">
        <h1 className=" mt-8 text-white text-3xl max-md:text-2xl max-sm:text-xl font-bold tracking-[6px]  max-sm:tracking-[4px] font-cerapro">
          Find Your Top Prospects’ Accurate Contact Data
        </h1>
      </div>
      <div className="text-white flex w-10/12 max-md:flex-col m-auto gap-10 mb-16 text-sm  max-md:w-[50%] ">
        <div className="text-center">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2020/11/uplead-find-the-right-leads-for-you.png"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="font-bold mt-4 mb-2">Find the right leads for you</p>
          <p>
            Use +50 search filters to uncover contacts and companies that match
            your buyer profile.
          </p>
        </div>
        <div className="text-center">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2020/11/uplead-get-their-most-important-info.svg"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="font-bold mt-4 mb-2">Get their most important info</p>
          <p>
            Grab your contact’s email and phone number. See what technology they
            use, and use that as a starting point in your conversation.
          </p>
        </div>
        <div className="text-center">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2020/11/uplead-verify-their-data-in-real-time.svg"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="font-bold mt-4 mb-2">Verify their data in real time</p>
          <p>
            SMB LEADS’s real-time email verification ensures you are always
            connecting with real, qualified leads.
          </p>
        </div>
        <div className="text-center">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2021/03/uplead-mobile-phone-direct.svg"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="font-bold mt-4 mb-2">Mobile Direct Dials</p>
          <p>Get mobile & direct dial phone numbers for prospects</p>
        </div>
      </div>
      <div className="flex justify-center pb-20">
        <Link href="/PricingDetail">
          <button className="rounded-full text-xs tracking-wider font-bold font-cerapro  text-[#002c9b] h-11 w-44 bg-white">
            VIEW PLANS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SaveTime;
