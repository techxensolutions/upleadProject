import { configureStore } from "@reduxjs/toolkit";
import api from "../api";

const store = configureStore({
  reducer: {
    [api.adminApis.reducerPath]: api.adminApis.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.adminApis.middleware),
});

export default store;
