import React, { useEffect, useRef, useCallback } from "react";
import { Sidebar, CreatePost, Post } from "../../index";
import { Navbar } from "../../../../components/index";
import { fetchAllPostAsync, togglePostLoading } from "../../postSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { handleLogout } from "../../../auth/authSlice";

const Feed = () => {
  const { cursor, hasMore, allPost, isPostLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isPostLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("here");
          dispatch(fetchAllPostAsync({ cursor, hasMore }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isPostLoading, hasMore, cursor]
  );
  let { currentUser } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));

  // if currentUser returns null, logout
  if (!currentUser) {
    dispatch(handleLogout());
  }

  useEffect(() => {
    dispatch(togglePostLoading("TRUE"));
    dispatch(fetchAllPostAsync({ cursor, hasMore }));
  }, [cursor, hasMore, dispatch]);

  return (
    <div className="bg-codGray min-h-screen w-screen flex items-center">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
      />
      <div className="w-full flex flex-col items-center ml-64 pl-1 pr-2 pb-60">
        <Navbar />
        <CreatePost placeholder={"Describe yourself here..."} />
        {isPostLoading ? (
          <div className="mt-10">
            <Loader type="ThreeDots" color="#fff" height={100} width={100} />
          </div>
        ) : (
          allPost &&
          allPost.length > 0 &&
          allPost.map((post, index) =>
            allPost.length === index + 1 ? (
              <Post ref={lastPostElementRef} post={post} key={post._id} />
            ) : (
              <Post post={post} key={post._id} />
            )
          )
        )}
      </div>
    </div>
  );
};

export { Feed };
