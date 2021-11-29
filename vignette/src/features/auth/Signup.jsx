import { useEffect, useState } from "react";
import { signUpUser } from "./authSlice";
import styles from "./Signup.module.css";
import { AiFillEye, AiTwotoneEyeInvisible } from "../../Icons/icons";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword, isMatch } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { toggleShowLoader } from "./authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLoader, status } = useSelector((state) => state.auth);

  useEffect(() => {
    status === "loading" && dispatch(toggleShowLoader("TRUE"));
    status === "fulfilled" && dispatch(toggleShowLoader("FALSE"));
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError("Enter valid email id");
    if (!validatePassword(password))
      return setError(
        "Password should contain atleast 6 characters of atleast lowercase, uppercase and numeric integer"
      );
    if (!isMatch(password, confirmPassword))
      return setError("Password and Confirm Password does not match");

    setError("");

    dispatch(signUpUser({ name, username, email, password }));

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <h2> Sign Up </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inptWrapper}>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inptWrapper}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
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
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                className={styles.passwordIcon}
              />
            ) : (
              <AiFillEye
                onClick={() => setShowPassword((showPassword) => !showPassword)}
                className={styles.passwordIcon}
              />
            )}
          </div>
          <div className={styles.inptWrapperPass}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
            {showConfirmPassword ? (
              <AiTwotoneEyeInvisible
                onClick={() =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
                className={styles.passwordIcon}
              />
            ) : (
              <AiFillEye
                onClick={() =>
                  setShowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
                className={styles.passwordIcon}
              />
            )}
          </div>
          {error && <p>{error}</p>}
          <button type="submit" className={styles.btn}>
            {showLoader ? (
              <Loader type="ThreeDots" color="#fff" height={13} width={120} />
            ) : (
              <span>create account</span>
            )}
          </button>
        </form>
        <p>
          Already have an account?
          <span onClick={() => navigate("/login")} className={styles.spanStyle}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export { Signup };
