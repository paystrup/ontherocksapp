import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { useTranslation } from "react-i18next";
import DeleteTasteProfile from "./DeleteTasteProfile";

export default function DisplayTasteProfile() {
  // import copy translations from i18n
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  // state to store snapshot from FireStore
  const [tasteProfile, setTasteProfile] = useState([]);

  // get userID from auth
  const userID = auth.currentUser.uid;

  useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, "da");
    // sort by createdAt, our timestamp added to every article, date
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
  }, [userID]);

  // flatmap removes arrays inside arrays so we can map and use ternary for username and filter
  const displayComments = tasteProfile?.flatMap(
    (article) => article?.addedToTasteProfile
  );
  console.log(displayComments);

  // the some() method to check if an object exists in an array
  // if user is found in sentTo / has recieved a msg return true
  // if not return false
  // we can use this for displaying empty states if user has no msg
  const isFound = displayComments.some((element) => {
    if (element.addedBy === auth.currentUser.uid) {
      return true;
    }

    return false;
  });

  console.log(isFound);
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
          }) =>
            addedBy === auth.currentUser.uid && (
              <div
                onClick={() => navigate("/recipe/" + slug)}
                key={tasteCommentId}
                className="h-32 px-4 py-4 rounded-2xl cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${cocktailImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div>
                  <h3 className="text-xl font-medium">{cocktailTitle}</h3>
                  <p>{t("tasteProfile.translations." + userTaste)}</p>
                </div>
                <div>
                  {/* {tasteProfile.map(({ addedToTasteProfile }) => (
                    <div>
                      <DeleteTasteProfile
                        id={slug}
                        tasteProfile={displayComments}
                      />
                    </div>
                  ))} */}
                </div>
              </div>
            )
        )}
      </div>

      {/* EMPTY STATE IF USER HAS NO COCKTAILS IN TASTEPROFILE - ISFOUND FALSE */}
      {!isFound && (
        <div className="chat-error-message">
          <p>
            Udforsk vores cocktails og tilføj dine favoritter til din
            smagsprofil.
          </p>
        </div>
      )}
    </div>
  );
}
