import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import LikesPageFavoritesMap from "./LikesPageFavoritesMap";
import { useTranslation } from 'react-i18next'
import Spinanimation from "./Spinanimation";

export default function LikesPageFavorites() {
    // import copy translations from i18n
    const { t } = useTranslation();

    // Define state for the loading indicator
    const [isLoading, setIsLoading] = useState(true);

    // State for saving our data in an empty array
    const [articles, setArticles] = useState([]);

    // fetch data from FireStore on snapshot
    useEffect(() => {
        // collection from firebase
        // db is our database, "fetchlng" is our collection
        // 🚨🚨🚨🚨🚨🚨 TO-DO ADD LNG WHEN ENG IS DONE 🚨🚨🚨🚨🚨🚨🚨
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
    const isFound = displayLikes.some(element => {
    if (element === auth.currentUser.uid) {
        return true;
    }

    return false;
    });
    console.log(isFound);

    return (
        <section>
            {/* LOADING ANIM IF LOADING STATE = TRUE */}
            {isLoading && (
                <Spinanimation />
            )}
            
            {/* IF DATA IS RETURNED STATE IS TRUE = SHOW DATA */}
            {isFound && (
                <div>
                    <LikesPageFavoritesMap articles={articles} />
                </div>
            )}
   
            {/* EMPTY STATE IF USER HAS NO FAVOURITES and loading is done*/}
            {!isFound & !isLoading ? (
                <div>
                    <h3 className="font-medium leading-relaxed text-2xl mt-7 mb-4 text-center">
                        {t("likespage.emptyStateTxt")}
                    </h3>
                    <p className="text-center font-thin text-lg">
                        {t("likespage.emptyStateTxtBottom")}
                    </p>
                </div>
            ) : null }
        </section>
    );
}