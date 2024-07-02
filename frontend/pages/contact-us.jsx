"use client";
import React, { useState } from "react";
import api from "@/redux/api";
const contactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [contact, { isLoading, isSuccess, error, data }] =
    api.adminApis.useCreateFormSubmissionMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contact(formData);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact failed:", err);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center px-6">
        <div className="mx-auto w-full max-w-[550px] bg-white my-8">
          <h1 className=" text-center text-[#00a0df] text-[40px] max-md:text-[30px] font-extrabold  font-serif">
            Get in Touch&nbsp;
          </h1>
          <p className="text-center text-[#002c9b] text-4xl max-md:text-2xl font-bold tracking-[6px] font-cerapro">
            Contact Us
          </p>
          <form onSubmit={handleSubmit}>
            <div className="my-6 ">
              <label
                for="name"
                className="mb-3 block text-base font-medium text-[#002684]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#002684] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                for="email"
                className="mb-3 block text-base font-medium text-[#002684]"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#002684] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                for="subject"
                className="mb-3 block text-base font-medium text-[#002684]"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter your subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#002684] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-[#002684]"
              >
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#002684] focus:shadow-md"
              ></textarea>
            </div>
            <div>
              <button
                className="w-full hover:shadow-form rounded-md bg-[#002684] py-3 px-8 text-base font-semibold text-white outline-none"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
            {error && (
              <div className="text-red-500 mt-2">{error.data?.message}</div>
            )}
            {isSuccess && (
              <div className="text-green-500 mt-2">
                Your message has been sent successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default contactUs;
