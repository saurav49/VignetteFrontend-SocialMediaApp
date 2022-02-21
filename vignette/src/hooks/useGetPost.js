import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_POST } from "../urls";
import {
  togglePostLoading,
  updateCursor,
  updateHasMore,
} from "../features/post/postSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useGetPost = (cursor, hasMore) => {
  const [postList, setPostList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(togglePostLoading("TRUE"));
    (async function () {
      if (hasMore) {
        try {
          if (cursor) {
            const response = await axios.get(
              `${GET_ALL_POST}/?cursor=${cursor}`
            );
            setPostList((prevPosts) => [
              ...prevPosts,
              ...response.data.postList,
            ]);
            dispatch(updateCursor(response.data.paging.nextCursor));
            dispatch(updateHasMore(response.data.paging.hasMore));
            dispatch(togglePostLoading("FALSE"));
          } else {
            const response = await axios.get(GET_ALL_POST);
            setPostList((prevPosts) => [
              ...prevPosts,
              ...response.data.postList,
            ]);
            dispatch(updateCursor(response.data.paging.nextCursor));
            dispatch(updateHasMore(response.data.paging.hasMore));
            dispatch(togglePostLoading("FALSE"));
          }
        } catch (error) {
          toast.error(error.response.data.errorMessage);
        }
      }
    })();
  }, [cursor]);
  return { postList };
};

export { useGetPost };
