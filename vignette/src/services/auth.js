import axios from "axios";
import {
  SIGNUP_API,
  LOGIN_API,
  GET_USER_API,
  GET_ALL_FOLLOWERS_API,
  GET_ALL_FOLLOWING_API,
} from "../urls";
import { toast } from "react-toastify";

const HandleLoginUser = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_API, { email, password });
    return response;
  } catch (error) {
    toast.error(error.response.data.errorMessage);
    console.log("handleLoginUser", error.response.data.errorMessage);
  }
};

const HandleSignUpUser = async (
  name,
  username,
  email,
  password,
  previewImage
) => {
  try {
    const response = await axios.post(
      SIGNUP_API,
      {
        name,
        username,
        email,
        password,
        previewImage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    toast.error(error.response.data.errorMessage);
    console.log("handleSignUpUser", error.response.data.errorMessage);
  }
};

const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get(GET_USER_API, {
      headers: {
        authorization: token,
      },
    });
    return response;
  } catch (error) {
    toast.error(error.response.data.errorMessage);
    console.log("fetchUserDetails", error.response.data.errorMessage);
  }
};

const getAllFollowingUserInfo = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(GET_ALL_FOLLOWING_API);
      return response;
    } else {
      const response = await axios.get(GET_ALL_FOLLOWING_API, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};

const getAllFollowerUserInfo = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(GET_ALL_FOLLOWERS_API);
      return response;
    } else {
      const response = await axios.get(GET_ALL_FOLLOWERS_API, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};
export {
  HandleLoginUser,
  HandleSignUpUser,
  fetchUserDetails,
  getAllFollowingUserInfo,
  getAllFollowerUserInfo,
};
