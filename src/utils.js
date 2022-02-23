import { Cloudinary } from "@cloudinary/url-gen";

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

export {
  validateEmail,
  validatePassword,
  isMatch,
  checkInputField,
  CLOUD_NAME,
  cld,
};
