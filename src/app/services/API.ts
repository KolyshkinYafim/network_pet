import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/constants";
import type { RootState } from "../store/store";
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).userSlice.token ||
      localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const BaseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const API = createApi({
  reducerPath: "splitApi",
  baseQuery: BaseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
