// ✅ confirm age dialog´
// shown in App.js -> works for all pages
// user must confirm their age due to EU laws -> because of alcohol

import React, { useState, useEffect } from 'react';
import image from "../assets/images/onboarding.webp";
// i18n language support
import { useTranslation } from "react-i18next";

export default function AgeConfirmed() {
  const { t } = useTranslation(); // import translations from i18n
  const [visible, setVisible] = useState(true); // state for showing or hiding the age confirmal dialog

  // on accept, prevent default to the form
  // set ageConfirmed in localStorage to true, so the component wont render on reload
  // user only has to confirm age once -> laws about alcohol
  // hides dialog with setVisible
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('ageConfirmed', true);
    setVisible(false);
  };

  // useEffect checks for changes to ageConfirmed, if found in the local storage
  // -> set visible to false -> no dialog shown
  useEffect(() => {
    const ageConfirmed = localStorage.getItem('ageConfirmed');
    if (ageConfirmed) {
      setVisible(false);
      document.body.style.overflow = "auto"; // reset no scroll
    }

    // disable scroll if dialog is enabled -> so the user wont end up far down our page
    if (!ageConfirmed) {
      document.body.style.overflow = "hidden";
    }
  }, [visible]); // dependency array chekcs for changes in visibility and rerenders

  const ageConfirmed = localStorage.getItem('ageConfirmed'); // get the ageConfirmed key value pair

  // if age is confirmed, don't show anything
  if (ageConfirmed) {
    return null;
  }

  // if age is confirmed is false -> show the dialog
  // clicking deny to age -> redirect to something funny -> Tone of Voice -> Bornholm, Bornholm, Bornholm 🌞
  // confirming runs the handleSubmit above
  if (!ageConfirmed)
  return (
    <div className='fixed top-0 left-0 w-full h-[100vh] scroll- z-[9999] bg-primaryBlack lg:bg-opacity-80 lg:backdrop-blur-sm lg:flex lg:justify-center lg:items-center fadeInAnimation'>
      <div className="age-confirm-modal h-full w-full flex flex-col justify-end items-center lg:w-1/2 lg:h-1/2 lg:justify-center lg:rounded-3xl fadeInAnimation"                  
          style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              }}>
          <div className='flex px-6'>
            <form onSubmit={handleSubmit}>
              <h2 className='text-6xl font-displayBook mb-56 text-center px-5'>Er du over 18 år?</h2>
              <div className='flex gap-4 items-center justify-between mb-20 w-full'>  
                <a href="https://youtu.be/6Ax8G6aIMyU?t=17" target="_blank" rel="noreferrer" className='px-5 py-2 border-[2px] rounded-xl text-primaryYellow border-primaryYellow w-[50%] text-center'>{t("ageModal.dontConfirm")}</a>
                <button className='px-5 py-2 border-[2px] rounded-xl text-primaryBlack border-primaryYellow bg-primaryYellow w-[50%]' type="submit">{t("ageModal.confirm")}</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}
