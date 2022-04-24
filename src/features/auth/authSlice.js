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
  editUser,
  getAllFollowingOtherUserInfo,
  getAllFollowerOtherUserInfo,
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

export const editUserAsync = createAsyncThunk(
  "auth/editUserAsync",
  async (userInfo) => {
    try {
      const response = await editUser(userInfo);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getAllFollowingOtherUserInfoAsync = createAsyncThunk(
  "auth/getAllFollowingOtherUserInfoAsync",
  async (userId) => {
    console.log({ userId });
    try {
      const response = await getAllFollowingOtherUserInfo(userId);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getAllFollowerOtherUserInfoAsync = createAsyncThunk(
  "auth/getAllFollowerOtherUserInfoAsync",
  async (userId) => {
    console.log({ userId });
    try {
      const response = await getAllFollowerOtherUserInfo(userId);
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
    authBtnLoader: false,
    token: "",
    userId: "",
    currentUser: {},
    allUsers: [],
    reqdUser: {},
  },

  reducers: {
    handleLogout: (state) => {
      localStorage.removeItem("vignette__token");
      localStorage.removeItem("vignette__currentUser");
      return { ...state, currentUser: {}, token: "", reqdUser: {} };
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
    storeReqdUser: (state, action) => {
      console.log(action.payload);
      localStorage.setItem(
        "vignette__reqdUser",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        reqdUser: action.payload,
      };
    },
    toggleAuthBtnLoader: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, authBtnLoader: true }
        : { ...state, authBtnLoader: false };
    },
  },

  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        localStorage.setItem(
          "vignette__token",
          JSON.stringify(action.payload.token)
        );
        localStorage.setItem(
          "vignette__currentUser",
          JSON.stringify(action.payload.savedUser)
        );
        state.userId = action.payload.savedUser._id;
        state.token = action.payload.token;
        state.currentUser = action.payload.savedUser;
      }
      state.showLoader = false;
      state.authBtnLoader = false;
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      state.authBtnLoader = false;
    },
    [loginUserWithCredentials.pending]: (state) => {
      state.status = "loading";
    },
    [loginUserWithCredentials.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        localStorage.setItem(
          "vignette__token",
          JSON.stringify(action.payload.token)
        );
        localStorage.setItem(
          "vignette__currentUser",
          JSON.stringify(action.payload.savedUser)
        );
        state.userId = action.payload.savedUser._id;
        state.token = action.payload.token;
        state.currentUser = action.payload.savedUser;
      }
      state.showLoader = false;
      state.authBtnLoader = false;
    },
    [loginUserWithCredentials.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      state.authBtnLoader = false;
    },
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        localStorage.setItem(
          "vignette__currentUser",
          JSON.stringify(action.payload.savedUser)
        );
        state.userId = action.payload.savedUser._id;
        state.currentUser = action.payload.savedUser;
      }
      state.showLoader = false;
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
        state.currentUser.following = action.payload.reqdUser;
      }
      state.showLoader = false;
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
        state.currentUser.followers = action.payload.reqdUser;
      }
      state.showLoader = false;
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
        state.currentUser.following = state.currentUser.following.filter(
          (user) => user._id !== action.payload.reqdUser._id
        );
      }
      state.showLoader = false;
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
        state.currentUser.following.push(action.payload.reqdUser);
      }
      state.showLoader = false;
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
        state.allUsers = action.payload.allUsers;
      }
      state.showLoader = false;
    },
    [getAllUserAsync.rejected]: (state) => {
      state.status = "error";
    },
    [editUserAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editUserAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        action.payload.updatedDoc?.name &&
          (state.currentUser.name = action.payload.updatedDoc.name);
        action.payload.updatedDoc?.bio &&
          (state.currentUser.bio = action.payload.updatedDoc.bio);
        action.payload.updatedDoc?.website &&
          (state.currentUser.website = action.payload.updatedDoc.website);
        action.payload.updatedDoc?.photo &&
          (state.currentUser.photo = action.payload.updatedDoc.photo);
        localStorage.setItem(
          "vignette__currentUser",
          JSON.stringify(state.currentUser)
        );
        console.log({ currentUser: state.currentUser });
      }
      state.showLoader = false;
    },
    [editUserAsync.rejected]: (state) => {
      state.status = "error";
    },
    [getAllFollowerOtherUserInfoAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllFollowerOtherUserInfoAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log({ data: action.payload.reqdUser });
      console.log(current(state));
      if (action.payload && action.payload.success) {
        state.reqdUser.followers = action.payload.reqdUser;
      }
      console.log(current(state));
      state.showLoader = false;
    },
    [getAllFollowerOtherUserInfoAsync.rejected]: (state) => {
      state.status = "error";
    },
    [getAllFollowingOtherUserInfoAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllFollowingOtherUserInfoAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(current(state));
      if (action.payload && action.payload.success) {
        state.reqdUser.following = action.payload.reqdUser;
      }
      console.log(current(state));
      state.showLoader = false;
    },
    [getAllFollowingOtherUserInfoAsync.rejected]: (state) => {
      state.status = "error";
    },
  },
});
export const {
  handleLogout,
  toggleShowLoader,
  addUserInfo,
  storeReqdUser,
  toggleAuthBtnLoader,
} = authSlice.actions;

export default authSlice.reducer;
