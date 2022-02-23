import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
import { CLOUD_NAME } from "../../../../utils";
import { createPostAsync, addCommentAsync } from "../../postSlice";

const CreatePost = ({ type, id }) => {
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));

  const handlePostContent = (e) => {
    setPostContent(e.target.value);
  };
  const handleCreateNewPost = () => {
    if (type === "COMMENT") {
      postContent.length > 0 && dispatch(addCommentAsync({ postContent, id }));
      setPostContent("");
      return;
    }
    postContent.length > 0 && dispatch(createPostAsync(postContent));
    setPostContent("");
  };
  return (
    <div className="border-2 border-darkCharcoal rounded-lg w-[95%] p-3 bg-darkGrey mb-3 mt-2">
      <div className="w-full flex items-center">
        <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
          {currentUser.photo && currentUser.photo.id ? (
            <Image
              cloudName={`${CLOUD_NAME}`}
              publicId={currentUser.photo.id}
              width="300"
              crop="scale"
              className="align-middle w-full h-full rounded-2xl"
            />
          ) : (
            <span className="font-bold text-2xl text-white uppercase">
              {currentUser.name[0]}
            </span>
          )}
        </div>
        <div className="flex items-center flex-col ml-3">
          <p className="text-white text-opacity-90 text-xl font-bold mb-1">
            {currentUser.name}
          </p>
          <p className="text-white text-opacity-90 font-medium text-sm">
            @{currentUser.username}
          </p>
        </div>
      </div>
      <div className="w-ful">
        <textarea
          className="mt-4 w-full py-4 px-1 bg-darkGrey text-white rounded-xl"
          placeholder="Describe yourself here..."
          value={postContent}
          onChange={handlePostContent}
        ></textarea>
      </div>
      <div className="w-full flex justify-end items-center">
        <button
          className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-6 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-2 rounded"
          disabled={!postContent}
          onClick={handleCreateNewPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export { CreatePost };
