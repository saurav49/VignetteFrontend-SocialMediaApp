import { useEffect } from "react";
import { Sidebar } from "../../post/index";
import { Navbar } from "../../../components/index";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllNotificationAsync,
  deleteNotificationAsync,
  toggleNotificationLoader,
} from "../notificationSlice";
import Loader from "react-loader-spinner";

function Notification() {
  let { currentUser } = useSelector((state) => state.auth);
  const { allNotifications, isNotificationLoading } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));
  useEffect(() => {
    dispatch(toggleNotificationLoader("TRUE"));
    dispatch(getAllNotificationAsync());
  }, [dispatch]);

  return (
    <div className="bg-codGray h-screen w-screen flex items-center">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
      />
      <div className="w-full flex flex-col sm:ml-24 md:ml-56 items-center overflow-x-hidden pl-1 pr-2 pb-60">
        <Navbar />
        {isNotificationLoading ? (
          <div className="h-screen flex">
            <Loader type="ThreeDots" color="#fff" height={100} width={100} />
          </div>
        ) : (
          allNotifications &&
          allNotifications.map((notification) => {
            return (
              <div
                className="w-[95%] border-2 border-darkCharcoal rounded-md p-4 m-2 h-[80px] bg-darkCharcoal flex items-center relative"
                key={notification._id}
              >
                <NotificationSnippet
                  actionOwner={notification.actionOwner}
                  actionType={notification.actionType}
                  id={notification._id}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const NotificationSnippet = (props) => {
  let actionType = "";
  const dispatch = useDispatch();
  switch (props.actionType) {
    case "FOLLOWING":
      actionType = "is follwoing you";
      break;
    case "COMMENT":
      actionType = "has commented on your tweet";
      break;
    case "UPVOTE":
      actionType = "has upvoted your comment";
      break;
    case "DOWNVOTE":
      actionType = "has downvoted your comment";
      break;
    case "RETWEET":
      actionType = "has retweeted your tweet";
      break;
    case "LIKE":
      actionType = "has liked your tweet";
      break;
    default:
      console.log("Something went wrong in notification snippet");
      break;
  }
  const handleDeleteNotification = (id) => {
    dispatch(deleteNotificationAsync(id));
  };
  return (
    <>
      <span
        className="absolute top-2 right-2 opacity-50 cursor-pointer text-white hover:opacity-100"
        onClick={() => handleDeleteNotification(props.id)}
      >
        {icons["deleteCross"]}
      </span>
      <p className="text-white text-xl">
        {props.actionOwner && props.actionOwner.name} {actionType}
      </p>
    </>
  );
};

const icons = {
  deleteCross: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="#fff"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
};

export { Notification };
