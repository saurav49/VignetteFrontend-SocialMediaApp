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

function User() {
  let { currentUser } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserClick = (type) => {
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
  return (
    <div className="bg-codGray h-full w-screen flex items-center ">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
      />
      <div className="w-full h-screen flex flex-col ml-72 pl-1 pr-2">
        <Navbar />
        <button
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 border-b-4 border-red-700 hover:border-red-500 focus:border-b-0 rounded self-end mb-3 mr-4"
          onClick={() => dispatch(handleLogout())}
        >
          logout
        </button>
        <div className="border-2 border-darkCharcoal rounded-lg w-[96%] p-6 bg-darkGrey my-2 mt-3">
          <div className="w-full flex flex-col items-start">
            <div className="flex items-center justify-start mb-5">
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
            <div>
              <a
                href="/following"
                className="mr-4 text-white opacity-50 hover:opacity-100 cursor-pointer font-bold"
                onClick={() => handleUserClick("FOLLOWING")}
              >
                <span className="mr-1">
                  {currentUser && currentUser.following.length}
                </span>
                Following
              </a>
              <a
                href="/follower"
                className="mr-2 text-white opacity-50 hover:opacity-100 cursor-pointer font-bold"
                onClick={() => handleUserClick("FOLLOWER")}
              >
                <span className="mr-1">
                  {currentUser && currentUser.followers.length}
                </span>
                Followers
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { User };
