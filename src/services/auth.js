import axios from "axios";
import {
  SIGNUP_API,
  LOGIN_API,
  GET_USER_API,
  GET_ALL_FOLLOWERS_API,
  GET_ALL_FOLLOWING_API,
  UNFOLLOW_USER_API,
  GET_ALL_USER_API,
  FOLLOW_USER_API,
  EDIT_USER_API,
  GET_ALL_OTHERUSER_FOLLOWERS_API,
  GET_ALL_OTHERUSER_FOLLOWING_API,
} from "../urls";
import { toast } from "react-toastify";

const HandleLoginUser = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_API, { email, password });
    return response;
  } catch (error) {
    toast.error(error.response.data.errorMessage);
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
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("vignette__token")
          )}`,
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
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("vignette__token")
          )}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};

const getAllFollowingOtherUserInfo = async (userId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(GET_ALL_OTHERUSER_FOLLOWING_API, {
        id: userId,
      });
      return response;
    } else {
      const response = await axios.post(
        GET_ALL_OTHERUSER_FOLLOWING_API,
        { id: userId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("vignette__token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};

const getAllFollowerOtherUserInfo = async (userId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(GET_ALL_OTHERUSER_FOLLOWERS_API, {
        id: userId,
      });
      return response;
    } else {
      const response = await axios.post(
        GET_ALL_OTHERUSER_FOLLOWERS_API,
        { id: userId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("vignette__token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};

const unfollowUser = async (username) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${UNFOLLOW_USER_API}/${username}`);
      return response;
    } else {
      const response = await axios.get(`${UNFOLLOW_USER_API}/${username}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("vignette__token")
          )}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.ddta.errorMessage);
  }
};

const getAllUser = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(GET_ALL_USER_API);
      return response;
    } else {
      const response = await axios.get(GET_ALL_USER_API, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("vignette__token")
          )}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};

const followUser = async (username) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${FOLLOW_USER_API}/${username}`);
      return response;
    } else {
      const response = await axios.get(`${FOLLOW_USER_API}/${username}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("vignette__token")
          )}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
  }
};

const editUser = async (userInfo) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${EDIT_USER_API}`, {
        item: userInfo,
      });
      return response;
    } else {
      const response = await axios.post(
        `${EDIT_USER_API}`,
        {
          item: userInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("vignette__token")
            )}`,
          },
        }
      );
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
  unfollowUser,
  getAllUser,
  followUser,
  editUser,
  getAllFollowingOtherUserInfo,
  getAllFollowerOtherUserInfo,
};
