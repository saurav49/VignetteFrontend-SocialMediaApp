import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar, CreatePost } from "../../index";
import { Navbar } from "../../../../components/index";
import { fetchAllPostAsync } from "../../postSlice";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../../../utils";
import { UserAction } from "./Post";
import { Modal } from "../../../../components/index";
import { toggleDeleteModal, updatecommentId } from "../../postSlice";

const Comment = () => {
  const { cursor, hasMore, allPost, showDeleteModal, commentDeleteData } =
    useSelector((state) => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.auth);
  const [requiredPost, setRequiredPost] = useState(null);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("vignette__currentUser")));

  useEffect(() => {
    dispatch(fetchAllPostAsync({ cursor, hasMore }));
  }, [cursor, hasMore, dispatch]);

  useEffect(() => {
    setRequiredPost(allPost.find((post) => post._id === id));
  }, [id, allPost]);

  return (
    <>
      <div className="bg-codGray min-h-screen w-screen flex items-center">
        <Sidebar
          name={currentUser.name}
          username={currentUser.username}
          photo={currentUser.photo}
          id={currentUser._id}
        />

        <div className="w-full flex flex-col sm:ml-24 md:ml-56 items-center overflow-x-hidden pl-1 pr-2 pb-60">
          <Navbar />
          {requiredPost && (
            <RequiredComment
              userInfo={requiredPost.userId}
              comment={requiredPost.text}
              requiredPost={requiredPost}
            />
          )}
          {requiredPost && (
            <CreatePost
              type={"COMMENT"}
              id={requiredPost._id}
              placeholder="comment here..."
            />
          )}
          {requiredPost && requiredPost.comments.length > 0 && (
            <h3 className="text-white text-xl text-center border-b-2 pb-3 my-2 w-[90%]">
              Replies
            </h3>
          )}
          <hr />
          {requiredPost &&
            requiredPost.comments &&
            requiredPost.comments.map((comment) => {
              return (
                <UserComment
                  comment={comment}
                  key={comment._id}
                  requiredPost={requiredPost}
                  currentUser={currentUser}
                />
              );
            })}
        </div>
      </div>
      {showDeleteModal && (
        <Modal
          id={commentDeleteData.commentId}
          postId={commentDeleteData.postId}
          type="COMMENT"
        />
      )}
    </>
  );
};

const UserComment = ({ comment, requiredPost, currentUser }) => {
  const dispatch = useDispatch();
  const isAlreadyUpvotedDownvoted = (commentId, userId, actionType) => {
    return (
      requiredPost.comments
        .find((comment) => comment._id === commentId)
        [actionType].find((id) => id === userId) !== undefined
    );
  };

  const handleDeleteComment = (postId, commentId) => {
    dispatch(toggleDeleteModal("TRUE"));
    dispatch(updatecommentId({ commentId, postId }));
  };
  return (
    <div className="border-2 border-darkCharcoal rounded-lg w-[95%] p-3 bg-darkGrey my-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
            {comment &&
            comment.commentOwner &&
            comment.commentOwner.photo &&
            comment.commentOwner.photo.id ? (
              <AdvancedImage
                cldImg={cld.image(`${comment.commentOwner.photo.id}`)}
                className="align-middle w-full h-full rounded-2xl"
              />
            ) : (
              <span className="font-bold text-2xl text-white uppercase">
                {comment.commentOwner.name[0]}
              </span>
            )}
          </div>
          <div className="flex items-center flex-col ml-3">
            <p className="text-white text-opacity-90 text-xl font-bold mb-1">
              {comment.commentOwner.name}
            </p>
            <p className="text-white text-opacity-90 font-medium text-sm">
              @{comment.commentOwner.username}
            </p>
          </div>
        </div>
        <div className="self-end mb-3">
          <button
            className="mb-6 mr-1 transition-all duration-500 text-white opacity-50 hover:opacity-100 focus:translate-y-1"
            onClick={() => handleDeleteComment(requiredPost._id, comment._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-start my-2 mt-4">
        <p className="text-white">{comment.comment}</p>
      </div>
      <div className="flex items-center justify-around">
        {isAlreadyUpvotedDownvoted(comment._id, currentUser._id, "upvote") ? (
          <UserAction
            icon="thumbsUpFill"
            type="upvote"
            post={requiredPost}
            commentId={comment._id}
          />
        ) : (
          <UserAction
            icon="thumbsUp"
            type="upvote"
            post={requiredPost}
            commentId={comment._id}
          />
        )}
        {isAlreadyUpvotedDownvoted(comment._id, currentUser._id, "downvote") ? (
          <UserAction
            icon="thumbsDownFill"
            type="downvote"
            post={requiredPost}
            commentId={comment._id}
          />
        ) : (
          <UserAction
            icon="thumbsDown"
            type="downvote"
            post={requiredPost}
            commentId={comment._id}
          />
        )}
      </div>
    </div>
  );
};

const RequiredComment = ({ userInfo, comment, requiredPost }) => {
  return (
    <div className="border-2 border-darkCharcoal rounded-lg w-[90%] sm:w-[70%] p-3 bg-darkGrey my-2">
      <div className="w-full flex items-center">
        <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
          {userInfo && userInfo.photo && userInfo.photo.id ? (
            <AdvancedImage
              cldImg={cld.image(`${userInfo.photo.id}`)}
              className="align-middle w-full h-full rounded-2xl"
            />
          ) : (
            <span className="font-bold text-2xl text-white uppercase">
              {userInfo.name[0]}
            </span>
          )}
        </div>
        <div className="flex items-center flex-col ml-3">
          <p className="text-white text-opacity-90 text-xl font-bold mb-1">
            {userInfo.name}
          </p>
          <p className="text-white text-opacity-90 font-medium text-sm">
            @{userInfo.username}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-start my-2 mt-4">
        <p className="text-white">{comment}</p>
      </div>
      <div className="flex items-center justify-around">
        <UserAction icon="like" type="LIKE" post={requiredPost} />
        <UserAction icon="retweet" type="RETWEET" post={requiredPost} />
      </div>
    </div>
  );
};

export { Comment };
