import React, { useState } from "react";
import api from "@/redux/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const signup = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState("a");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subscription: "Free trial",
  });

  const [signUp, { isLoading, isSuccess, error, data }] =
    api.adminApis.useSignUpMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      if (response.data.success) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          subscription: "Free trial",
        });
        toast.success("Signup Successfully");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  const handleClick = (type) => {
    setClicked(type);
    let subscriptionName = "";
    switch (type) {
      case "a":
        subscriptionName = "Free trial";
        break;
      case "b":
        subscriptionName = "Standard";
        break;
      case "c":
        subscriptionName = "Premium";
        break;
      case "d":
        subscriptionName = "Enterprise";
        break;
      default:
        subscriptionName = "Free trial";
    }
    setFormData({
      ...formData,
      subscription: subscriptionName,
    });
  };
  return (
    <div className=" bg-[#CAE5F1]">
      <div className="py-8 flex justify-center items-center ">
        <div className="bg-white p-[40px] lg:w-[830px]  shadow-lg">
          <h1 className="mb-1 text-3xl text-center text-[#002C9B]  max-md:text-2xl max-sm:text-xl font-bold  font-cerapro">
            Get Started
          </h1>
          <p className="text-md text-center  text-[#303236] font-[500]  font-cerapro">
            Start your 7-Day Free Trial{" "}
            <span className="text-[#002C9B]"> $0 / 7 days</span>
          </p>

          <div className="grid grid-cols-12 gap-4 mt-10">
            <div className="col-span-12 lg:col-span-6">
              <div className="">
                <div
                  onClick={() => handleClick("a")}
                  className={`lg:w-[360px] w-full h-[100px] mb-3  cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
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
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Free trial</h3>
                      <p className="text-sm">
                        0 /07 days <br />
                        10 Leads per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("b")}
                  className={` lg:w-[360px] w-full h-[100px] mb-3  relative hover:border-[#002c9b] border-2 rounded-md ${
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
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Standard</h3>
                      <p className="text-sm">
                        29.99 /30 days
                        <br />
                        300 Leads per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("c")}
                  className={`   lg:w-[360px] w-full h-[100px] mb-3  cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
                    clicked === "c" ? "border-[#002c9b]" : "border-gray-300"
                  }`}
                >
                  {clicked === "c" && (
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
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Premium</h3>
                      <p className="text-sm">
                        49.99 /30 days
                        <br />
                        500 Leads per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("d")}
                  className={`  lg:w-[360px] w-full h-[100px] mb-3  cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
                    clicked === "d" ? "border-[#002c9b]" : "border-gray-300"
                  }`}
                >
                  {clicked === "d" && (
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
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Enterprise</h3>
                      <p className="text-sm">
                        Contact Us
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className=" text-[15px] text-[#303236]">
                Already have an account?
                <a href="/login" className="ml-[5px] font-[700] text-[#002c9b]">
                  Sign in
                </a>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-[12px]">
                  <p className="cursor-default">
                    By continuing, you agree to our &nbsp;
                    <a
                      className="group text-[#002c9b] transition-all duration-100 ease-in-out"
                      href="/termsAndConditions"
                    >
                      <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-[#002c9b] to-[#002c9b] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Terms of Use &nbsp;
                      </span>
                    </a>
                    and consent to our &nbsp;
                    <a
                      className="group text-[#002c9b] transition-all duration-100 ease-in-out"
                      href="/privacyPolicy"
                    >
                      <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-[#002c9b] to-[#002c9b] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Privacy Policy
                      </span>
                    </a>
                  </p>
                </div>
                <button
                  className="mt-5 rounded-full w-full uppercase text-sm bg-[#245091] hover:bg-[#0F346C] text-white font-cerapro py-3  tracking-[1px] "
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign Up"}
                </button>
              </form>
              {isLoading && (
                <p className="text-center text-md text-[#303236] font-[500] font-cerapro mt-4">
                  Loading...
                </p>
              )}

              {error && (
                <p className="text-center text-md text-red-500 font-[500] font-cerapro mt-4">
                  Error: {error?.data?.message}
                </p>
              )}

              {isSuccess && (
                <p className="text-center text-md text-green-500 font-[500] font-cerapro mt-4">
                  Signup successful!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
