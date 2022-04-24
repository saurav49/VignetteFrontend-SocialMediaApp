import { useEffect } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "./features/auth/index";
import {
  PrivateRoute,
  Landing,
  User,
  Following,
  Follower,
  Search,
  EditUser,
} from "./components/index";
import { Feed, Comment } from "./features/post/index";
import { Notification } from "./features/notification/index";
import { useSelector, useDispatch } from "react-redux";
import { addUserInfo, getAllUserAsync } from "./features/auth/authSlice";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const { status, currentUser } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("vignette__token"));
  const dispatch = useDispatch();

  // add token to header if present
  useEffect(() => {
    (function () {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return;
      }
      delete axios.defaults.headers.common["Authorization"];
    })();
  }, [status, token]);

  // initialize user in local storage
  useEffect(() => {
    if (currentUser && !currentUser.hasOwnProperty("_id")) {
      dispatch(
        addUserInfo(JSON.parse(localStorage.getItem("vignette__currentUser")))
      );
    }
  }, [status, currentUser, dispatch]);

  useEffect(() => {
    token && dispatch(getAllUserAsync());
  }, [dispatch, token]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<PrivateRoute />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
        <Route path="/post/:id" element={<PrivateRoute />}>
          <Route path="/post/:id" element={<Comment />} />
        </Route>
        <Route path="/notification" element={<PrivateRoute />}>
          <Route path="/notification" element={<Notification />} />
        </Route>
        <Route path="/profile/:id" element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<User />} />
        </Route>
        <Route path="/follower" element={<PrivateRoute />}>
          <Route path="/follower" element={<Follower />} />
        </Route>
        <Route path="/following" element={<PrivateRoute />}>
          <Route path="/following" element={<Following />} />
        </Route>
        <Route path="/search" element={<PrivateRoute />}>
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/profile/edit" element={<PrivateRoute />}>
          <Route path="/profile/edit" element={<EditUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
