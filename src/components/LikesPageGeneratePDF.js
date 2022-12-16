// source https://github.com/parallax/jsPDF
import { jsPDF } from "jspdf";
import React from "react";

// import auth from firebase
import { auth } from "../firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { renderToString } from "react-dom/server";

export default function LikesPageGeneratePDF(articles) {
  // authentication
  const [user] = useAuthState(auth);
  const articlesTest = ["item1", "item2", "item3"];
  console.log(articlesTest);

  // import copy translations from i18n
  const { t, i18n } = useTranslation();

  const generatePDF = (event) => {
    if (Array.isArray(articlesTest)) {
      // Loop through the array and log each item to the console
      articlesTest.forEach((item) => {
        console.log(item);
      });
    } else {
      // Handle the error if articles is not an array
      console.error("articles is not an array!");
    }
    const doc = new jsPDF("p", "mm", "a4");

    doc.text(20, 20, t("drinkCard.title"));
    doc.text(20, 30, t("drinkCard.subtitle"));

    doc.save(t("drinkCard.pdfName"));
  };


  return (
    <div
      className=" pt-4 sticky z-[9] mb-20 bottom-28 lg:bottom-5 left-0 w-full lg:mb-0"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,1) 84%)`,
      }}
    >
      <div className="flex gap-2 mb-7">
        <button
          onClick={generatePDF}
          className="w-full py-3 rounded-2xl text-primaryBlack font-regular bg-primaryYellow lg:py-4"
        >
          {t("drinkCard.btnText")}
        </button>
      </div>
    </div>
  );
}
