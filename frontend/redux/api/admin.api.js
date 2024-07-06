"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getUserToken = () => {
  const userToken = localStorage.getItem("userToken");
  return userToken ? JSON.parse(userToken).token : "";
};
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  headers: {
    Authorization:
      typeof window !== "undefined" ? `Bearer ${getUserToken()}` : "",
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.error("Token expired or invalid");
  }

  return result;
};

const api = createApi({
  reducerPath: "userApi",
  tagTypes: [],

  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signUp: builder.mutation({
      query: (credentials) => ({
        url: "user/register",
        method: "POST",
        body: credentials,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `user/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),

    saveSearchQuery: builder.mutation({
      query: ({ userId, query }) => ({
        url: `user/${userId}/saveSearchQuery`,
        method: "POST",
        body: { query },
      }),
    }),

    updateSubscription: builder.mutation({
      query: ({ userId, newPlan, amount }) => ({
        url: "create-payment-intent-and-update-subscription",
        method: "POST",
        body: { userId, newPlan, amount },
      }),
    }),

    cancelSubscription: builder.mutation({
      query: (userId) => ({
        url: `user/cancel-subscription/${userId}`,
        method: "PUT",
      }),
    }),

    getUserSearchQueries: builder.query({
      query: (userId) => `user/user-search-queries/${userId}`,
      transformResponse: (response) => response?.searchQueries,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
    }),
    getAllUsers: builder.query({
      query: () => "user/getAllUsers",
    }),

    //csv
    createUserCsvFile: builder.mutation({
      query: (credentials) => ({
        url: "csvFile/createUserCsv",
        method: "POST",
        body: credentials,
      }),
    }),
    getFilesByPlan: builder.mutation({
      query: (credentials) => ({
        url: "csvFile/by-plan",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllFiles: builder.query({
      query: () => "csvFile/getAllFiles",
      transformResponse: (response) => response?.data,
    }),
    createCsvFile: builder.mutation({
      query: (credentials) => ({
        url: "csvFile/create",
        method: "POST",
        body: credentials,
      }),
    }),

    //FormSubmission
    createFormSubmission: builder.mutation({
      query: (formData) => ({
        url: "form/submit-form",
        method: "POST",
        body: formData,
      }),
    }),
    getAllFormSubmissions: builder.query({
      query: () => "form/form-submissions",
      transformResponse: (response) => response?.data,
    }),
    deleteFormSubmission: builder.mutation({
      query: (formId) => ({
        url: `form/${formId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default api;
