import React from "react";

const Signup = () => {
  return (
    <div className="flex w-10/12 m-auto justify-between max-md:flex-col max-md:text-center max-md:gap-7 items-center py-20">
      <div>
        <h1 className=" mt-8 text-[#002c9b] max-sm:text-lg text-xl font-bold tracking-[6px] font-cerapro">
          Unlock Exclusive Benefits
        </h1>
        <p className="text-lg max-md:text-base font-semibold w-[70%] max-md:w-[90%] text-gray-600 mt-1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </p>
      </div>
      <div className="w-[400px]  max-md:w-[90%] h-12 relative">
        <input
          className="w-[400px] max-md:w-[90%] border px-3 border-gray-500 rounded-full h-12"
          placeholder="Email address"
        ></input>
        <button className=" h-full w-32 max-sm:w-16 absolute right-0  rounded-full rounded-l-none text-xs tracking-wider font-bold font-cerapro text-white bg-[#002c9b] ">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Signup;
