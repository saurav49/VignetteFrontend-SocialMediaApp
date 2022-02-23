const BASE_PATH = `https://vignetteBackend.saurav49.repl.co`;
const SIGNUP_API = `${BASE_PATH}/user/signup`;
const LOGIN_API = `${BASE_PATH}/user/login`;
const GET_USER_API = `${BASE_PATH}/user/getuser`;
const POST_API = `${BASE_PATH}/post`;
const GET_ALL_POST = `${POST_API}/feed`;
const ADD_COMMENT_API = `${POST_API}/addcomment`;
const UPVOTE_COMMENT_API = `${POST_API}/comment/upvote`;
const DOWNVOTE_COMMENT_API = `${POST_API}/comment/downvote`;
const LIKE_POST_API = `${POST_API}/like`;
const UNLIKE_POST_API = `${POST_API}/unlike`;
const RETWEET_POST_API = `${POST_API}/retweet`;
const REMOVE_RETWEET_POST_API = `${POST_API}/removeretweet`;
const NOTIFICATION_API = `${BASE_PATH}/notification`;
const REMOVE_NOTIFICATION_API = `${NOTIFICATION_API}/remove-notification`;
const GET_ALL_FOLLOWERS_API = `${BASE_PATH}/user/getuser/followers`;
const GET_ALL_FOLLOWING_API = `${BASE_PATH}/user/getuser/following`;
const UNFOLLOW_USER_API = `${BASE_PATH}/user/unfollowuser`;
const GET_ALL_USER_API = `${BASE_PATH}/user/getalluser`;
const FOLLOW_USER_API = `${BASE_PATH}/user/followuser`;

export {
  BASE_PATH,
  SIGNUP_API,
  LOGIN_API,
  POST_API,
  GET_ALL_POST,
  GET_USER_API,
  ADD_COMMENT_API,
  UPVOTE_COMMENT_API,
  DOWNVOTE_COMMENT_API,
  LIKE_POST_API,
  UNLIKE_POST_API,
  RETWEET_POST_API,
  REMOVE_RETWEET_POST_API,
  NOTIFICATION_API,
  REMOVE_NOTIFICATION_API,
  GET_ALL_FOLLOWERS_API,
  GET_ALL_FOLLOWING_API,
  UNFOLLOW_USER_API,
  FOLLOW_USER_API,
  GET_ALL_USER_API,
};
