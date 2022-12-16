import React from "react";
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
import { Tooltip as ReactTooltip } from "react-tooltip";
import LikeCounter from "../components/LikeCounter.js";
import DisplayTasteProfile from "../components/DisplayTasteProfile.js";

export default function ProfilePage() {
  // import copy translations from i18n
  const { t, i18n } = useTranslation();

  // auth
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // user signupDate in firebase auth
  // user?.metadata?.creationTime;

  // source: https://momentjs.com/docs/#/i18n/loading-into-nodejs/
  // moment for redefining creation date to local lng an
  // fetch depending on i18n language chosen
  const fetchLng = i18n.language;

  // get signup date and convert with moment
  const userSignUpDate = moment(user?.metadata?.creationTime)
    .locale(fetchLng)
    .startOf("day")
    .fromNow();
  // get first character of the string (amount of days since sign)
  const userSignUpDateMin = Array.from(userSignUpDate)[0];

  const handleSignOut = (event) => {
    auth.signOut();
    toast(t("signin.logoutToastMsg"), { toastId: "logoutToast" });
  };


  if (loading) return <Spinanimation />;

  // If there's no user logged in -> show onboarding
  if (!user)
    return (
      <section>
        <div className="video bg-primaryBlack">
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
        <div className="mt-10 mb-32 px-6 relative">
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
      <section className="mt-20 px-6 mb-32 lg:px-[25vw] md:px-[15vw] xl:px-[30vw] w-full">
        <div className="flex flex-col items-center justify-center mb-7 gap-2">
          <img
            className="grayscale imageProfile rounded-full"
            src={auth.currentUser.photoURL}
            alt={user.displayName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = { ppFallback };
            }}
          />
          <h3 className="font-medium text-base">{user.displayName}</h3>
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
              <p className="text-4xl">0</p>
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
              <p className="text-4xl">{userSignUpDateMin}</p>
              <div>
                <p className="text-[10px] text-primaryGray-700">
                  {t("profilepage.createdAtBottom")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-44 bg-primaryGray-200 mt-7 rounded-xl px-2 lg:px-6 py-4 flex justify-between w-full">
          <div className="flex items-center justify-center">
            <ProfileChart />
          </div>
          <div className="flex flex-col justify-between text-primaryGray-700">
            <ReactTooltip
              className="h-fit max-w-[70vw]"
              anchorId="readMore"
              place="left"
              effect="solid"
              content={t("profilepage.readMoreBtn")}
            />
            <div className="flex gap-2 items-center">
              <h4 className="font-regular text-base">
                {t("profilepage.tasteProfileTitle")}
              </h4>
              <div
                id="readMore"
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

        <div className="mt-14 flex justify-between">
          <h3 className="font-medium text-xl">
            {t("profilepage.latestAdded")}
          </h3>
          <SeeMoreBtn text={t("profilepage.latestAddedBtn")} />
        </div>

        <div className="mt-14 flex justify-between">
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

        <DisplayTasteProfile />

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
