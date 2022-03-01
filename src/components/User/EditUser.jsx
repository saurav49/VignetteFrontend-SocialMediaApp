import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar } from "../../features/post/index";
import { Navbar } from "../../components/index";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../utils";
import { editUserAsync, toggleShowLoader } from "../../features/auth/authSlice";
import Loader from "react-loader-spinner";

function EditUser() {
  let { currentUser, showLoader } = useSelector((state) => state.auth);
  !currentUser.hasOwnProperty("_id") &&
    (currentUser = JSON.parse(localStorage.getItem("currentUser")));
  const [editUsername, setEditUsername] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editUrl, setEditUrl] = useState(currentUser.website);
  const dispatch = useDispatch();
  const handleSaveBtn = () => {
    dispatch(toggleShowLoader("TRUE"));
    dispatch(
      editUserAsync({ name: editUsername, bio: editBio, website: editUrl })
    );
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
        <div className="border-2 border-darkCharcoal rounded-lg w-[96%] p-6 bg-darkGrey my-2 mt-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
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
              <div className="flex flex-col ml-3">
                <div className="w-[95%] shadow-sm">
                  <input
                    type="text"
                    placeholder="link"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full py-2 px-4 bg-darkCharcoal my-1 text-white rounded-md"
                  />
                </div>
                <p className="text-white text-opacity-90 font-medium text-sm ml-1 mt-1">
                  @{currentUser.username}
                </p>
              </div>
            </div>
            <div className="w-[95%] self-center shadow-sm">
              <input
                type="text"
                placeholder="bio"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full py-2 px-4 bg-darkCharcoal my-1 text-white rounded-md"
              />
            </div>
            <div className="w-[95%] self-center shadow-sm">
              <input
                type="text"
                placeholder="link"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className="w-full py-2 px-4 bg-darkCharcoal my-1 text-white rounded-md"
              />
            </div>
            <div className="w-[95%] mt-1 self-center ml-1">
              <span className="mr-4 text-white opacity-50 hover:opacity-100 font-bold">
                following {currentUser.following.length}
              </span>
              <span className="mr-4 text-white opacity-50 hover:opacity-100 font-bold">
                follower {currentUser.followers.length}
              </span>
            </div>
            <div className="self-center w-full my-2 text-center">
              <button
                className="w-full bg-sky-500 hover:bg-sky-400 text-white text-center font-bold py-2 px-6 border-b-4 border-sky-700 hover:border-sky-500 focus:border-b-0 rounded self-end mb-3 mr-4"
                onClick={handleSaveBtn}
              >
                <>
                  {showLoader ? (
                    <div className="flex items-center justify-center w-full">
                      <Loader
                        type="ThreeDots"
                        color="#fff"
                        height={20}
                        width={70}
                      />
                    </div>
                  ) : (
                    <span>save</span>
                  )}
                </>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EditUser };
