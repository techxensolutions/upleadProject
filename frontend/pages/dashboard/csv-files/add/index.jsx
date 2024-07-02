import React, { useState } from "react";
import DashboardPage from "../../index";
import LoadingButton from "@/SharedComponents/LoadingButton";
import { useRouter } from "next/router";
import api from "@/redux/api";
import toast from "react-hot-toast";

const AddCsv = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [plans, setPlans] = useState({
    freeTrial: false,
    standard: false,
    premium: false,
    enterprise: false,
  });

  const [createCsvFile, { isLoading, isSuccess, error }] =
    api.adminApis.useCreateCsvFileMutation();

  const router = useRouter();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePlanChange = (e) => {
    const { name, checked } = e.target;
    setPlans((prevPlans) => ({ ...prevPlans, [name]: checked }));
  };

  const cancelForm = () => {
    router.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload a file.");
      return;
    }

    const selectedPlans = Object.keys(plans).filter((plan) => plans[plan]);

    if (selectedPlans.length === 0) {
      alert("Please select at least one plan.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("plans", JSON.stringify(selectedPlans));

    try {
      const response = await createCsvFile(formData).unwrap();

      if (response.success) {
        setSelectedFile(null);
        setPlans({
          freeTrial: false,
          standard: false,
          premium: false,
          enterprise: false,
        });
        toast.success("Created Successfully");
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    } catch (err) {
      console.error("Failed to upload file:", err);
    }
  };

  return (
    <DashboardPage>
      <div className="p-3 md:p-3 lg:p-4 xl:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="flex items-center my-5 justify-between">
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
            <div className="flex flex-row items-center gap-3">
              <LoadingButton
                type="submit"
                loading={isLoading}
                success={isSuccess}
                successText="Successful!"
                className="rounded-md bg-[#00A0DF] px-6 font-medium shadow-md py-1.5 text-white"
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
          </section>

          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload CSV File
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium text-gray-700">
              Select Plans
            </legend>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="freeTrial"
                name="freeTrial"
                checked={plans.freeTrial}
                onChange={handlePlanChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="freeTrial" className="ml-3 text-sm text-gray-700">
                Free Trial
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="standard"
                name="standard"
                checked={plans.standard}
                onChange={handlePlanChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="standard" className="ml-3 text-sm text-gray-700">
                Standard
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="premium"
                name="premium"
                checked={plans.premium}
                onChange={handlePlanChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="premium" className="ml-3 text-sm text-gray-700">
                Premium
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="enterprise"
                name="enterprise"
                checked={plans.enterprise}
                onChange={handlePlanChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="enterprise"
                className="ml-3 text-sm text-gray-700"
              >
                Enterprise
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </DashboardPage>
  );
};

export default AddCsv;
