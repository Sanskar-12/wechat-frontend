import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}`,
  }),
  tagTypes: ["Chats", "Users", "Messages"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/my/chat",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getAllNotifications: builder.query({
      query: () => ({
        url: `/user/all/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/accept/request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),

    getChatDetails: builder.query({
      query: ({ chatId: id, populate = false }) => {
        let url = `/chat/${id}`;
        if (populate) {
          url = url + `?populate=true`;
        }

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chats"],
    }),

    getMessages: builder.query({
      query: ({ chatId: id, page }) => ({
        url: `/chat/messages/${id}?page=${page}`,
        credentials: "include",
      }),
      providesTags: ["Messages"],
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetAllNotificationsQuery,
  useAcceptFriendRequestMutation,
  useGetChatDetailsQuery,
  useGetMessagesQuery,
} = api;
