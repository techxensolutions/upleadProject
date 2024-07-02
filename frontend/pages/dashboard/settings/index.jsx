import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import DashboardPage from "../index";
import LoadingButton from "@/SharedComponents/LoadingButton";
import Link from "next/link";
import api from "@/redux/api";
const plainOptions = ["Free Trail", "Standard", "Premium", "Enterprise"];
export default function PersonalProfile({}) {
  const router = useRouter();
  const action = useSearchParams().get("action");
  const loggedInUser =
    typeof window != "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: null,
  });

  const [
    updateUser,
    {
      isLoading: isSubmitting,
      isSuccess: submitSuccess,
      data: submitData,
      error: submitError,
      reset,
    },
  ] = api.adminApis.useUpdateUserMutation();

  useEffect(() => {
    setFormData({
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      email: loggedInUser?.email,
      subscription: loggedInUser?.subscription,
      photo: null,
    });
  }, []);
  console.log("submitData", submitData);
  const isLoading = false;
  useEffect(() => {
    if (submitSuccess && submitData) {
      const updatedUserData = {
        ...loggedInUser,
        firstName: submitData.user.firstName,
        lastName: submitData.user.lastName,
        email: submitData.user.email,
        subscription: submitData.user.subscription,
      };
      localStorage.setItem("userToken", JSON.stringify(updatedUserData));
    }
  }, [submitSuccess, submitData]);
  const handleInputChange = (e) => {
    const { name, value, id, itemId } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (selectedFile) => {
    setFormData({ ...formData, photo: selectedFile });
  };
  const cancelForm = () => {
    router.back();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateUser({ userId: loggedInUser._id, updatedUser: formData });
    const updatedFormData = new FormData();
    updatedFormData.append("firstName", formData.firstName);
    updatedFormData.append("lastName", formData.lastName);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("subscription", formData.subscription);

    if (formData.photo) {
      updatedFormData.append("photo", formData.photo);
    }

    updateUser({ userId: loggedInUser._id, updatedUser: updatedFormData });
  };
  return (
    <DashboardPage>
      <section className="m-5 lg:m-10">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <button
              onClick={cancelForm}
              type="button"
              className="text-stone-600 w-max flex font-medium flex-row items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Go Back
            </button>
            <div className="flex flex-row items-center gap-3 mt-3 ml-auto">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                sucess={submitSuccess}
                successText="Sucessful!"
                className="rounded-md bg-[#00A0DF] px-6 font-medium shadow-md py-1.5  text-white"
              >
                Save
              </LoadingButton>
              <button
                onClick={cancelForm}
                type="button"
                className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="items-start flex flex-col py-1 max-md:px-4 max-w-screen-md">
            <div className="items-stretch self-stretch flex justify-between gap-5 mt-9 max-md:max-w-full max-md:flex-wrap">
              <label htmlFor="firstName" className="grow basis-1/2">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  FIRST NAME
                </p>
                {!isLoading ? (
                  <input
                    id="firstName"
                    name="firstName"
                    disabled={action == "view"}
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter here"
                    className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
                  />
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )}
              </label>

              <label htmlFor="lastname" className="grow basis-1/2">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  LAST NAME
                </p>
                {!isLoading ? (
                  <input
                    id="lastName"
                    name="lastName"
                    disabled={action == "view"}
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter here"
                    className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
                  />
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )}
              </label>
            </div>
            <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
              <label htmlFor="email" className="grow basis-1/2">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  EMAIL
                </p>
                {!isLoading ? (
                  <span className="relative bg-test">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 absolute top-0 bottom-0 left-3 my-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    <input
                      id="email"
                      name="email"
                      disabled={action == "view"}
                      value={formData?.email}
                      // onChange={handleInputChange}
                      type="text"
                      placeholder="Enter here"
                      className="text-neutral-500 w-full  !pl-10 text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
                    />
                  </span>
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )}
              </label>
              <label htmlFor="subscription" className="grow basis-1/2">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  Subscription
                </p>
                {!isLoading ? (
                  <input
                    id="subscription"
                    name="subscription"
                    disabled={action === "view"}
                    value={formData?.subscription}
                    onChange={handleInputChange}
                    readOnly
                    type="text"
                    placeholder="Enter here"
                    className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 whitespace-nowrap border focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1 px-3 lg:px-4 py-3 rounded-md items-start max-md:pr-5"
                  />
                ) : (
                  <div className="w-full p-[23px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )}
              </label>
            </div>

            <div className="items-stretch self-stretch flex justify-between gap-5 mt-4 max-md:max-w-full max-md:flex-wrap">
              <div className="h-[55px] relative aspect-square w-auto border rounded-full object-cover object-center overflow-hidden">
                {formData?.photo && (
                  <Image
                    fill
                    className="h-full w-full object-cover object-center !z-[2]"
                    alt="passport"
                    src={URL.createObjectURL(formData.photo)}
                  />
                )}
              </div>
              <label htmlFor="about" className="grow">
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  PROFILE PHOTO
                </p>
                {!isLoading ? (
                  <FileUploader
                    classes={`${
                      formData?.photo && "bg-green-100"
                    } !border !border-px !flex !gap-3 !justify-center !items-center !mt-1 !border-slate-400 !max-h-none !max-w-none w-full !p-20`}
                    handleChange={handleFileUpload}
                    onDrop={handleFileUpload}
                    name="file"
                    types={["JPEG", "JPG", "PNG"]}
                  />
                ) : (
                  <div className="w-full p-[23px] h-[188px] bg-neutral-200 mt-1 animate-pulse rounded-md" />
                )}
              </label>
            </div>
          </div>
        </form>
        <div className="mt-6 flex gap-8">
          <Link href="/PricingDetail">
            <p className="text-neutral-700 text-sm underline leading-4 tracking-wides">
              View Plans
            </p>
          </Link>
          <Link href="/contact-us">
            <p className="text-neutral-700 text-sm leading-4 underline tracking-wides">
              Contact Us
            </p>
          </Link>
        </div>
      </section>
    </DashboardPage>
  );
}
