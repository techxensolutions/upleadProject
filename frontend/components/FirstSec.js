import React from "react";
import Image from "next/image";
import Link from "next/link";

const FirstSec = () => {
  return (
    <div className="flex justify-center bg-[#CAE5F1] pt-12 w-full h-screen">
      <div className="w-[70%] max-md:w-full max-md:p-8 lg:pl-12">
        <Image src="/logo.png" width={200} height={100} alt="web logo" />
        <h1 className="mt-8 text-[#002c9b] text-5xl max-md:text-4xl font-bold tracking-[6px] max-sm:text-3xl max-sm:tracking-[3px] font-cerapro">
          <span className="my-5 text-[#00a0df] text-5xl max-md:text-4xl font-bold tracking-[1px] max-sm:text-3xl font-serif max-sm:my-2">
            SMB LEADS
          </span>{" "}
          Digs for Gold
        </h1>
        <h1 className="my-5 text-[#00a0df] text-5xl max-md:text-4xl font-bold tracking-[1px] max-sm:text-3xl font-serif max-sm:my-2">
          So You Don’t Have To
        </h1>
        <p className="my-4 text-lg w-[47%] max-md:w-[62%] max-sm:w-[82%] max-sm:text-base font-semibold max-md:my-0 text-gray-600">
          Scraping millions of contacts and selling access to a database with no
          regards for accuracy is easy.
          <br />
          Helping you build a clean prospecting list that you can plug into your
          sales tools and generate new leads from, right away? That’s hard.
          <br />
          Data accuracy is our #1 priority at SMB LEADS. That’s why we are the only
          prospecting company to offer a 95% or higher accuracy guarantee.
        </p>
        <Link href="/pricing">
          <button className="rounded-full text-xs tracking-wider font-bold font-cerapro text-white h-11 mt-8 w-44 bg-[#002c9b]">
            VIEW PLANS
          </button>
        </Link>
      </div>

      <div className=" w-[30%] bg-background-meal bg-cover hidden lg:block bg-center h-full"></div>
    </div>
  );
};

export default FirstSec;
