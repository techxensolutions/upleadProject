"use client";
import React, { useEffect, useState } from "react";
import api from "@/redux/api";
import { saveAs } from 'file-saver';
import DashboardPage from "../index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePagination from "@mui/material/usePagination";
import TableLoader from "@/SharedComponents/TableLoader";
import ErrorBlock from "@/SharedComponents/ErrorBlock";
import DeleteModal from "@/SharedComponents/DeleteModal";
import { Button, List } from "@mui/material";

export default function DashboardSubscription() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const loggedInUser =
    typeof window != "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));

  const { isFetching, data, isLoading, error } =
    api.adminApis.useGetAllFilesQuery("");

  useEffect(() => {
    if (!isFetching && !isLoading) {
      const subscriptionData = data?.filter((item) => {
        return item?.plans.includes(loggedInUser.subscription.toLowerCase());
      });
      setFilteredData(subscriptionData);
    }
  }, [data, isFetching, isLoading, searchQuery]);
  const [
    saveSearchQuery,
    { isSearchFetching, data: searchData, isSearchLoading, isSearcherror },
  ] = api.adminApis.useSaveSearchQueryMutation("");

  const handleSearchButtonClick = async () => {
    if (searchQuery) {
      try {
        await saveSearchQuery({
          userId: loggedInUser?._id,
          query: searchQuery,
        }).unwrap();

        const filteredResult = filterData(filteredData, searchQuery);
        setFilteredData(filteredResult);
      } catch (error) {
        console.error("Error saving search query:", error);
      }
    }
  };
  const filterData = (filteredData, searchQuery) => {
    if (!searchQuery) return filteredData;
    return filteredData.filter((user) => {
      const searchString = `${user.filename} ${user.plans} `.toLowerCase();
      return searchString.includes(searchQuery.toLowerCase());
    });
  };

  const [page, setPage] = useState(1);

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
      .then((response) => response.text())
      .then((text) => {
        const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, fileName);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };

  const rowsPerPage = 6;
  const { items } = usePagination({
    count: Math.ceil(filteredData?.length / rowsPerPage),
    onChange: (event, page) => handleChange(event, page),
    page: page,
  });
  return (
    <DashboardPage className="flex justify-center items-center">
      <main className="p-3 md:p-3 lg:p-4 xl:p-6">
        <section className="flex flex-row gap-3 max-md:flex-wrap">
          <div className="flex w-full flex-col lg:flex-row gap-x-4 md:gap-3 lg:gap-4 h-max lg:items-center justify-between">
            <label htmlFor="search" className="lg:w-[80%] relative max-h-max">
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgba(129, 129, 129, 1)"
                  className={
                    searchQuery === ""
                      ? "w-6 h-6 absolute left-3 my-auto top-0 bottom-0"
                      : "hidden"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  id="search"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-sm placeholder:!px-6 placeholder:text-neutral-400 whitespace-nowrap border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center  px-3 py-3 rounded-md items-start"
                />
              </span>
            </label>
            <div className="">
              <button
                onClick={handleSearchButtonClick}
                className="bg-[#00A0DF] max-w-max  flex flex-row font-medium items-center gap-1.5 rounded-lg px-6 py-3 shadow-md text-white"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                >
                  <path d="M13.818 16.646c-1.273.797-2.726 1.256-4.202 1.354l-.537-1.983c2.083-.019 4.132-.951 5.49-2.724 2.135-2.79 1.824-6.69-.575-9.138l-1.772 2.314-1.77-6.469h6.645l-1.877 2.553c3.075 2.941 3.681 7.659 1.423 11.262l7.357 7.357-2.828 2.828-7.354-7.354zm-11.024-1.124c-1.831-1.745-2.788-4.126-2.794-6.522-.005-1.908.592-3.822 1.84-5.452 1.637-2.138 4.051-3.366 6.549-3.529l.544 1.981c-2.087.015-4.142.989-5.502 2.766-2.139 2.795-1.822 6.705.589 9.154l1.774-2.317 1.778 6.397h-6.639l1.861-2.478z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="table_container max-w-[1030px] relative max-h-[calc(100vh-210px)]">
            <TableContainer component={Paper}>
              <Table className="w-full" cellPadding={14}>
                <TableHead className="w-full sticky top-0 border-b bg-white border-y-zinc-200">
                  <TableRow className="grid grid-cols-3 w-full md:table-row text-stone-600 font-[700]">
                    <TableCell className="text-stone-600 font-semibold">
                      S/N
                    </TableCell>
                    <TableCell className="text-stone-600 font-semibold">
                      File Name
                    </TableCell>
                    <TableCell className="text-stone-600 font-semibold">
                      Url
                    </TableCell>
                    <TableCell className="text-stone-600 font-semibold">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                {isFetching ? (
                  <TableLoader cols={5} />
                ) : (
                  <TableBody>
                    {filteredData
                      ?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((each, index) => (
                        <TableRow
                          key={index}
                          className="text-slate-500  font-semi-bold"
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="text-zinc-600 tracking-wide font-medium">
                            {each.filename}
                          </TableCell>
                          <TableCell className="text-zinc-600 tracking-wide font-medium">
                            {each.url}
                          </TableCell>
                          <TableCell className="text-zinc-600 tracking-wide font-medium">
                            <button
                              type="button"
                              onClick={() =>
                                handleDownload(each.url, `${each.filename}.csv`)
                              }
                              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Download
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <div className=" !w-full">
              <List className="!flex-1 first-letter:flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4 bg-white mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
                {items.map(({ page, type, selected, ...item }, index) => {
                  let children = null;

                  if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children = "…";
                  } else if (type === "page") {
                    children = (
                      <button
                        type="button"
                        style={{
                          fontWeight: selected ? "bold" : undefined,
                          padding: "0.5rem 1rem",
                          width: "100%",
                        }}
                        {...item}
                      >
                        {page}
                      </button>
                    );
                  } else {
                    children =
                      type === "previous" ? (
                        <button
                          {...item}
                          disabled={item.disabled}
                          className={`${selected ? "font-bold" : undefined} ${
                            item.disabled === false
                              ? "text-stone-700"
                              : "text-stone-300"
                          } border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                          </svg>
                          {type}
                        </button>
                      ) : (
                        <button
                          {...item}
                          disabled={item.disabled}
                          className={`${selected ? "font-bold" : undefined} ${
                            item.disabled === false
                              ? "text-stone-700"
                              : "text-stone-300"
                          }  border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}
                        >
                          {type}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      );
                  }

                  return <div key={index}>{children}</div>;
                })}
              </List>
            </div>

            {!(isLoading || isFetching) && filteredData?.length === 0 && (
              <div className="px-2 py-4 text-center">
                <h2 className="text-xl font-semibold">No result found</h2>
              </div>
            )}
            <ErrorBlock error={error} />
          </div>
        </section>
      </main>
    </DashboardPage>
  );
}
