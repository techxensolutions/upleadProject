import React from "react";
import Image from "next/image";
import { useState } from "react";
const PersonalizeMeal = () => {
  const [clicked, setClicked] = useState("a");
  const [item, setitem] = useState([]);
  const [selectedbtn, setSelectedbtn] = useState("1");
  const [meal, setmeal] = useState("meal4");

  const handleBtn = (item) => {
    setSelectedbtn(item);
  };
  const handleMeal = (meal) => {
    setmeal(meal);
  };
  function handleClick(x) {
    setClicked(x);
  }
  const handleItem = (x) => {
    setitem((prevSelectedItems) => {
      if (prevSelectedItems.includes(x)) {
        // If item is already selected, remove it from the list
        return prevSelectedItems.filter((item) => item !== x);
      } else {
        // If item is not selected, add it to the list
        return [...prevSelectedItems, x];
      }
    });
  };

  return (
    <div className="bg-[#f8f9fa] mb-5 ">
      <div className=" text-center py-8 ">
        <h1 className="font-serif text-[27px] text-gray-800 font-semibold">
          SMB LEADS Plans & Pricing
        </h1>
        <p className="text-gray-500 text-lg">
          Find the plan that’s right for you.
        </p>
      </div>
      <div className="bg-[#ffffff] py-4 text-center m-auto rounded-sm w-10/12 border ">
        <h1 className="text-xl font-bold">1. Choose a type of meal</h1>
        <div className="flex mt-6 gap-8 justify-center" style={{border:"2px solid red"}}>
          <div
            onClick={() => handleClick("a")}
            className={`w-[360px]  h-[100px] cursor-pointer relative hover:border-[#002c9b]  border-2 rounded-md  ${
              clicked === "a" ? "border-[#002c9b]" : "border-gray-300"
            }`}
          >
            {clicked === "a" && (
              <div className="absolute right-2 top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#002c9b"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  />
                </svg>
              </div>
            )}
            <div className="flex h-full">
              <Image
                className="left-0 top-0 h-full inline-block"
                src="/kitchen.jpeg"
                width={100}
                height={120}
                alt="kitchen"
              ></Image>
              <div className="text-left text-gray-500 h-full p-2">
                <h3 className="font-bold">Meal Kits</h3>
                <p className=" text-sm">
                  Ingredients and easy-to-follow recipes for home-cooked meals
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleClick("b")}
            className={`w-[360px]  h-[100px] cursor-pointer relative hover:border-[#002c9b]  border-2 rounded-md  ${
              clicked === "b" ? "border-[#002c9b]" : "border-gray-300"
            }`}
          >
            {clicked === "b" && (
              <div className="absolute right-2 top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#002c9b"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  />
                </svg>
              </div>
            )}
            <div className="flex h-full">
              <Image
                className="left-0 top-0 h-full inline-block"
                src="/kitchen.jpeg"
                width={100}
                height={120}
                alt="kitchen"
              ></Image>
              <div className="text-left text-gray-500 h-full p-2">
                <h3 className="font-bold">Meal Kits</h3>
                <p className=" text-sm">
                  Ingredients and easy-to-follow recipes for home-cooked meals
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-center m-auto italic text-gray-500 py-6 w-[40%]">
          Want both? Select Prepared & Ready meals can be added to meal kit
          orders as Add-ons each week.
        </p>
        <hr></hr>
        {/* ///////////////////toggle section/////////////// */}
        <div className="py-4 flex justify-center">
          <div>
            <h1 className="text-xl font-bold py-4">
              2. Choose your preferences
            </h1>

            <div
              onClick={() => handleItem("a")}
              className={`w-[375px]  mb-3 h-[120px] cursor-pointer relative hover:border-[#002c9b]  border-2 rounded-md  ${
                item && item.includes("a")
                  ? "border-[#002c9b]"
                  : "border-gray-300"
              }`}
            >
              {item.includes("a") && (
                <div className="absolute right-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#002c9b"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                </div>
              )}
              <div className="flex h-full">
                <Image
                  className="left-0 top-0 h-full mx-2 inline-block"
                  src="/burger.svg"
                  width={50}
                  height={80}
                  alt="kitchen"
                ></Image>
                <div className="text-left text-gray-500 h-full p-2">
                  <h3 className="font-bold">Free Trial</h3>
                  <p className=" text-sm">
                    Verified Emails , Mobile Phones , Chrome Extension
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleItem("b")}
              className={`w-[375px] mb-3 h-[120px] cursor-pointer relative hover:border-[#002c9b]  border-2 rounded-md  ${
                item && item.includes("b")
                  ? "border-[#002c9b]"
                  : "border-gray-300"
              }`}
            >
              {item.includes("b") && (
                <div className="absolute right-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#002c9b"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                </div>
              )}
              <div className="flex h-full">
                <Image
                  className="left-0 top-0 h-full mx-2 inline-block"
                  src="/burger.svg"
                  width={50}
                  height={80}
                  alt="kitchen"
                ></Image>
                <div className="text-left text-gray-500 h-full p-2">
                  <h3 className="font-bold">Essentials</h3>
                  <p className=" text-sm">
                    Verified Emails, Mobile Phones, CRM Integration, Company
                    News,
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleItem("c")}
              className={`w-[375px] mb-3 h-[120px] cursor-pointer relative hover:border-[#002c9b]  border-2 rounded-md  ${
                item && item.includes("c")
                  ? "border-[#002c9b]"
                  : "border-gray-300"
              }`}
            >
              {item.includes("c") && (
                <div className="absolute right-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#002c9b"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                </div>
              )}
              <div className="flex h-full">
                <Image
                  className="left-0 top-0 h-full mx-2 inline-block"
                  src="/burger.svg"
                  width={50}
                  height={80}
                  alt="kitchen"
                ></Image>
                <div className="text-left text-gray-500 h-full p-2">
                  <h3 className="font-bold">Plus</h3>
                  <p className=" text-sm">
                    Data Enrichment, Email Pattern Intel, Technographics ,
                    Advanced Filters , Suppression List Uploads
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleItem("d")}
              className={`w-[375px]  h-[120px] cursor-pointer relative hover:border-[#002c9b]  border-2 rounded-md  ${
                item && item.includes("d")
                  ? "border-[#002c9b]"
                  : "border-gray-300"
              }`}
            >
              {item.includes("d") && (
                <div className="absolute right-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#002c9b"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                </div>
              )}
              <div className="flex h-full">
                <Image
                  className="left-0 top-0 h-full mx-2 inline-block"
                  src="/burger.svg"
                  width={50}
                  height={80}
                  alt="kitchen"
                ></Image>
                <div className="text-left text-gray-500 h-full p-2">
                  <h3 className="font-bold">Professional</h3>
                  <p className=" text-sm">
                    Buyer Intent Data, All Search Filters, Full API Access,
                    Advanced CRM Integrations. Competitor Intelligence,
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-center m-auto italic text-gray-500 py-6">
              Want both? Select Prepared & Ready meals can be added to meal kit
              orders as Add-ons each week.
            </p>
          </div>

          <div>
            <h1 className="text-xl font-bold py-4">3. Select your plan</h1>
            <div className="flex gap-4 text-[#002c9b] cursor-pointer font-bold text-lg items-center">
              <h1 className="text-lg font-bold text-gray-800 ">
                Servings per meal
              </h1>
              <div className="w-[225px] h-[43px] flex border   text-center border-gray-400 ">
                <div
                  onClick={() => handleBtn("1")}
                  className={`w-[50%] h-full items-center justify-center flex ${
                    selectedbtn === "1"
                      ? "bg-[#002c9b] text-white text-center transition-colors duration-100"
                      : ""
                  }`}
                >
                  1
                </div>
                <div
                  onClick={() => handleBtn("2")}
                  className={`w-[50%] h-full items-center justify-center flex ${
                    selectedbtn === "2"
                      ? "bg-[#002c9b] text-white transition-colors duration-100"
                      : ""
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5 text-[#002c9b] cursor-pointer font-bold text-lg items-center">
              <h1 className="text-lg font-bold text-gray-800 ">
                Meals per Week
              </h1>
              <div className="w-[225px] h-[43px] flex border   text-center border-gray-400 ">
                <div
                  onClick={() => handleMeal("meal1")}
                  className={`w-[50%] h-full items-center justify-center flex ${
                    meal === "meal1"
                      ? "bg-[#002c9b] text-white text-center transition-colors duration-100"
                      : ""
                  }`}
                >
                  1
                </div>
                <div
                  onClick={() => handleMeal("meal2")}
                  className={`w-[50%] h-full items-center justify-center flex ${
                    meal === "meal2"
                      ? "bg-[#002c9b] text-white transition-colors duration-100"
                      : ""
                  }`}
                >
                  2
                </div>
                <div
                  onClick={() => handleMeal("meal3")}
                  className={`w-[50%] h-full items-center justify-center flex ${
                    meal === "meal3"
                      ? "bg-[#002c9b] text-white text-center transition-colors duration-100"
                      : ""
                  }`}
                >
                  3
                </div>
                <div
                  onClick={() => handleMeal("meal4")}
                  className={`w-[50%] h-full items-center justify-center flex ${
                    meal === "meal4"
                      ? "bg-[#002c9b] text-white text-center transition-colors duration-100"
                      : ""
                  }`}
                >
                  4
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 mt-5 rounded-md">
              <h1 className="text-lg font-bold text-left text-gray-900 ">
                Order Summary
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Price per Lead</p>
                <p className="font-bold text-sm">$9.99</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Shipping</p>
                <p className="font-bold text-sm">$10.99</p>
              </div>
              <div className="flex mt-2 justify-between items-center">
                <p className="text-gray-700 font-semibold">
                  First order subtotal{" "}
                </p>
                <p className="font-bold">$10.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeMeal;
