import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  HandleLoginUser,
  HandleSignUpUser,
  fetchUserDetails,
  getAllFollowingUserInfo,
  getAllFollowerUserInfo,
} from "../../services/auth";

export const getUser = createAsyncThunk("auth/getUser", async (token) => {
  try {
    const response = await fetchUserDetails(token);
    return response.data;
  } catch (error) {
    console.log({ error });
  }
});

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ name, username, email, password, previewImage }) => {
    try {
      const response = await HandleSignUpUser(
        name,
        username,
        email,
        password,
        previewImage
      );
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const loginUserWithCredentials = createAsyncThunk(
  "auth/loginUserWithCredentials",
  async ({ email, password }) => {
    try {
      const response = await HandleLoginUser(email, password);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getAllFollowingUserInfoAsync = createAsyncThunk(
  "auth/getAllFollowingUserInfoAsync",
  async () => {
    try {
      const response = await getAllFollowingUserInfo();
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getAllFollowerUserInfoAsync = createAsyncThunk(
  "auth/getAllFollowerUserInfoAsync",
  async () => {
    try {
      const response = await getAllFollowerUserInfo();
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: "",
    showLoader: false,
    token: "",
    userId: "",
    currentUser: {},
    currentUserFollowingList: [],
    currentUserFollowerList: [],
  },

  reducers: {
    handleLogout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return { ...state, currentUser: {}, token: "" };
    },
    toggleShowLoader: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, showLoader: true }
        : { ...state, showLoader: false };
    },
  },

  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.savedUser)
        );
        state.userId = action.payload.savedUser._id;
        state.token = action.payload.token;
        state.currentUser = action.payload.savedUser;
      }
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [loginUserWithCredentials.pending]: (state) => {
      state.status = "loading";
    },
    [loginUserWithCredentials.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.savedUser)
        );
        state.userId = action.payload.savedUser._id;
        state.token = action.payload.token;
        state.currentUser = action.payload.savedUser;
      }
    },
    [loginUserWithCredentials.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      console.log({ action });
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(action.payload.savedUser)
        );
        state.userId = action.payload.savedUser._id;
        state.currentUser = action.payload.savedUser;
      }
    },
    [getUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [getAllFollowingUserInfoAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllFollowingUserInfoAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        state.currentUserFollowingList = action.payload.reqdUser;
      }
    },
    [getAllFollowingUserInfoAsync.rejected]: (state) => {
      state.status = "error";
    },
    [getAllFollowerUserInfoAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllFollowerUserInfoAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        state.currentUserFollowerList = action.payload.reqdUser;
      }
    },
    [getAllFollowerUserInfoAsync.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { handleLogout, toggleShowLoader } = authSlice.actions;

export default authSlice.reducer;
