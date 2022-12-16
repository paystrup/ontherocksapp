import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import video from "../assets/video/video1.webm";
import { useTranslation } from "react-i18next";

const WelcomePage = ({ navigateToNextPage }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="fixed bg-primaryBlack w-[100vw] h-[100vh] z-[999] inset-0">
      <div className="flex flex-col justify-between w-full h-[100vh] fixed">
        <div className="  bg-primaryBlack">
          <video
            src={video}
            loop
            autoPlay
            playsinline
            muted
            type="video/webm"
            className="videovideo"
          ></video>
        </div>
        <div className="flex flex-col justify-center items-center mb-[35vh] gap-8">
          <h1 className="font-medium text-4xl">step 1</h1>
          <p>Dette her er step 1 af onboarding</p>
          <button onClick={navigateToNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

const AccountSetupPage = ({ navigateToNextPage }) => {
  return (
    <div className="fixed bg-primaryBlack w-[100vw] h-[100vh] z-[999] inset-0">
      <div className="flex flex-col justify-between w-full h-[100vh] fixed">
        <div className="  bg-primaryBlack">
          <video
            src={video}
            loop
            autoPlay
            playsinline
            muted
            type="video/webm"
            className="videovideo"
          ></video>
        </div>
        <div className="flex flex-col justify-center items-center mb-[35vh] gap-8">
          <h1 className="font-medium text-4xl">step 2</h1>
          <p>Dette her er step 2 af onboarding</p>
          <button onClick={navigateToNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

const PersonalizationPage = ({ completeOnboarding }) => {
  return (
    <div className="fixed bg-primaryBlack w-[100vw] h-[100vh] z-[999] inset-0">
      <div className="flex flex-col justify-between w-full h-[100vh] fixed">
        <div className="  bg-primaryBlack">
          <video
            src={video}
            loop
            autoPlay
            playsinline
            muted
            type="video/webm"
            className="videovideo"
          ></video>
        </div>
        <div className="flex flex-col justify-center items-center mb-[35vh] gap-8">
          <h1 className="font-medium text-4xl">step 3</h1>
          <p>Dette her er step 3 af onboarding</p>
          <form>
            <button onClick={completeOnboarding}>Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigateToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const completeOnboarding = () => {
    // Save a flag in local storage or a cookie to indicate that the user has completed the onboarding process
    localStorage.setItem("onboardingCompleted", true);
    // Navigate to the main site or display a message indicating that the onboarding is complete
  };

  if (localStorage.getItem("onboardingCompleted") === "true") {
    // If the user has already completed the onboarding process, redirect them to the main site or display a message
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        {currentPage === 1 && (
          <WelcomePage navigateToNextPage={navigateToNextPage} />
        )}
        {currentPage === 2 && (
          <AccountSetupPage navigateToNextPage={navigateToNextPage} />
        )}
        {currentPage === 3 && (
          <PersonalizationPage completeOnboarding={completeOnboarding} />
        )}
      </div>
    );
  }
};
