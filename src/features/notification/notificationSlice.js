import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllNotificationOfCurrentUser,
  deleteNotification,
} from "../../services/notification";

export const getAllNotificationAsync = createAsyncThunk(
  "notification/getAllNotificationAsync",
  async () => {
    try {
      const response = await getAllNotificationOfCurrentUser();
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
export const deleteNotificationAsync = createAsyncThunk(
  "notification/deleteNotificationAsync",
  async (notificationId) => {
    try {
      const response = await deleteNotification(notificationId);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

const initialState = {
  status: "idle",
  allNotifications: [],
  isNotificationLoading: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    toggleNotificationLoader: (state, action) => {
      action.payload === "TRUE"
        ? (state.isNotificationLoading = true)
        : (state.isNotificationLoading = false);
    },
  },
  extraReducers: {
    [getAllNotificationAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllNotificationAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isNotificationLoading = false;
        state.allNotifications = action.payload.allNotification;
      }
    },
    [getAllNotificationAsync.rejected]: (state) => {
      state.status = "error";
    },
    [deleteNotificationAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteNotificationAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isNotificationLoading = false;
        state.allNotifications = state.allNotifications.filter(
          (notification) => notification._id !== action.payload.id
        );
      }
    },
    [deleteNotificationAsync.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { toggleNotificationLoader } = notificationSlice.actions;
export default notificationSlice.reducer;
