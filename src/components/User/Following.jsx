import { Sidebar } from "../../features/post/index";
import { Navbar } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllFollowingUserInfoAsync,
  unfollowUserAsync,
} from "../../features/auth/authSlice";
import { Image } from "cloudinary-react";
import { CLOUD_NAME } from "../../utils";
import Loader from "react-loader-spinner";
import { toggleShowLoader } from "../../features/auth/authSlice";

function Following() {
  let { currentUser, currentUserFollowingList, showLoader } = useSelector(
    (state) => state.auth
  );
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));
  const dispatch = useDispatch();
  const handleUnfollowUser = (username) => {
    dispatch(unfollowUserAsync(username));
  };

  useEffect(() => {
    dispatch(toggleShowLoader("TRUE"));
    dispatch(getAllFollowingUserInfoAsync());
  }, [dispatch]);

  return (
    <div className="bg-codGray h-full w-screen flex items-center">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
      />
      <div className="w-full flex flex-col items-center ml-64 pl-1 pr-2">
        <Navbar />
        {showLoader ? (
          <div className="h-screen flex">
            <Loader type="ThreeDots" color="#fff" height={100} width={100} />
          </div>
        ) : (
          <div className="h-screen w-full flex flex-col items-center">
            {currentUserFollowingList.length > 0 ? (
              currentUserFollowingList.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="border-2 border-darkGrey rounded-lg w-[90%] p-5 flex items-center bg-darkGrey my-2 mt-3 shadow-md"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center shadow-md">
                      {user.photo ? (
                        <Image
                          cloudName={`${CLOUD_NAME}`}
                          publicId={user.photo.id}
                          width="300"
                          crop="scale"
                          className="align-middle w-full h-full rounded-2xl"
                        />
                      ) : (
                        <span className="font-bold text-2xl text-white uppercase">
                          {user.name[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between w-[85%] ml-4">
                      <div className="text-white">
                        <p>{user.name}</p>
                        <p>@{user.username}</p>
                      </div>
                      <button
                        className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded self-end mb-3 mr-4 mt-4"
                        onClick={() => handleUnfollowUser(user.username)}
                      >
                        unfollow
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-xl text-white">Not following any user</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { Following };
