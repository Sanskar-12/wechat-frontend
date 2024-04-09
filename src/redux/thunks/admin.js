import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const adminLogin = createAsyncThunk("/admin/login", async (secretKey) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/admin/verify`,
      { secretKey },
      config
    );

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

const getAdmin = createAsyncThunk("/admin/getAdmin", async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${server}/admin/`, config);

    return data.admin;
  } catch (error) {
    throw error.response.data.message;
  }
});

const adminLogout = createAsyncThunk("/admin/logout", async () => {
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${server}/admin/logout`, config);

    return data.message;
  } catch (error) {
    throw error.response.data.message;
  }
});

export { adminLogin, getAdmin, adminLogout };
