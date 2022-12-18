// for displaying users liked cocktails

import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import LikesPageFavoritesMap from "./LikesPageFavoritesMap";
import { useTranslation } from "react-i18next";
import Spinanimation from "./Spinanimation";
import { PlusIcon } from "@heroicons/react/24/outline";
import LikesPageGeneratePDF from "./LikesPageGeneratePDF";
import { useNavigate } from "react-router-dom";

export default function LikesPageFavorites() {
  const { t, i18n } = useTranslation(); // import copy translations from i18n
  const navigate = useNavigate(); // Navigation
  const fetchLng = i18n.language; // get current language selected for fetching the right collection in firestore
  const [isLoading, setIsLoading] = useState(true);  // Define state for the loading indicator
  const [articles, setArticles] = useState([]); // State for saving our data in an empty array

  // Fetch starts here -> useEffect so dependency array checks for changes and rerenders -> fx. for language change, updated content etc.
  useEffect(() => {
    // collection from firebase
    // db is our database, "fetchlng" is our collection
    const articleRef = collection(db, fetchLng);

    // add queries here, sorting etc.
    const q = query(articleRef);

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // change state -> importing the array from the db
      setArticles(articles);
      console.log(articles);
      console.log(articles[0].image?.srcMin);
      setIsLoading(false);
    });
  }, [fetchLng]); // dependency array listens for language change and rerenders data on changes

  // flatmap removes arrays inside arrays so we can map and use ternary for username and filter
  const displayLikes = articles?.flatMap((article) => article?.likes);
  console.log(displayLikes);

  // the some() method to check if an object exists in an array
  // if user is found in array / has liked post return true
  // if not return false
  // we can use this for displaying empty states if user has no likes
  const isFound = displayLikes.some((element) => {
    if (element === auth.currentUser.uid) {
      return true;
    }

    return false;
  });
  console.log(isFound);

  return (
    <section>
      {/* LOADING ANIM IF LOADING STATE = TRUE */}
      {isLoading && <Spinanimation />}

      {/* IF DATA IS RETURNED STATE IS TRUE = SHOW DATA */}
      {isFound && (
        <div>
          {/* CATEGORIES OF LIKES - FUNCTION TO BE IMPLEMENTED -> make user send tag with likes in firebase ex. likes.category && 'all' etc.*/}
          <section className="mb-7">
            <div className="flex flex-wrap gap-4 lg:mb-14">
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  style={{
                    backgroundImage: `url(${articles[0].image?.srcMin})`,
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="w-16 h-16 rounded-full border-primaryYellow border-[1px]"
                ></div>
                <h3 className="text-[11px] font-thin text-primaryGray-500">
                  {t("likespage.categories.all")}
                </h3>
              </div>

              {/* ADD NEW CATEGORY */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 rounded-full bg-lightBlack flex items-center justify-center">
                  <PlusIcon className="h-1/2 w-1/2 text-primaryGray-500" />
                </div>
                <h3 className="text-[11px] font-thin text-primaryGray-500">
                  {t("likespage.categories.new")}
                </h3>
              </div>
            </div>
          </section>
          <LikesPageFavoritesMap articles={articles} />
          <LikesPageGeneratePDF />
        </div>
      )}

      {/* EMPTY STATE IF USER HAS NO FAVOURITES and loading is done*/}
      {!isFound & !isLoading ? (
        <div className="pt-44 lg:pt-14 lg:pb-14 flex flex-col">
          <h3 className="font-medium leading-relaxed text-2xl mt-7 mb-4 text-center">
            {t("likespage.emptyStateTxt")}
          </h3>
          <p className="text-center font-thin text-lg text-primaryGray-500">
            {t("likespage.emptyStateTxtBottom")}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/search")}
              className="mt-14 border-[1px] px-5 text-primaryYellow rounded-xl py-2 hover:opacity-50"
            >
              Find cocktails
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
