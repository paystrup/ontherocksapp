import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { useTranslation } from "react-i18next";
import DeleteTasteProfile from "./DeleteTasteProfile";

export default function DisplayTasteProfile() {
  const { t } = useTranslation(); // import translations from i18n
  const navigate = useNavigate(); // import navigation from react router

  // state to store snapshot from FireStore
  const [tasteProfile, setTasteProfile] = useState([]);

  // get userID from auth
  const userID = auth.currentUser.uid;
  
   // Fetch starts here -> useEffect so dependency array checks for changes and rerenders -> fx. for language change, updated content etc.
  useEffect(() => {
    // collection from firebase
    // db is our database, go to "articles" collection, document "featured", "fetchLng" = da/en collection depending on chosen language
    // only implemented for DA 🌞 todo -> addToTasteProfile function adds to both en / da and we fetch here depending on lng chosen
    // only names + taste is displayed -> no need to do this
    const articleRef = collection(db, "da");
    const q = query(articleRef, orderBy("addedToTasteProfile", "desc"));

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // change state -> importing the array from the db
      setTasteProfile(articles);
      console.log(articles);
    });
  }, [userID]); // listen for a new user

  // flatmap removes arrays inside arrays so we can map and use ternary for username and filter
  const displayComments = tasteProfile?.flatMap(
    (article) => article?.addedToTasteProfile
  );
  console.log(displayComments);

  // the some() method to check if an object exists in an array
  // if not return false
  // we can use this for displaying empty states if user has no added cocktails
  // checks for currently authenticated user and returns true if it exists in the array
  const isFound = displayComments.some((element) => {
    if (element.addedBy === auth.currentUser.uid) {
      return true;
    }

    return false;
  });

  console.log(isFound); // check in console

  return (
    <div>
      <div className="flex flex-col gap-4">
        {displayComments.map(
          ({
            cocktailTitle,
            slug,
            userTaste,
            addedBy,
            tasteCommentId,
            cocktailImage,
            cocktailId,
            cocktailTaste
          }) =>
            addedBy === auth.currentUser.uid && (
              <div
                onClick={() => navigate("/recipe/" + cocktailId)}
                key={tasteCommentId}
                className="h-32 px-4 py-4 rounded-2xl cursor-pointer flex flex-col justify-between"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.9) 5.34%, rgba(0, 0, 0, 0) 103.44%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${cocktailImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex flex-row justify-between w-full items-center">
                  <h3 className="text-lg font-medium">{cocktailTitle}</h3>
                  <div>
                    <DeleteTasteProfile id={slug} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex justify-center items-center px-4 py-1 rounded-full uppercase w-fit text-xs bg-primaryBlack bg-opacity-80">
                    <p className="">{t("tasteProfile.translations." + cocktailTaste)}</p>
                  </div>
                  <div className="flex justify-center items-center border-[2px] px-4 py-1 rounded-full uppercase w-fit text-xs">
                    <p>{t("tasteProfile.translations." + userTaste)}</p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* EMPTY STATE IF USER HAS NO COCKTAILS IN TASTEPROFILE - ISFOUND FALSE */}
      {!isFound && (
        <div className="py-7">
          <p className="text-primaryGray-700 text-lg text-center">
            {t("tasteProfileDisplay.emptyStateTxt")}
          </p>
        </div>
      )}
    </div>
  );
}
