import React from "react";
import Link from "next/link";
import Image from "next/image";
const GetStarted = () => {
  return (
    <div className="w-full">
      <div className="text-center m-auto pt-20">
        <h1 className="  text-[#00a0df] text-[43px] font-bold max-md:text-3xl max-sm:text-2xl font-serif">
          Everything You Get in SMB LEADS
        </h1>
        <h1 className="  text-[#002c9b] text-3xl max-md:text-2xl max-sm:base  max-sm:text-xl font-bold tracking-[5px] font-cerapro">
          $7.99 PER LEAD
        </h1>
        <p className="my-10 text-lg  max-sm:text-sm m-auto w-[65%] max-md:w-[80%] text-gray-600">
          When you arm sales with data that doesn’t bounce, there’s always new
          deals coming through the pipeline.
        </p>
        <Link href="/PricingDetail">
          <button className="rounded-full text-xs tracking-wider font-bold font-cerapro text-white h-11 w-44 max-md:w-[80%] bg-[#002c9b]">
            VIEW PLANS
          </button>
        </Link>
      </div>
      <div className="flex w-[80%] py-20 max-md:flex-col max-md:w-[50%] max-md:gap-5 m-auto gap-10  text-sm text-gray-600 max-md:pt-10 ">
        <div className="flex gap-4">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2020/11/uplead-prospector.png"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="inline-block ">
            <span className="font-bold">Prospector</span> Build laser targeted
            lists of prospects.
          </p>
        </div>
        <div className="flex gap-4">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2020/11/uplead-email-verification.png"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="inline-block">
            <span className="font-bold">Email Verification</span> Real time
            verification to ensure your leads are real
          </p>
        </div>
        <div className="flex gap-4">
          <Image
            className="inline-block"
            src="https://www.uplead.com/wp-content/uploads/2020/11/uplead-bulk-lookup.png"
            width={60}
            height={60}
            alt="icons"
          ></Image>
          <p className="inline-block">
            <span className="font-bold">Data Enrichment </span>Enhance your
            current data with advanced data enrichment
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
