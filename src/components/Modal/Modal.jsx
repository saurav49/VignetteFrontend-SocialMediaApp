import { useDispatch } from "react-redux";
import {
  toggleDeleteModal,
  deletePostAsync,
  togglePostLoading,
  removeCommentAsync,
} from "../../features/post/postSlice";

const Modal = ({ id, postId, type }) => {
  const dispatch = useDispatch();
  const handleDeletePost = () => {
    if (id && type === "POST") {
      dispatch(togglePostLoading("TRUE"));
      dispatch(deletePostAsync(id));
      dispatch(toggleDeleteModal("FALSE"));
    } else if (id && type === "COMMENT") {
      dispatch(togglePostLoading("TRUE"));
      dispatch(removeCommentAsync({ commentId: id, postId }));
      dispatch(toggleDeleteModal("FALSE"));
    }
  };
  const handleCancelDelete = () => {
    dispatch(toggleDeleteModal("FALSE"));
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-codGray">
      <div className="flex items-center flex-col w-[400px] bg-white text-slate-900 rounded-md shadow-md py-8 px-4 absolute">
        <p className="text-center my-2">
          Do you really want to delete this {type.toLowerCase()}? This process
          cannot be undone
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
            onClick={handleDeletePost}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
