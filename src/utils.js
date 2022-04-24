import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import {
  GET_ALL_OTHERUSER_FOLLOWERS_API,
  GET_ALL_OTHERUSER_FOLLOWING_API,
} from "./urls";

const CLOUD_NAME = "cloudmedia49";
const cld = new Cloudinary({
  cloud: {
    cloudName: `${CLOUD_NAME}`,
  },
});

const checkInputField = (inputValue) => {
  return inputValue === "" ? "EMPTY" : "NOT_EMPTY";
};

const validateEmail = (email) => {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return validEmailRegex.test(email);
};

const validatePassword = (password) => {
  const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  return validPasswordRegex.test(password);
};

const isMatch = (password, confirmPassword) => {
  return password === confirmPassword ? true : false;
};

const getOtherUserFollowingInfo = async (userId) => {
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
    console.log({ error });
  }
};

const getOtherUserFollowerInfo = async (userId) => {
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
    console.log({ error });
  }
};

export {
  validateEmail,
  validatePassword,
  isMatch,
  checkInputField,
  CLOUD_NAME,
  cld,
  getOtherUserFollowingInfo,
  getOtherUserFollowerInfo,
};
