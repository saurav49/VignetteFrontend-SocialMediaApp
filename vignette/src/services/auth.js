import axios from "axios";
import { SIGNUP_API, LOGIN_API } from "../urls";

const HandleLoginUser = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_API, { email, password });

    console.log({ response });
    return response;
  } catch (error) {
    console.log("handleLoginUser", error);
  }
};

const HandleSignUpUser = async (name, username, email, password) => {
  try {
    const response = await axios.post(SIGNUP_API, {
      name,
      username,
      email,
      password,
    });

    return response;
  } catch (error) {
    console.log("handleSignUpUser", error);
  }
};

export { HandleLoginUser, HandleSignUpUser };
