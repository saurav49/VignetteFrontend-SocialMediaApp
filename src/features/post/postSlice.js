import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPost,
  addCommentToDb,
  removeCommentDb,
  addDownvoteCommentDb,
  addUpvoteToCommentDb,
  likePostToDb,
  retweetPostToDb,
  unlikePostToDb,
  removeRetweetPostToDb,
  deletePost,
} from "../../services/post";

const initialState = {
  status: "idle",
  allPost: [],
  postIdToBeDeleted: "",
  commentDeleteData: { postId: "", commentId: "" },
  isPostLoading: false,
  createPostBtnLoading: false,
  showDeleteModal: false,
  cursor: null,
  hasMore: true,
  isError: false,
  errorMessage: "",
  currentPage: "FEED_SECTION",
};

export const createPostAsync = createAsyncThunk(
  "post/createPostAsync",
  async (postData) => {
    try {
      const response = await createPost(
        postData.postContent,
        postData?.previewPostImage
      );
      return response.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  "post/deletePostAsync",
  async (postId) => {
    try {
      const response = await deletePost(postId);
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

export const removeCommentAsync = createAsyncThunk(
  "post/removeCommentAsync",
  async (data) => {
    try {
      const response = await removeCommentDb(data.commentId, data.postId);
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
    toggleBtnLoading: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, createPostBtnLoading: true }
        : { ...state, createPostBtnLoading: false };
    },
    togglePostLoading: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, isPostLoading: true }
        : { ...state, isPostLoading: false };
    },
    updateCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
    toggleDeleteModal: (state, action) => {
      return action.payload === "TRUE"
        ? { ...state, showDeleteModal: true }
        : { ...state, showDeleteModal: false };
    },
    updatePostId: (state, action) => {
      return {
        ...state,
        postIdToBeDeleted: action.payload,
      };
    },
    updatecommentId: (state, action) => {
      return {
        ...state,
        commentDeleteData: action.payload,
      };
    },
  },
  extraReducers: {
    [createPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allPost = [action.payload.newPost, ...state.allPost];
      }
      state.createPostBtnLoading = false;
    },
    [createPostAsync.rejected]: (state) => {
      state.status = "error";
    },
    [fetchAllPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllPostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const getUniqueArray = (posts) => {
        const flag = {};
        const unique = [];
        posts.forEach((post) => {
          if (!flag[post._id]) {
            flag[post._id] = true;
            unique.push(post);
          }
        });
        return unique;
      };
      if (action.payload && action.payload.success) {
        state.cursor = action.payload.paging.nextCursor;
        state.hasMore = action.payload.paging.hasMore;
        state.allPost = getUniqueArray([
          ...state.allPost,
          ...action.payload.postList,
        ]);
      }
      state.isPostLoading = false;
    },
    [fetchAllPostAsync.rejected]: (state) => {
      state.status = "error";
    },
    [addCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, action.payload.comment],
              }
            : { ...post }
        );
      }
      state.isPostLoading = false;
    },
    [addCommentAsync.rejected]: (state) => {
      state.status = "error";
    },
    [upvoteCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [upvoteCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        action.payload.type === "UPVOTE_ADDED"
          ? (state.allPost = state.allPost.map((post) =>
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
                            downvote: comment.downvote.filter(
                              (userId) => userId !== action.payload.upvoteUserId
                            ),
                          }
                        : { ...comment }
                    ),
                  }
                : { ...post }
            ))
          : (state.allPost = state.allPost.map((post) =>
              post._id === action.payload.postId
                ? {
                    ...post,
                    comments: post.comments.map((comment) =>
                      comment._id === action.payload.commentId
                        ? {
                            ...comment,
                            upvote: comment.upvote.filter(
                              (userId) => userId !== action.payload.upvoteUserId
                            ),
                          }
                        : { ...comment }
                    ),
                  }
                : { ...post }
            ));
      }
      state.isPostLoading = false;
    },
    [upvoteCommentAsync.rejected]: (state) => {
      state.status = "error";
    },
    [downvoteCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [downvoteCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        action.payload.type === "DOWNVOTE_ADDED"
          ? (state.allPost = state.allPost.map((post) =>
              post._id === action.payload.postId
                ? {
                    ...post,
                    comments: post.comments.map((comment) =>
                      comment._id === action.payload.commentId
                        ? {
                            ...comment,
                            downvote: [
                              ...comment.downvote,
                              action.payload.downvoteUserId,
                            ],
                            upvote: comment.upvote.filter(
                              (userId) =>
                                userId !== action.payload.downvoteUserId
                            ),
                          }
                        : { ...comment }
                    ),
                  }
                : { ...post }
            ))
          : (state.allPost = state.allPost.map((post) =>
              post._id === action.payload.postId
                ? {
                    ...post,
                    comments: post.comments.map((comment) =>
                      comment._id === action.payload.commentId
                        ? {
                            ...comment,
                            downvote: comment.downvote.filter(
                              (userId) =>
                                userId !== action.payload.downvoteUserId
                            ),
                          }
                        : { ...comment }
                    ),
                  }
                : { ...post }
            ));
      }
      state.isPostLoading = false;
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
      state.isPostLoading = false;
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
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: [...post.likes, action.payload.userId] }
            : { ...post }
        );
      }
      state.isPostLoading = false;
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
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? { ...post, retweet: [...post.retweet, action.payload.retweet] }
            : { ...post }
        );
      }
      state.isPostLoading = false;
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
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                retweet: post.retweet.filter(
                  (user) => user._id !== action.payload.userId
                ),
              }
            : { ...post }
        );
      }
      state.isPostLoading = false;
    },
    [removeRetweetPostToAsync.rejected]: (state) => {
      state.status = "error";
    },
    [removeCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [removeCommentAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allPost = state.allPost.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== action.payload.commentId
                ),
              }
            : { ...post }
        );
      }
      state.isPostLoading = false;
    },
    [removeCommentAsync.rejected]: (state) => {
      state.status = "error";
    },
    [deletePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePostAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.allPost = state.allPost.filter(
          (post) => post._id !== action.payload.postId
        );
      }
      state.isPostLoading = false;
    },
    [deletePostAsync.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const {
  togglePostLoading,
  updateCurrentPage,
  toggleDeleteModal,
  updatePostId,
  updatecommentId,
  toggleBtnLoading,
} = postSlice.actions;
export default postSlice.reducer;
