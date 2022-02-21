import { useEffect, useState } from "react";
import { loginUserWithCredentials } from "./authSlice";
import styles from "./Signup.module.css";
import { AiFillEye, AiTwotoneEyeInvisible } from "../../Icons/icons";
import { useNavigate } from "react-router";
import { validateEmail } from "../../utils";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowLoader } from "./authSlice";
import { Navbar } from "../../components/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLoader, status } = useSelector((state) => state.auth);

  useEffect(() => {
    status === "loading" && dispatch(toggleShowLoader("TRUE"));
    if (status === "fulfilled") {
      dispatch(toggleShowLoader("FALSE"));
      navigate("/feed");
    }
    status === "error" && dispatch(toggleShowLoader("FALSE"));
  }, [status, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError("Enter valid email id");
    setError("");
    dispatch(loginUserWithCredentials({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className={styles.signupPage}>
        <div className={styles.signupContainer}>
          <h2 className="text-3xl text-gray-900 font-bold py-2"> Log In </h2>
          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div className={styles.inptWrapper}>
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inptWrapperPass}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              {showPassword ? (
                <AiTwotoneEyeInvisible
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  className={styles.passwordIcon}
                />
              ) : (
                <AiFillEye
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  className={styles.passwordIcon}
                />
              )}
            </div>
            {err && <p>{err}</p>}
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-3 px-10 border-b-4 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase"
            >
              {showLoader ? (
                <Loader type="ThreeDots" color="#fff" height={20} width={70} />
              ) : (
                <span>log in</span>
              )}
            </button>
          </form>
          <p>
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className={styles.spanStyle}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export { Login };
