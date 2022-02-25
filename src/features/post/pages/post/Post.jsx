import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { useDispatch, useSelector } from "react-redux";
import { cld } from "../../../../utils";
import {
  upvoteCommentAsync,
  downvoteCommentAsync,
  likePostAsync,
  unlikePostToAsync,
  removeRetweetPostToAsync,
  retweetPostAsync,
  toggleDeleteModal,
} from "../../postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "../../../../components/index";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.post);
  const handleDeletePost = () => {
    dispatch(toggleDeleteModal("TRUE"));
  };
  return (
    <>
      {showDeleteModal && <Modal postId={post._id} />}
      <div className="border-2 border-darkCharcoal rounded-lg w-[95%] p-3 bg-darkGrey my-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
              {post.userId.photo && post.userId.photo.id ? (
                <AdvancedImage
                  cldImg={cld.image(`${post.userId.photo.id}`)}
                  className="align-middle w-full h-full rounded-2xl"
                />
              ) : (
                <span className="font-bold text-2xl text-white uppercase">
                  {post.userId.name[0]}
                </span>
              )}
            </div>
            <div className="flex items-center flex-col ml-3">
              <p className="text-white text-opacity-90 text-xl font-bold mb-1">
                {post.userId.name}
              </p>
              <p className="text-white text-opacity-90 font-medium text-sm">
                @{post.userId.username}
              </p>
            </div>
          </div>
          <div className="self-end mb-3">
            <button
              className="mb-6 mr-1 transition-all duration-500 text-white opacity-50 hover:opacity-100 focus:translate-y-1"
              onClick={handleDeletePost}
            >
              {icons["delete_icon"]}
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-start my-2 mt-4">
          <p className="text-white">{post.text}</p>
        </div>
        <div className="flex items-center justify-around">
          <UserAction icon="comment" type="comment" post={post} />
          <UserAction
            icon="like"
            type="likes"
            post={post}
            currentUser={post.userId}
          />
          <UserAction
            icon="retweet"
            type="retweet"
            post={post}
            currentUser={post.userId}
          />
        </div>
      </div>
      {post.retweet.length > 0 && (
        <>
          {post.retweet.map((userInfo) => {
            return (
              <div
                className="border-2 border-darkCharcoal rounded-lg w-[95%] p-3 bg-darkGrey my-2"
                key={userInfo._id}
              >
                <div className="flex items-center mb-4 ml-1 mt-2 text-white opacity-70 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="ml-1">{userInfo.name} Retweeted</span>
                </div>
                <div className="w-full flex items-center">
                  <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
                    {post.userId.photo && post.userId.photo.id ? (
                      <AdvancedImage
                        cldImg={cld.image(`${post.userId.photo.id}`)}
                        className="align-middle w-full h-full rounded-2xl"
                      />
                    ) : (
                      <span className="font-bold text-2xl text-white uppercase">
                        {post.userId.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center flex-col ml-3">
                    <p className="text-white text-opacity-90 text-xl font-bold mb-1">
                      {post.userId.name}
                    </p>
                    <p className="text-white text-opacity-90 font-medium text-sm">
                      @{post.userId.username}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-start my-2 mt-4">
                  <p className="text-white">{post.text}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

const UserAction = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserAction = (userActionType, post, currentUser) => {
    if (userActionType === "likes") {
      userActionType =
        post &&
        post[userActionType] &&
        post[userActionType].find((e) => e === currentUser._id) !== undefined
          ? "unlike"
          : "likes";
    }
    if (userActionType === "retweet") {
      userActionType =
        post &&
        post[userActionType] &&
        post[userActionType].find(
          (e) => e._id === currentUser._id || e === currentUser._id
        ) !== undefined
          ? "remove_retweet"
          : "retweet";
    }
    switch (userActionType) {
      case "comment":
        navigate(`/post/${props.post._id}`);
        break;
      case "likes":
        dispatch(likePostAsync({ postId: props.post._id }));
        break;
      case "unlike":
        dispatch(unlikePostToAsync({ postId: props.post._id }));
        break;
      case "retweet":
        dispatch(retweetPostAsync({ postId: props.post._id }));
        break;
      case "remove_retweet":
        dispatch(removeRetweetPostToAsync({ postId: props.post._id }));
        break;
      case "upvote":
        dispatch(
          upvoteCommentAsync({
            postId: props.post._id,
            commentId: props.commentId,
          })
        );
        break;
      case "downvote":
        dispatch(
          downvoteCommentAsync({
            postId: props.post._id,
            commentId: props.commentId,
          })
        );
        break;
      default:
        toast.error("something went wrong, don't worry it's not your fault");
        break;
    }
  };
  return (
    <div
      className="p-2 text-white cursor-pointer opacity-50 hover:opacity-100 flex items-center"
      onClick={() =>
        handleUserAction(props.type, props.post, props.currentUser)
      }
    >
      <UserActionIcon
        icon={props.icon}
        post={props.post}
        currentUser={props.currentUser}
        type={props.type}
      />
      <span className="ml-2">
        {props.post[props.type] && props.post[props.type].length}
      </span>
    </div>
  );
};

const UserActionIcon = (props) => {
  let isOccured;
  if (props.type === "likes" || props.type === "retweet") {
    isOccured =
      props.post &&
      props.post[props.type] &&
      props.currentUser &&
      props.post[props.type].find((e) => e === props.currentUser._id) !==
        undefined;
  }
  return (
    <>
      {props.type === "likes" || props.type === "retweet" ? (
        isOccured ? (
          <div className="text-sky-400 opacity:50 hover:opacity-100">
            {icons[props.icon]}
          </div>
        ) : (
          icons[props.icon]
        )
      ) : (
        icons[props.icon]
      )}
    </>
  );
};

const icons = {
  delete_icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  dots_verticle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  ),
  comment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  like: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  likefilled: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  ),
  retweet: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 m-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  ),
  thumbsUp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
      />
    </svg>
  ),
  thumbsUpFill: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
    </svg>
  ),
  thumbsDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
      />
    </svg>
  ),
  thumbsDownFill: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
    </svg>
  ),
};

export { Post, UserAction };
