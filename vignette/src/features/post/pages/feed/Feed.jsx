import React, { useEffect } from "react";
import { Sidebar, CreatePost, Post } from "../../index";
import { Navbar } from "../../../../components/index";
import { fetchAllPostAsync } from "../../postSlice";
import { useSelector, useDispatch } from "react-redux";
const Feed = () => {
  const { cursor, hasMore, allPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));

  useEffect(() => {
    dispatch(fetchAllPostAsync({ cursor, hasMore }));
  }, [cursor, hasMore, dispatch]);

  return (
    <div className="bg-codGray h-full w-screen flex items-center">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
      />
      <div className="w-full flex flex-col items-center ml-64 pl-1 pr-2">
        <Navbar />
        <CreatePost />
        {allPost &&
          allPost.length > 0 &&
          allPost.map((post) => <Post post={post} key={post._id} />)}
      </div>
    </div>
  );
};

export { Feed };
