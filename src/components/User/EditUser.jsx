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
    (currentUser = JSON.parse(localStorage.getItem("vignette__currentUser")));
  const [editUsername, setEditUsername] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editUrl, setEditUrl] = useState(currentUser.website);
  const [ediProfileImage, setEdiProfileImage] = useState("");
  const [previewImage, setpreviewImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const handleSaveBtn = () => {
    dispatch(toggleShowLoader("TRUE"));
    dispatch(
      editUserAsync({
        name: editUsername,
        bio: editBio,
        website: editUrl,
        photo: previewImage,
      })
    );
    setEdiProfileImage("");
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
    <div className="bg-codGray h-full w-screen flex items-center ">
      <Sidebar
        name={currentUser.name}
        username={currentUser.username}
        photo={currentUser.photo}
        id={currentUser._id}
      />
      <div className="w-full flex flex-col sm:ml-24 md:ml-56 items-center overflow-x-hidden pl-1 pr-2 pb-60">
        <Navbar />
        <div className="border-2 border-darkCharcoal rounded-lg w-[96%] p-6 bg-darkGrey my-2 mt-3">
          {showModal && (
            <ImageModal
              setShowModal={setShowModal}
              previewImage={previewImage}
            />
          )}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
                <div className="absolute top-1 right-1">
                  <input
                    type="file"
                    id="input_profile"
                    value={ediProfileImage}
                    onChange={handleImageInput}
                    hidden
                  />
                  <label htmlFor="input_profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </label>
                </div>
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

const ImageModal = ({ previewImage, setShowModal }) => {
  const handleCancelDelete = () => {
    setShowModal(false);
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="flex items-center justify-center flex-col w-[300px] sm:w-[50%] md:w-[35%] py-2 bg-white text-slate-900 rounded-md shadow-md py-8 px-4 absolute">
        <h2 className="text-xl text-slate-600">Image Preview</h2>
        {previewImage ? (
          <img
            src={previewImage}
            alt="preview_profile"
            className="w-[90%] rounded-lg my-2"
          />
        ) : (
          <Loader type="ThreeDots" color="#333" height={50} width={50} />
        )}
        <button
          className="mt-2 bg-slate-500 hover:bg-slate-400 text-white text-center font-bold py-2 px-5 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
          onClick={handleCancelDelete}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export { EditUser, ImageModal };
