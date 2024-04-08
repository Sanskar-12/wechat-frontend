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
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "/chat/send/attachments",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    myGroups: builder.query({
      query: () => ({
        url: "/chat/my/group",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),

    getAvailableFriends: builder.query({
      query: ({ chatId }) => {
        let url = `/user/my/friends`;
        if (chatId) {
          url = url + `?chatId=${chatId}`;
        }

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chats"],
    }),

    newGroupChat: builder.mutation({
      query: ({ name, members }) => ({
        url: "/chat/new/group",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chats"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId: id, name }) => ({
        url: `/chat/${id}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chats"],
    }),

    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `/chat/remove/member`,
        method: "PUT",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chats"],
    }),

    addGroupMember: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `/chat/add/members`,
        method: "PUT",
        credentials: "include",
        body: { chatId, members },
      }),
      invalidatesTags: ["Chats"],
    }),

    deleteGroup: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
        body: chatId,
      }),
      invalidatesTags: ["Chats"],
    }),

    leaveGroup: builder.mutation({
      query: ({ chatId: id }) => ({
        url: `/chat/leave/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chats"],
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
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useGetAvailableFriendsQuery,
  useNewGroupChatMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} = api;
