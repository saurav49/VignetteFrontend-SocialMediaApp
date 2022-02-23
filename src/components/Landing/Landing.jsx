import React from "react";
import LandingImage from "../../assets/undraw_lost_online_re_upmy.svg";
import styles from "./Landing.module.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../index";
const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className={styles.landing_wrapper}>
        <div className={styles.image_wrapper}>
          <img src={LandingImage} alt="landing" className={styles.image} />
        </div>
        <div className={styles.user_auth_btn_wrapper}>
          <div className="text-center">
            <h1 className="text-5xl text-gray-900 font-extrabold py-2">
              Vignette
            </h1>
            <p className="text-xl text-gray-900 font-medium py-3">
              Vignette helps you connect and share with the people in your life.
            </p>
          </div>
          <div className={styles.auth_btns}>
            <button
              onClick={() => navigate("/login")}
              className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-6 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded"
            >
              Login
            </button>
            <span className="text-xl text-gray-900 font-extrabold mx-5">
              OR
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-6 border-b-4 border-slate-700 hover:border-slate-500 focus:border-b-0 rounded"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Landing };
