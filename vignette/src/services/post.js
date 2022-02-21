import axios from "axios";
import { toast } from "react-toastify";
import {
  POST_API,
  GET_ALL_POST,
  ADD_COMMENT_API,
  UPVOTE_COMMENT_API,
  DOWNVOTE_COMMENT_API,
  LIKE_POST_API,
  UNLIKE_POST_API,
  RETWEET_POST_API,
  REMOVE_RETWEET_POST_API,
} from "../urls";

const createPost = async (postContent) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(POST_API, { text: postContent });
      return response;
    } else {
      const response = await axios.post(
        POST_API,
        { text: postContent },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const getAllPost = async (cursor) => {
  try {
    if (cursor) {
      if (axios.defaults.headers.common["Authorization"]) {
        const response = await axios.get(`${GET_ALL_POST}/?cursor=${cursor}`);
        return response;
      } else {
        const response = await axios.get(`${GET_ALL_POST}/?cursor=${cursor}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        return response;
      }
    } else {
      if (axios.defaults.headers.common["Authorization"]) {
        const response = await axios.get(GET_ALL_POST);
        return response;
      } else {
        const response = await axios.get(GET_ALL_POST, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        return response;
      }
    }
  } catch (error) {
    toast.error(error.response.data.errorMessage);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  }
};

const addCommentToDb = async (commentContent, postId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${ADD_COMMENT_API}/${postId}`, {
        comment: commentContent,
      });
      return response;
    } else {
      const response = await axios.post(
        `${ADD_COMMENT_API}/:${postId}`,
        {
          comment: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const addDownvoteCommentDb = async (postId, commentId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${DOWNVOTE_COMMENT_API}/${postId}`, {
        commentId: commentId,
      });
      return response;
    } else {
      const response = await axios.post(
        `${DOWNVOTE_COMMENT_API}/${postId}`,
        {
          commentId: commentId,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const addUpvoteToCommentDb = async (postId, commentId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${UPVOTE_COMMENT_API}/${postId}`, {
        commentId: commentId,
      });
      return response;
    } else {
      const response = await axios.post(
        `${UPVOTE_COMMENT_API}/${postId}`,
        {
          commentId: commentId,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const likePostToDb = async (postId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${LIKE_POST_API}/${postId}`);
      return response;
    } else {
      const response = await axios.post(`${LIKE_POST_API}/${postId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const retweetPostToDb = async (postId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${RETWEET_POST_API}/${postId}`);
      return response;
    } else {
      const response = await axios.post(`${RETWEET_POST_API}/${postId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const unlikePostToDb = async (postId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${UNLIKE_POST_API}/${postId}`);
      return response;
    } else {
      const response = await axios.post(`${UNLIKE_POST_API}/${postId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const removeRetweetPostToDb = async (postId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.post(`${REMOVE_RETWEET_POST_API}/${postId}`);
      return response;
    } else {
      const response = await axios.post(
        `${REMOVE_RETWEET_POST_API}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

export {
  createPost,
  getAllPost,
  addCommentToDb,
  addDownvoteCommentDb,
  addUpvoteToCommentDb,
  likePostToDb,
  retweetPostToDb,
  unlikePostToDb,
  removeRetweetPostToDb,
};
