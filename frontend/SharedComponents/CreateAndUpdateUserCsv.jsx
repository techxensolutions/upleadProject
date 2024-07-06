"use client";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingButton from "@/SharedComponents/LoadingButton";
import toast from "react-hot-toast";
import api from "@/redux/api";
const CreateAndUpdateUserCsv = ({
  modalOpen,
  setModalOpen,
  selectedQuery,
  refetch,
}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [createUserCsvFile, { isSuccess, isLoading, error }] =
    api.adminApis.useCreateUserCsvFileMutation();

  const handleCsvCreation = async () => {
    if (!file) {
      toast.error("Please upload a CSV file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("queryId", selectedQuery._id);
    formData.append("userId", selectedQuery.userId);

    try {
      await createUserCsvFile(formData);
      toast.success("CSV file uploaded successfully!");

      handleModalClose();
    } catch (error) {
      toast.error("Failed to upload CSV file.");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);
  return (
    <div>
      <Dialog
        open={modalOpen}
        className="[&>*>*]:p-3 lg:[&>*>*]:p-4 [&>*>*]:rounded-xl [&>*]:!backdrop-blur-[3px]"
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <button onClick={handleModalClose} className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="card min-h-[250px] snap-start snap-always h-full duration-300 min-w-[270px] max-w-[350px]  rounded-md overflow-hidden">
          <div className="self-end flex text-center flex-col gap-y-2 justify-between gap-1 ">
            <h3 className="font-semibold text-xl mt-2 mb-1 text-stone-600">
              Upload CSV
            </h3>
            <div className="flex justify-center my-8">
              <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
                <label
                  for="upload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 fill-white stroke-indigo-500"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600 font-medium">Upload file</span>
                </label>
                <input
                  id="upload"
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <span className="text-gray-500 text-xs">{fileName}</span>
            <LoadingButton
              onClick={handleCsvCreation}
              success={isSuccess}
              isLoading={isLoading}
              successText="Sucessful!"
              className="text-white text-center hover:bg-[#00A0DF] active:[#00A0DF] duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center bg-[#00A0DF] max-w-full mt-5 px-16 py-3 rounded-lg self-start max-md:px-5"
            >
              {isLoading ? "  Uploading..." : "  Upload CSV"}
            </LoadingButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateAndUpdateUserCsv;
