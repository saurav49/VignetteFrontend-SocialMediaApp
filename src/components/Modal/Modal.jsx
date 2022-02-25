import { useDispatch } from "react-redux";
import {
  toggleDeleteModal,
  deletePostAsync,
  togglePostLoading,
} from "../../features/post/postSlice";

const Modal = ({ postId }) => {
  const dispatch = useDispatch();
  const handleDeletePost = (postId) => {
    dispatch(togglePostLoading("TRUE"));
    dispatch(deletePostAsync(postId));
    dispatch(toggleDeleteModal("FALSE"));
  };
  const handleCancelDelete = () => {
    dispatch(toggleDeleteModal("FALSE"));
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-codGray opacity-80 z-10">
      <div className="flex items-center flex-col w-[400px] bg-white text-slate-900 rounded-md shadow-md z-20 py-8 px-4">
        <p>
          Do you really want to delete this post? This process cannot be undone
        </p>
        <div className="flex items-center w-100 mt-4">
          <button
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
            onClick={handleCancelDelete}
          >
            cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 border-b-4 mb-5 border-red-700 hover:border-red-500 rounded uppercase"
            onClick={() => handleDeletePost(postId)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
