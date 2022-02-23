import React, { useEffect } from "react";
import { Sidebar, CreatePost, Post } from "../../index";
import { Navbar } from "../../../../components/index";
import { fetchAllPostAsync } from "../../postSlice";
import { useSelector, useDispatch } from "react-redux";
import { togglePostLoading } from "../../postSlice";
import Loader from "react-loader-spinner";

const Feed = () => {
  const { cursor, hasMore, allPost, isPostLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));

  useEffect(() => {
    dispatch(togglePostLoading("TRUE"));
    dispatch(fetchAllPostAsync({ cursor, hasMore }));
  }, [cursor, hasMore, dispatch]);

  return (
    <div className="bg-codGray h-full w-screen flex items-center">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
      />
      <div className="w-full flex flex-col items-center ml-64 pl-1 pr-2 pb-60">
        <Navbar />
        <CreatePost />
        {isPostLoading ? (
          <div className="mt-10">
            <Loader type="ThreeDots" color="#fff" height={100} width={100} />
          </div>
        ) : (
          allPost &&
          allPost.length > 0 &&
          allPost.map((post) => <Post post={post} key={post._id} />)
        )}
      </div>
    </div>
  );
};

export { Feed };
