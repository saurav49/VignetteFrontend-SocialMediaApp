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
} from "./components/index";
import { Feed, Comment } from "./features/post/index";
import { Notification } from "./features/notification/index";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const { status } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    (function () {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return;
      }
      delete axios.defaults.headers.common["Authorization"];
    })();
  }, [status, token]);

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
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<User />} />
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
      </Routes>
    </div>
  );
}

export default App;
