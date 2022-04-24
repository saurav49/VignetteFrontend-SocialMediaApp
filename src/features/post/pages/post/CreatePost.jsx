import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../../../utils";
import {
  createPostAsync,
  addCommentAsync,
  toggleBtnLoading,
} from "../../postSlice";
import Loader from "react-loader-spinner";
import { ImageModal } from "../../../../components/index";
const CreatePost = ({ type, id, placeholder }) => {
  const [postContent, setPostContent] = useState("");
  const [editPostImage, seteditPostImage] = useState("");
  const [previewImage, setpreviewImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.auth);
  const { createPostBtnLoading } = useSelector((state) => state.post);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("vignette__currentUser")));

  const handlePostContent = (e) => {
    setPostContent(e.target.value);
  };
  const handleCreateNewPost = () => {
    if (type === "COMMENT") {
      postContent.length > 0 && dispatch(addCommentAsync({ postContent, id }));
      setPostContent("");
      return;
    }
    dispatch(toggleBtnLoading("TRUE"));
    postContent.length > 0 &&
      dispatch(
        createPostAsync({
          postContent: postContent,
          previewPostImage: previewImage,
        })
      );
    setPostContent("");
    seteditPostImage("");
    setpreviewImage("");
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    handlePreviewFile(file);
  };

  const handlePreviewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      setpreviewImage(reader.result.replace(/(\r\n|\n|\r)/gm, ""));
    });
    setShowModal(true);
  };
  return (
    <div className="border-2 border-darkCharcoal rounded-lg w-[92%] sm:w-[75%] p-3 bg-darkGrey mb-3 mt-2">
      <div className="w-full flex items-center">
        <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
          {currentUser.photo && currentUser.photo.id ? (
            <AdvancedImage
              cldImg={cld.image(`${currentUser.photo.id}`)}
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
          className="mt-4 w-full py-4 px-2 bg-darkGrey text-white rounded-xl"
          placeholder={placeholder}
          value={postContent}
          onChange={handlePostContent}
        ></textarea>
      </div>
      <div className="w-full flex justify-between items-center">
        {type !== "COMMENT" && (
          <div>
            <input
              type="file"
              id="input_post"
              value={editPostImage}
              onChange={handleImageInput}
              hidden
            />
            <label htmlFor="input_post">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </label>
          </div>
        )}
        {createPostBtnLoading ? (
          <button className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-6 border-b-4 border-sky-700 hover:border-sky-500 focus:border-b-2 rounded">
            <Loader type="ThreeDots" color="#fff" height={30} width={30} />
          </button>
        ) : (
          <button
            className={`bg-sky-500 cursor-pointer hover:bg-sky-400 text-white font-bold py-2 px-6 border-b-4 border-sky-700 hover:border-sky-500 focus:border-b-2 rounded`}
            disabled={!postContent}
            onClick={handleCreateNewPost}
          >
            {type === "COMMENT" ? <span>Comment</span> : <span>Post</span>}
          </button>
        )}
      </div>
      {showModal && (
        <ImageModal previewImage={previewImage} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export { CreatePost };
