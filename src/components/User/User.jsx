import { useSelector, useDispatch } from "react-redux";
import { Sidebar } from "../../features/post/index";
import { Navbar } from "../../components/index";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../utils";
import {
  handleLogout,
  getAllFollowingUserInfoAsync,
  getAllFollowerUserInfoAsync,
  toggleShowLoader,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

function User() {
  let reqdUser;
  let { currentUser, allUsers } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  reqdUser = allUsers.find((user) => user._id === id);

  console.log(reqdUser, currentUser);

  const handleUserClick = (type) => {
    console.log(reqdUser._id, type);
    switch (type) {
      case "FOLLOWING":
        dispatch(toggleShowLoader("TRUE"));
        dispatch(getAllFollowingUserInfoAsync());
        navigate("/following");
        break;
      case "FOLLOWER":
        dispatch(getAllFollowerUserInfoAsync());
        navigate("/follower");
        break;
      default:
        console.log("something went wrong in handleUserClick of user.jsx");
        break;
    }
  };
  const handleEditBtn = (currentUser) => {
    navigate("/profile/edit", { state: currentUser });
  };

  return (
    <div className="bg-codGray h-full w-screen flex items-center ">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
        id={currentUser._id}
      />
      )
      <div className="w-full h-screen flex flex-col sm:ml-24 md:ml-56 items-center overflow-x-hidden pl-1 pr-2 pb-60">
        <Navbar />
        {reqdUser &&
        reqdUser.hasOwnProperty("_id") &&
        reqdUser._id === currentUser._id ? (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 border-b-4 border-red-700 hover:border-red-500 focus:border-b-0 rounded self-end mb-3 mr-4"
            onClick={() => dispatch(handleLogout())}
          >
            logout
          </button>
        ) : null}
        {reqdUser && reqdUser.hasOwnProperty("_id") ? (
          <div className="border-2 border-darkCharcoal rounded-lg w-[95%] sm:w-[70%] p-6 bg-darkGrey my-2 mt-3">
            <div className="w-full flex flex-col items-start">
              <div className="flex justify-between w-full">
                <div className="flex items-center justify-start mb-5">
                  <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
                    {reqdUser.photo && reqdUser.photo.id ? (
                      <AdvancedImage
                        cldImg={cld.image(`${reqdUser.photo.id}`)}
                        className="align-middle w-full h-full rounded-2xl"
                      />
                    ) : (
                      <span className="font-bold text-2xl text-white uppercase">
                        {reqdUser.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center flex-col ml-3">
                    <p className="text-white text-opacity-90 text-xl font-bold mb-1">
                      {reqdUser.name}
                    </p>
                    <p className="text-white text-opacity-90 font-medium text-sm">
                      @{reqdUser.username}
                    </p>
                  </div>
                </div>
                {reqdUser._id === currentUser._id ? (
                  <div className="mt-1">
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-6 border-b-4 border-blue-700 hover:border-blue-500 focus:border-b-0 rounded self-end mb-3 mr-4"
                      onClick={() => handleEditBtn(reqdUser)}
                    >
                      Edit
                    </button>
                  </div>
                ) : null}
              </div>
              {reqdUser.hasOwnProperty("bio") &&
                reqdUser.hasOwnProperty("website") && (
                  <div className="my-2 mb-3 p-2 bg-darkCharcoal rounded-md w-full">
                    <p className="text-white p-2">
                      Bio : {reqdUser && reqdUser?.bio}
                    </p>
                    <p className="text-white p-2">
                      Website : {reqdUser && reqdUser?.website}
                    </p>
                  </div>
                )}
              {reqdUser._id === currentUser._id ? (
                <div>
                  <button
                    className="mr-4 text-white opacity-50 hover:opacity-100 cursor-pointer font-bold"
                    onClick={() => handleUserClick("FOLLOWING")}
                  >
                    <span className="mr-1">
                      {reqdUser && reqdUser.following.length}
                    </span>
                    Following
                  </button>
                  <button
                    className="mr-2 text-white opacity-50 hover:opacity-100 cursor-pointer font-bold"
                    onClick={() => handleUserClick("FOLLOWER")}
                  >
                    <span className="mr-1">
                      {reqdUser && reqdUser.followers.length}
                    </span>
                    Followers
                  </button>
                </div>
              ) : (
                <div>
                  <button className="mr-4 text-white opacity-50 hover:opacity-100 cursor-text font-bold">
                    <span className="mr-1">
                      {reqdUser && reqdUser.following.length}
                    </span>
                    Following
                  </button>
                  <button className="mr-2 text-white opacity-50 hover:opacity-100 cursor-text font-bold">
                    <span className="mr-1">
                      {reqdUser && reqdUser.followers.length}
                    </span>
                    Followers
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <h1 className="text-white text-xxl">No user present</h1>
        )}
      </div>
    </div>
  );
}

export { User };
