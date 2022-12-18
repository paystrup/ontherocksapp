// TOP NAVBAR
// BOTH MOBILE AND DESKTOP COMBINED
// TODO -> add data for dynamic top navbar to an array and loop -> save code lines
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/svg/logo.svg";

// import flags for lng change
import daFlag from "../assets/svg/flags/dk.svg";
import enFlag from "../assets/svg/flags/gb.svg";
import {
  XMarkIcon,
  ArrowLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export default function TopNavigation() {
  const { t, i18n } = useTranslation(); // import translations from i18n
  const navigate = useNavigate(); // navigation
  const location = useLocation(); // get the current location (/url)
  console.log(location);
  console.log(location.pathname); // check if it logs

  // state for closing and opening the language selection
  const [openLngSelect, setOpenLngSelect] = useState(false);

  // onclick handle openlngselector -> set to the opposite -> if closed -> open -> close
  const handleLngSelect = () => {
    setOpenLngSelect(!openLngSelect);
  };

  // for handling lng change + store in localstorage cache, so we can use it later, and it works on page reload
  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setOpenLngSelect(!openLngSelect);
  };

  return (
    <nav className="h-16 flex items-center justify-between px-6 py-8 bg-primaryBlack w-full fixed top-0 left-0 z-50 text-primaryWhite lg:py-11">
      {/* CHANGE LANGUAGE MODAL - IF CLICKED and openLngSelect is true, show */}
      {openLngSelect && (
        <div className="languageSelector fixed top-0 left-0 bg-primaryBlack z-50 w-full h-screen flex flex-col gap-14 text-3xl items-center pt-16">
          <XMarkIcon className="h-10 w-10 mb-36 cursor-pointer" onClick={handleLngSelect}/>
          <div className="flex gap-10 flex-col">
            <h3>{t("topnav.selectlng")}</h3>
            <div className="flex gap-10 items-center justify-center">
              <button
                className={
                  localStorage.getItem("lng") === "da"
                    ? "w-16 h-16 rounded-full border-solid border-2 border-primaryWhite opacity-50"
                    : "w-16 h-16 rounded-full border-solid border-2 border-primaryWhite"
                }
                style={{
                  backgroundImage: `url(${enFlag})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => handleChangeLng("en")}
              ></button>

              <button
                className={
                  localStorage.getItem("lng") === "en"
                    ? "w-16 h-16 rounded-full border-solid border-2 border-primaryWhite opacity-50"
                    : "w-16 h-16 rounded-full border-solid border-2 border-primaryWhite"
                }
                style={{
                  backgroundImage: `url(${daFlag})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => handleChangeLng("da")}
              ></button>
            </div>
          </div>
        </div>
      )}

      <div id="mobileTopNav" className="flex justify-between w-full lg:hidden">
        {/* DYNAMIC NAVBAR WITH LANGUAGE SUPPORT  */}
        {/* FOR THE HOME PAGE */}
        {location.pathname === "/" && (
          <ul className="list-none font-displayBook text-lg">
            <li className="text-primaryWhite fill-primaryWhite">
              <Link to="/">
                <img
                  src={logo}
                  className="w-20"
                  alt="On The Rocks Logo Small"
                />
              </Link>
            </li>
          </ul>
        )}

        {/* FOR THE SEARCH PAGE */}
        {location.pathname === "/search" && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite">
              <h2>{t("topnav.searchTitle")}</h2>
            </li>
          </ul>
        )}

        {/* FOR THE LIKES PAGE */}
        {location.pathname === "/likes" && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite">
              <h2>{t("topnav.likesTitle")}</h2>
            </li>
          </ul>
        )}

        {/* FOR THE PROFILE PAGE */}
        {location.pathname === "/profile" && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite">
              <h2>{t("topnav.profileTitle")}</h2>
            </li>
          </ul>
        )}

        {/* FOR THE RECIPE PAGE - LEFT ARROW  */}
        {location.pathname.includes("/recipe") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <div onClick={() => navigate(-1)} className="flex cursor-pointer">
                <ArrowLeftIcon className="h-7 w-7" />
              </div>
            </li>
          </ul>
        )}

        {/* FOR THE RECIPE PAGE - TEXT */}
        {location.pathname.includes("/recipe") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <h2 className="">{t("topnav.recipeTitle")}</h2>
            </li>
          </ul>
        )}

        {/* FOR THE EVENTS PAGE - LEFT ARROW  */}
        {location.pathname.includes("/events") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <div onClick={() => navigate(-1)} className="flex cursor-pointer">
                <ArrowLeftIcon className="h-7 w-7" />
              </div>
            </li>
          </ul>
        )}

        {/* FOR THE EVENTS PAGE - TEXT */}
        {location.pathname.includes("/events") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <h2 className="">{t("topnav.eventsTitle")}</h2>
            </li>
          </ul>
        )}

        {/* FOR THE EVENTS PAGE - LEFT ARROW  */}
        {location.pathname.includes("/competition") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <div onClick={() => navigate(-1)} className="flex cursor-pointer">
                <ArrowLeftIcon className="h-7 w-7" />
              </div>
            </li>
          </ul>
        )}

        {/* FOR THE EVENTS PAGE - TEXT */}
        {location.pathname.includes("/competition") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <h2 className="">{t("topnav.eventsTitle")}</h2>
            </li>
          </ul>
        )}

        {/* FOR THE ARTICLE PAGE - LEFT ARROW  */}
        {location.pathname.includes("/articles") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <div onClick={() => navigate(-1)} className="flex cursor-pointer">
                <ArrowLeftIcon className="h-7 w-7" />
              </div>
            </li>
          </ul>
        )}

        {/* FOR THE ARTICLE PAGE - TEXT */}
        {location.pathname.includes("/articles") && (
          <ul className="list-none text-lg lg:hidden">
            <li className="text-primaryWhite fill-primaryWhite flex justify-between">
              <h2 className="">{t("topnav.articleTitle")}</h2>
            </li>
          </ul>
        )}

        {/* RIGHT SIDE - LNG BTN OR SETTINGS BTN */}
        <div className="flex items-center justify-end">

          {/* SHOW LANGUAGE BTN DEPENDING ON LANG CHOSEN FOR i18N */}
          {i18n.language === "en" && (
            <div>
              <button
                className="w-7 h-7 rounded-full border-solid border-[1.5px] border-primaryWhite"
                style={{
                  backgroundImage: `url(${enFlag})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={handleLngSelect}
              ></button>
            </div>
          )}

          {i18n.language === "da" && (
            <div>
              <button
                className="w-7 h-7 rounded-full border-solid border-[1.5px] border-primaryWhite"
                style={{
                  backgroundImage: `url(${daFlag})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={handleLngSelect}
              ></button>
            </div>
          )}

          {/* FOR THE RECIPE PAGE - SETTINGS ICON  */}
          {location.pathname.includes("/profile") && (
            <ul className="list-none text-lg">
              <li className="text-primaryWhite fill-primaryWhite flex justify-between">
                <button className="flex iconsize">
                  <EllipsisVerticalIcon className="h-7 w-7 self-end" />
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

    {/* NAVIGATION BAR FOR DESKTOP  */}
     <div id="desktopTopNav" className="hidden lg:flex justify-between items-center w-full lg:px-14">

      <Link to="/">
        <img
          src={logo}
          className="w-20"
          alt="On The Rocks Logo Small"
      />
      </Link>
      
      <ul className="gap-10 hidden lg:flex lg:justify-center lg:items-center">
        <li>
          <NavLink to="/">{t("topnav.homeTitle")}</NavLink>
        </li>

        <li>
          <NavLink to="/search">{t("topnav.cocktailTitle")}</NavLink>
        </li>

        <li>
          <NavLink to="/likes">{t("topnav.likesNavTitle")}</NavLink>
        </li>

        <li>
          <NavLink to="/profile">{t("topnav.profileNavTitle")}</NavLink>
        </li>

               {/* SHOW LANGUAGE BTN DEPENDING ON LANG CHOSEN FOR i18N */}
          {i18n.language === "en" && (
            <div>
              <button
                className="w-7 h-7 rounded-full border-solid border-[1.5px] border-primaryWhite"
                style={{
                  backgroundImage: `url(${enFlag})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={handleLngSelect}
              ></button>
            </div>
          )}

          {i18n.language === "da" && (
            <div>
              <button
                className="w-7 h-7 rounded-full border-solid border-[1.5px] border-primaryWhite"
                style={{
                  backgroundImage: `url(${daFlag})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={handleLngSelect}
              ></button>
            </div>
          )}
      </ul>
      </div>
    </nav>
  );
}
