// Count and display the likes in ProfilePage

import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import Spinanimation from "./Spinanimation";
import { useTranslation } from "react-i18next";

export default function LikeCounter() {
  const { t, i18n } = useTranslation(); // import copy translations from i18n
  const fetchLng = i18n.language; // get current language selected for fetching the right collection in firestore
  const [isLoading, setIsLoading] = useState(false); // Define state for the loading indicator
  const [articles, setArticles] = useState([]); // State for saving our data in an empty array, so we can map later and display

   // Fetch starts here -> useEffect so dependency array checks for changes and rerenders -> fx. for language change, updated content etc.
  useEffect(() => {
    // collection from firebase
    // db is our database, "fetchlng" is our collection
    const articleRef = collection(db, fetchLng);

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
  }, [t, fetchLng]);

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

      {/* IF DATA IS RETURNED STATE IS TRUE = SHOW DATA */}
      {isFound && (
        <div className="fadeInAnimation">
          <p className="text-4xl fadeInAnimation">{likesCounter}</p>
        </div>
      )}

      {/* IF DATA IS RETURNED STATE IS FALSE - SHOW EMPTY STATE 0 */}
      {!isFound && (
        <div>
          <p className="text-4xl">0</p>
        </div>
      )}
    </section>
  );
}
