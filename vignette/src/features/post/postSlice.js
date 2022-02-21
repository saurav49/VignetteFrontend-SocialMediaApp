import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPost,
  addCommentToDb,
  addDownvoteCommentDb,
  addUpvoteToCommentDb,
  likePostToDb,
  retweetPostToDb,
  unlikePostToDb,
  removeRetweetPostToDb,
} from "../../services/post";

const initialState = {
  status: "idle",
  allPost: [],
  isPostLoading: false,
  cursor: null,
  hasMore: true,
  isError: false,
  errorMessage: "",
  currentPage: "FEED_SECTION",
};

export const createPostAsync = createAsyncThunk(
  "post/createPostAsync",
  async (postContent) => {
    try {
      const response = await createPost(postContent);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchAllPostAsync = createAsyncThunk(
  "post/fetchAllPostAsync",
  async (fetchData) => {
    if (fetchData.hasMore) {
      try {
        const response = await getAllPost(fetchData.cursor);
        return response.data;
      } catch (error) {
        console.log({ error });
      }
    }
  }
);

export const addCommentAsync = createAsyncThunk(
  "post/addCommentAsync",
  async (commentData) => {
    console.log({ commentData });
    try {
      const response = await addCommentToDb(
        commentData.postContent,
        commentData.id
      );
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const upvoteCommentAsync = createAsyncThunk(
  "post/upvoteCommentAsync",
  async (commentData) => {
    try {
      const response = await addUpvoteToCommentDb(
        commentData.postId,
        commentData.commentId
      );
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const downvoteCommentAsync = createAsyncThunk(
  "post/downvoteCommentAsync",
  async (commentData) => {
    try {
      const response = await addDownvoteCommentDb(
        commentData.postId,
        commentData.commentId
      );
      console.log({ response });
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const likePostAsync = createAsyncThunk(
  "post/likePostAsync",
  async (postData) => {
    try {
      const response = await likePostToDb(postData.postId);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const unlikePostToAsync = createAsyncThunk(
  "post/unlikePostToAsync",
  async (postData) => {
    try {
      const response = await unlikePostToDb(postData.postId);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const removeRetweetPostToAsync = createAsyncThunk(
  "post/removeRetweetPostToAsync",
  async (postData) => {
    try {
      const response = await removeRetweetPostToDb(postData.postId);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const retweetPostAsync = createAsyncThunk(
  "post/retweetPostAsync",
  async (postData) => {
    try {
      const response = await retweetPostToDb(postData.postId);
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    togglePostLoading: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, isPostLoading: true }
        : { ...state, isPostLoading: false };
    },
    updateCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
  },
  extraReducers: {
    [createPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log({ action });
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = [action.payload.newPost, ...state.allPost];
      }
    },
    [createPostAsync.rejected]: (state) => {
      state.status = "error";
    },
    [fetchAllPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.cursor = action.payload.paging.cursor;
        state.hasMore = action.payload.paging.hasMore;
        state.allPost = [
          ...new Set([...state.allPost, ...action.payload.postList]),
        ];
      }
    },
    [fetchAllPostAsync.rejected]: (state) => {
      state.status = "error";
    },
    [addCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload, action.payload.comment);
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, action.payload.comment],
              }
            : { ...post }
        );
      }
    },
    [addCommentAsync.rejected]: (state) => {
      state.status = "error";
    },
    [upvoteCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [upvoteCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload);
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === action.payload.commentId
                    ? {
                        ...comment,
                        upvote: [
                          ...comment.upvote,
                          action.payload.upvoteUserId,
                        ],
                      }
                    : { ...comment }
                ),
              }
            : { ...post }
        );
      }
    },
    [upvoteCommentAsync.rejected]: (state) => {
      state.status = "error";
    },
    [downvoteCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [downvoteCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      console.log(action.payload);
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === action.payload.commentId
                    ? {
                        ...comment,
                        upvote: [
                          ...comment.downvote,
                          action.payload.downvoteUserId,
                        ],
                      }
                    : { ...comment }
                ),
              }
            : { ...post }
        );
      }
    },
    [downvoteCommentAsync.rejected]: (state) => {
      state.status = "error";
    },
    [unlikePostToAsync.pending]: (state) => {
      state.status = "loading";
    },
    [unlikePostToAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                likes: post.likes.filter(
                  (userId) => userId !== action.payload.userId
                ),
              }
            : { ...post }
        );
      }
    },
    [unlikePostToAsync.rejected]: (state) => {
      state.status = "error";
    },
    [likePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [likePostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: [...post.likes, action.payload.userId] }
            : { ...post }
        );
      }
    },
    [likePostAsync.rejected]: (state) => {
      state.status = "error";
    },
    [retweetPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [retweetPostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? { ...post, retweet: [...post.retweet, action.payload.userId] }
            : { ...post }
        );
      }
    },
    [retweetPostAsync.rejected]: (state) => {
      state.status = "error";
    },
    [removeRetweetPostToAsync.pending]: (state) => {
      state.status = "loading";
    },
    [removeRetweetPostToAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.isPostLoading = false;
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                retweet: post.retweet.filter(
                  (userId) => userId !== action.payload.userId
                ),
              }
            : { ...post }
        );
      }
    },
    [removeRetweetPostToAsync.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { togglePostLoading, updateCurrentPage } = postSlice.actions;
export default postSlice.reducer;
