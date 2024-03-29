import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
  }),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/my/chat",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
  }),
});

export default api;
export const { useMyChatsQuery } = api;
