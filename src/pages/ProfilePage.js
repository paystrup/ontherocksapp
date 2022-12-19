import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig.js";
import { useNavigate } from "react-router";
import ppFallback from "../assets/images/profilePicFallback.png";
import SeeMoreBtn from "../components/SeeMoreBtn.js";
import video from "../assets/video/video2.webm";
import Login from "../components/Login";
import Spinanimation from "../components/Spinanimation";
import ProfilePageFavourites from "../components/ProfilePageFavourites.js";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/da";
import ProfileChart from "../components/ProfileChart";
import LikeCounter from "../components/LikeCounter.js";
import DisplayTasteProfile from "../components/DisplayTasteProfile.js";
import TasteProfileCounter from "../components/TasteProfileCounter.js";

export default function ProfilePage() {
  const { t, i18n } = useTranslation(); // import copy translations from i18n
  const [user, loading] = useAuthState(auth); // auth
  const navigate = useNavigate(); // navigation

  // user signupDate in firebase auth
  // user?.metadata?.creationTime;

  // source: https://momentjs.com/docs/#/i18n/loading-into-nodejs/
  // moment for redefining creation date to local lng an
  // fetch depending on i18n language chosen
  const fetchLng = i18n.language;

  // This function takes in a string as an argument and returns the string
  // with all non-numeric characters removed
  function removeNonNumericCharacters(input) {
      // The replace method is used to replace all occurrences of the pattern
    // /\D/g with an empty string. The pattern matches any non-digit character,
    // and the 'g' flag indicates that the search should be global (fx.., all
    // of the pattern should be replaced).
    return input.replace(/\D/g,'');
  }

  // get signup date and convert with moment
  const userSignUpDate = moment(user?.metadata?.creationTime)
    .locale(fetchLng)
    .startOf("day")
    .fromNow();

  // this is the input string that will be passed to the function
  const input = userSignUpDate;

  // This calls the removeNonNumericCharacters function and passes the input
  // string as an argument the modified string is then stored in the output variable
  // we can then use this to display the days since a user signed up with auth
  const output = removeNonNumericCharacters(input);



  // signout onclick function -> signout from firebase + ux toast
  const handleSignOut = (event) => {
    auth.signOut();
    toast(t("signin.logoutToastMsg"), { toastId: "logoutToast" });
    navigate("/profile");
  };
  
  // tooltips
  const [showToolTipFirst, setshowToolTipFirst] = useState(false);
  const [showToolTipClick, setshowToolTipClick] = useState(false);

  const handleClickToolTip = () => {
    setshowToolTipClick(!showToolTipClick);
  };

  // if userdata is loading show loader anim
  if (loading) return <Spinanimation />;

  // If there's no user logged in -> show onboarding
  if (!user)
    return (
      <section className="fadeInAnimation">
        <div className="video bg-primaryBlack z-[1000] lg:z-[1]">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsinline
            type="video/mp4"
            className="videovideo"
          ></video>
        </div>
        <div className="mt-16 mb-32 relative px-6 lg:px-56 xl:mb-32 xl:px-[35rem] lg:mt-32 sm:px-20 sm:mt-24">
          <h1 className="text-3xl font-displayBook leading-tight text-center">
            <div
              className="textspan"
              dangerouslySetInnerHTML={{ __html: t("profilepage.login.title") }}
            ></div>
          </h1>
          <p className="text-base text-primaryGray-500 font-thin leading-relaxed mt-4 line-clamp-4 text-center mb-20">
            {t("profilepage.login.body")}
          </p>

          <Login />
        </div>
      </section>
    );

  // If user is authenticated -> show profilepage
  if (user)
    return (
      <section className="mt-20 lg:mt-32 px-6 mb-32 lg:px-[25vw] md:px-[15vw] xl:px-[30vw] w-full fadeInAnimation">
        <div className="flex flex-col items-center justify-center mb-7 gap-2 lg:mb-12">
          <img
            className="grayscale imageProfile rounded-full"
            src={auth.currentUser.photoURL}
            alt={user.displayName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = { ppFallback };
            }}
          />
          <h3 className="font-medium text-base lg:text-xl">{user.displayName}</h3>
        </div>

        <div className="flex justify-between text-sm uppercase ">
          <div className="flex flex-col justify-center items-start gap-2 w-1/3 ">
            <div className="w-fit text-center flex flex-col gap-2">
              <p className="font-medium text-primaryGray-500 text-xs">
                {t("profilepage.saved")}
              </p>
              <LikeCounter />
              <div>
                <p className="text-[10px] text-primaryGray-700">
                  {t("profilepage.savedBottom")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 w-1/3">
            <div className="w-fit text-center flex flex-col justify-between gap-2">
              <p className="font-medium text-primaryGray-500 text-xs">
                {t("profilepage.tasteprofile")}
              </p>
              <p className="text-4xl"><TasteProfileCounter /></p>
              <div>
                <p className="text-[10px] text-primaryGray-700">
                  {t("profilepage.tasteprofileBottom")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center gap-2 w-1/3">
            <div className="w-fit text-center flex flex-col justify-between gap-2">
              <p className="font-medium text-primaryGray-500 text-xs">
                {t("profilepage.createdAt")}
              </p>
              <p className="text-4xl fadeInAnimation">{output}</p>
              <div>
                <p className="text-[10px] text-primaryGray-700">
                  {t("profilepage.createdAtBottom")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-44 bg-primaryGray-200 mt-7 rounded-xl px-2 lg:px-6 py-4 flex justify-between w-full relative">
          <div className="flex items-center justify-center">
            <ProfileChart />
          </div>
          <div className="flex flex-col justify-between text-primaryGray-700">
            {/* <ReactTooltip
              className="h-fit max-w-[70vw]"
              anchorId="readMore"
              place="left"
              effect="solid"
              content={t("profilepage.readMoreBtn")}
            /> */}
            {showToolTipFirst && (
              <div className="hidden lg:flex absolute right-[5%] max-w-xs mt-10 justify-center items-center bg-primaryGray-900 px-7 py-5 transition-all">
                <p>{t("profilepage.readMoreBtn")}</p>
              </div>
            )}

            {showToolTipClick && (
              <div className="flex lg:hidden absolute right-[5%] max-w-xs mt-10 justify-center items-center bg-primaryGray-900 px-7 py-5 transition-all">
                <p>{t("profilepage.readMoreBtn")}</p>
              </div>
            )}
            <div onClick={handleClickToolTip} className="flex gap-2 items-center" onMouseEnter={() => setshowToolTipFirst(true)} onMouseLeave={() => setshowToolTipFirst(false)}>
              <h4 className="font-regular text-base">
                {t("profilepage.tasteProfileTitle")}
              </h4>
              <div
                className="border-solid border-[1px] rounded-full w-[14px] h-[14px] flex justify-center align-center"
              >
                <p className="text-[9px] self-center">?</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-wrap font-regular text-primaryBlack">
              <div className="flex gap-2">
                <p className="bg-secondaryPeach px-3 rounded-md">
                  {t("profilepage.tags.taste1")}
                </p>
                <p className="bg-secondaryYellow px-3 rounded-md">
                  {t("profilepage.tags.taste2")}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="bg-secondaryRed px-3 rounded-md">
                  {t("profilepage.tags.taste3")}
                </p>
                <p className="bg-secondaryOrange px-3 rounded-md">
                  {t("profilepage.tags.taste4")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-between mb-7">
          <div id="infoTaste" className="flex gap-2 items-center">
            <h3 className="font-medium text-xl">
              {t("profilepage.latestAdded")}
            </h3>
          </div>
          <SeeMoreBtn text={t("profilepage.latestAddedBtn")} />
        </div>
        <DisplayTasteProfile />

        <div className="mt-16 flex justify-between">
          <h3 className="font-medium text-xl">
            {t("profilepage.yourCollections")}
          </h3>
          <div onClick={() => navigate("/likes")}>
            <SeeMoreBtn text={t("profilepage.yourCollectionsBtn")} />
          </div>
        </div>
        <div className="mt-7">
          <ProfilePageFavourites />
        </div>

        <div className="signOut mt-8">
          <button
            className="border-[1px] w-full py-2 rounded-xl"
            onClick={handleSignOut}
          >
            {t("profilepage.signOutBtn")} {user.displayName}
          </button>
        </div>
      </section>
    );
}
