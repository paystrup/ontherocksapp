import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import { useTranslation } from "react-i18next";
import Spinanimation from "./Spinanimation";
import ProfilePageFavoritesMap from "./ProfilePageFavouritesMap";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function ProfilePageFavourites() {
  const { t } = useTranslation(); // import copy translations from i18n
  const [isLoading, setIsLoading] = useState(true); // Define state for the loading indicator

  // show 4 articles on fetch
  const [visible, setVisible] = useState(2);
  console.log(visible);

  // show more btn adds 4 more likes by adding 4 to prev value
  // updated: fixed amount -> simpler UI
  const showMoreLikes = () => {
    setVisible(+8);
  };

  const showLessLikes = () => {
      setVisible(+4);
  };

  // State for saving our data in an empty array
  const [articles, setArticles] = useState([]);

  // fetch data from FireStore on snapshot
  useEffect(() => {
    // collection from firebase
    const articleRef = collection(db, "da");

    // sort by createdAt, our timestamp added to every article, date
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
      setIsLoading(false);
    });
  }, []); // dependency array => empty => fetch on rerender

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

  //Checks how many likes user have saved in numbers
  const likesCounter = displayLikes.filter(
    (element) => element === auth.currentUser.uid
  ).length;
  console.log(likesCounter);

  return (
    <section>
      {/* LOADING ANIM IF LOADING STATE = TRUE */}
      {isLoading && <Spinanimation />}

      {/* IF DATA IS RETURNED STATE IS TRUE = SHOW DATA 
          -> Dynamic styling if length 1 <= show full width, else grid
      */}
      {isFound && (
        <div className="mb-28 w-full">
          <div className={likesCounter <= 1 ? "" : "grid-cols-2 lg:grid-cols-2 gap-[5vw] lg:gap-[1vw] grid justify-between"}>
            <ProfilePageFavoritesMap
              articles={articles}
              sliceAmount={visible}
            />
          </div>

          {/* SLICED AT 4 ITEMS -> if visible is smaller than 5 and likescounter bigger than 4, show more btn -> better UX -> btn works */}
          <div className={visible < 5 & likesCounter > 4 ? "w-full justify-center" : "hidden"}>
              <button
                className="px-5 w-full mt-4 text-primaryGray-700 rounded-xl py-1 bg-lightBlack"
                onClick={showMoreLikes}
              >
                <div className="flex gap-2 items-center justify-center">
                  <ChevronDownIcon className="h-5 w-5"/>
                  {t("profilepage.showMoreBtn")}
                </div>
              </button>
          </div>

          {/* SAME -> BUT SHOW LESS -> SUBTRACTS 4 from VISIBLE */}
          <div className={visible > 4 ? "w-full justify-center" : "hidden"}>
              <button
                className="px-5 w-full mt-4 text-primaryGray-700 rounded-xl py-1 bg-lightBlack"
                onClick={showLessLikes}
              >
                <div className="flex gap-2 items-center justify-center">
                  <ChevronUpIcon className="h-5 w-5"/>
                  {t("profilepage.showLessBtn")}
                </div>
              </button>
          </div>
        </div>
      )}

      {/* EMPTY STATE IF USER HAS NO FAVOURITES and loading is done*/}
      {!isFound & !isLoading ? (
        <div className="px-10 mb-14">
          <h3 className="leading-relaxed text-center text-primaryGray-700 text-lg py-7">
            {t("profilepage.likesEmptyState")}
          </h3>
        </div>
      ) : null} 
      
      {/* ELSE DO NOTHING -> must return null - && returns error */}
    </section>
  );
}
