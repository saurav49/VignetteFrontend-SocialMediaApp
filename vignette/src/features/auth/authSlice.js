import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HandleLoginUser, HandleSignUpUser } from "../../services/auth";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ name, username, email, password }) => {
    const response = await HandleSignUpUser(name, username, email, password);

    return response.data;
  }
);

export const loginUserWithCredentials = createAsyncThunk(
  "auth/loginUserWithCredentials",
  async ({ email, password }) => {
    console.log({ email }, { password });

    const response = await HandleLoginUser(email, password);

    return response.data;
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
  },

  reducers: {
    handleLogout: (state) => {},
    toggleShowLoader: (state, action) => {
      console.log(action.payload);
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

      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.userId = action.payload.savedUser._id;
      state.token = action.payload.token;
      state.currentUser = action.payload.savedUser;
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
      console.log(action.payload);
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.userId = action.payload.savedUser._id;
      state.token = action.payload.token;
      state.currentUser = action.payload.savedUser;
    },

    [loginUserWithCredentials.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { handleLogout, toggleShowLoader } = authSlice.actions;

export default authSlice.reducer;
