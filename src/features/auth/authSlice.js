import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  HandleLoginUser,
  HandleSignUpUser,
  fetchUserDetails,
  getAllFollowingUserInfo,
  getAllFollowerUserInfo,
  unfollowUser,
  followUser,
  getAllUser,
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
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const unfollowUserAsync = createAsyncThunk(
  "auth/unfollowUserAsync",
  async (username) => {
    try {
      const response = await unfollowUser(username);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const followUserAsync = createAsyncThunk(
  "auth/followUserAsync",
  async (username) => {
    try {
      const response = await followUser(username);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getAllUserAsync = createAsyncThunk(
  "auth/getAllUserAsync",
  async () => {
    try {
      const response = await getAllUser();
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
    allUsers: [],
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
    addUserInfo: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
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
        state.currentUser.following = action.payload.reqdUser;
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
        state.currentUser.followers = action.payload.reqdUser;
      }
    },
    [getAllFollowerUserInfoAsync.rejected]: (state) => {
      state.status = "error";
    },
    [unfollowUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowUserAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        state.currentUser.following = state.currentUser.following.filter(
          (user) => user._id !== action.payload.reqdUser._id
        );
      }
    },
    [unfollowUserAsync.rejected]: (state) => {
      state.status = "error";
    },
    [followUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [followUserAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        state.currentUser.following.push(action.payload.reqdUser);
      }
    },
    [followUserAsync.rejected]: (state) => {
      state.status = "error";
    },
    [getAllUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllUserAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.showLoader = false;
        state.allUsers = action.payload.allUsers;
      }
    },
    [getAllUserAsync.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { handleLogout, toggleShowLoader, addUserInfo } =
  authSlice.actions;

export default authSlice.reducer;
