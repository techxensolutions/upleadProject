"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import api from "@/redux/api";
import toast from "react-hot-toast";

const login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
    isAdmin: false,
  });
  const [signIn, { isLoading, isSuccess, error, data }] =
    api.adminApis.useSignInMutation();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    if (isSuccess && typeof window !== "undefined") {
      localStorage.setItem("userToken", JSON.stringify(data.user));

      const timeout = setTimeout(() => {
        if (data?.user?.role === "admin") {
          router.push("/dashboard/free-trail");
        } else {
          router.push("/dashboard/subscription");
        }
        clearTimeout(timeout);
      }, 500);
    }
  }, [isSuccess, typeof window !== "undefined"]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      if (response.data.success) {
        toast.success("Login Successfully");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="container mx-auto flex justify-center items-center py-12">
      <div
        className="p-[20px] rounded-[4px] min-w-[376px] "
        style={{
          boxShadow:
            " 0px 1px 4px 0px rgba(0, 0, 0, 0.08), inset 0px 0px 0px 1px #f0f2f7",
        }}
      >
        <h1 className="text-3xl text-center pb-4 max-md:text-2xl max-sm:text-xl font-bold  font-cerapro">
          Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label
              for="password"
              className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
              required
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-[#0F346C] transition duration-150 ease-in-out"
              />
              <label
                for="remember_me"
                className="ml-2 block text-sm tracking-[1px] text-[#0F346C] font-cerapro"
              >
                Remember Me
              </label>
            </div>
            {/* <div className=" flex items-center">
              <input
                id="is_admin"
                name="isAdmin"
                type="checkbox"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-[#0F346C] transition duration-150 ease-in-out"
              />
              <label
                htmlFor="is_admin"
                className="ml-2 block text-sm tracking-[1px] text-[#0F346C] font-cerapro"
              >
                Admin
              </label>
            </div> */}
            {/* <div className="text-sm tracking-[1px]">
            <a
              href="#"
              className=" font-cerapro text-[#0F346C] hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Forgot Password?
            </a>
          </div> */}
          </div>
          <div className="mt-4">
            <button
              className="w-full text-sm uppercase bg-[#245091] hover:bg-[#0F346C] text-white font-cerapro py-3  tracking-[1px] "
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "LOG IN"}
            </button>
          </div>
          {error && (
            <div className="text-red-500 mt-2">
              {error.data?.message || "An error occurred during login"}
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-[#6A6D75]">
          Do not have an account?
          <a href="/signup" className="ml-[3px] text-[#6A6D75]">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default login;
