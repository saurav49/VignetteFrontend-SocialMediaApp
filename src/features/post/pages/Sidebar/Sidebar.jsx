import React from "react";
import { BrandIcon } from "../../../../components/index";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ name, username, photo }) => {
  const navigate = useNavigate();
  return (
    <aside className="w-[97%] fixed bottom-3 ml-2 z-10 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-darkGrey sm:opacity-100 sm:h-[97%] md:w-[13rem] sm:w-[5rem] py-3 px-4 bg-darkGrey rounded-lg shadow-md sm:flex sm:flex-col sm:justify-between sm:fixed sm:top-2 sm:bottom-1 sm:left-2">
      <nav>
        <div className="hidden sm:block">
          <div className="flex items-center justify-center">
            <BrandIcon fill="#fff" width="44px" height="44px" />
          </div>
        </div>
        <ul className="flex items-center justify-between sm:flex-col">
          <Row icons="home">Home</Row>
          <Row icons="search">Search</Row>
          <Row icons="notifications">Notifications</Row>
          <Row icons="profile">Profile</Row>
        </ul>
      </nav>
      <div className="md:flex md:items-center md:justify-between text-white hidden sm:block">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-2xl bg-darkCharcoal flex items-center justify-center border border-darkCharcoal shadow-md">
            {photo && photo.id ? (
              <AdvancedImage
                cldImg={cld.image(`${photo.id}`)}
                className="rounded-2xl w-14 h-14"
              />
            ) : (
              <span className="font-bold text-2xl text-white uppercase">
                {name[0]}
              </span>
            )}
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col items-center">
              <span className="font-medium text-xl">{name}</span>
              <span className="text-sm">@{username}</span>
            </div>
          </div>
        </div>
        <button
          className="opacity-50 cursor-pointer hover:opacity-100 hover:bg-darkCharcoal hover:rounded-2xl p-2 transition-colors duration-150 ease-in hidden md:block"
          onClick={() => navigate("/profile")}
        >
          {icons["gear"]}
        </button>
      </div>
    </aside>
  );
};

const Row = (props) => {
  const navigate = useNavigate();
  const handleSidebarItem = (sidebarItemtype) => {
    switch (sidebarItemtype) {
      case "home":
        navigate("/feed");
        break;
      case "search":
        navigate("/search");
        break;
      case "notifications":
        navigate("/notification");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        toast.error(
          "something went wrong while you clicked an item in sidebar"
        );
        break;
    }
  };
  return (
    <li
      className="flex items-center justify-center md:justify-start w-full py-2 px-1 rounded-xl my-5 cursor-pointer text-white text-opacity-90 hover:bg-codGray transition-colors duration-150 ease-in active:bg-codGray focus:outline-none focus:ring focus:ring-codGray"
      onClick={() => handleSidebarItem(props.icons)}
    >
      {icons[props.icons]}
      <span className="ml-3 hidden md:block">{props.children}</span>
    </li>
  );
};

const icons = {
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  notifications: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  profile: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
        clipRule="evenodd"
      />
    </svg>
  ),
  gear: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

export { Sidebar };
