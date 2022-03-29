import { useEffect, useState } from "react";
import { Navbar } from "../index";
import { Sidebar } from "../../features/post/index";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../utils";
import {
  unfollowUserAsync,
  followUserAsync,
  toggleShowLoader,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  let { currentUser, showLoader, allUsers } = useSelector(
    (state) => state.auth
  );
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState([]);
  console.log();
  const handleCheckFollowStatus = (userId) => {
    return (
      currentUser.following.find((user) => user._id === userId) !== undefined
    );
  };
  const handleFollowBtnClick = (username, reqType) => {
    switch (reqType) {
      case "UNFOLLOW":
        dispatch(toggleShowLoader("TRUE"));
        dispatch(unfollowUserAsync(username));
        break;
      case "FOLLOW":
        dispatch(toggleShowLoader("TRUE"));
        dispatch(followUserAsync(username));
        break;
      default:
        toast.error(
          "something when wrong when you clicked the follow/unfollow button, dont worry contact the admin"
        );
        break;
    }
  };

  useEffect(() => {
    if (searchText) {
      setUserList(
        allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase()) &&
            user._id !== currentUser._id
        )
      );
    } else {
      setUserList(allUsers.filter((user) => user._id !== currentUser._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, allUsers]);

  return (
    <div className="bg-codGray h-full w-screen flex items-center">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
        id={currentUser._id}
      />
      <div className="w-full flex flex-col sm:ml-24 md:ml-56 items-center overflow-x-hidden pl-1 pr-2 pb-60">
        <Navbar />
        <div className="w-[80%]">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 text-slate-400 block bg-darkGrey w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm mb-4 focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>
        {showLoader ? (
          <div className="h-screen flex">
            <Loader type="ThreeDots" color="#fff" height={100} width={100} />
          </div>
        ) : (
          <div className="h-screen w-full flex flex-col items-center">
            {userList.length > 0 ? (
              <div className="h-screen w-full flex flex-col items-center">
                {userList.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className="border-2 border-darkGrey rounded-lg w-[90%] sm:w-[60%] p-5 flex items-center bg-darkGrey my-2 mt-3 shadow-md"
                    >
                      <div
                        className="h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center shadow-md cursor-pointer"
                        onClick={() => navigate(`/profile/${user._id}`)}
                      >
                        {user.photo ? (
                          <AdvancedImage
                            cldImg={cld.image(`${user.photo.id}`)}
                            className="align-middle w-full h-full rounded-2xl"
                          />
                        ) : (
                          <span className="font-bold text-2xl text-white uppercase">
                            {user.name[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between w-[85%] ml-4">
                        <div
                          className="text-white cursor-pointer"
                          onClick={() => navigate(`/profile/${user._id}`)}
                        >
                          <p>{user.name}</p>
                          <p>@{user.username}</p>
                        </div>
                        {handleCheckFollowStatus(user._id) ? (
                          <>
                            {showLoader ? (
                              <Loader
                                type="ThreeDots"
                                color="#fff"
                                height={100}
                                width={100}
                              />
                            ) : (
                              <button
                                className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded self-end mb-3 mr-4 mt-4"
                                onClick={() =>
                                  handleFollowBtnClick(
                                    user.username,
                                    "UNFOLLOW"
                                  )
                                }
                              >
                                unfollow
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            {showLoader ? (
                              <Loader
                                type="ThreeDots"
                                color="#fff"
                                height={100}
                                width={100}
                              />
                            ) : (
                              <button
                                className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded self-end mb-3 mr-4 mt-4"
                                onClick={() =>
                                  handleFollowBtnClick(user.username, "FOLLOW")
                                }
                              >
                                follow
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h1 className="text-xl text-white">
                Invite your friends to use Vignette
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { Search };
