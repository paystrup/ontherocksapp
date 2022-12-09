// 🚨✨ TODO
// add grid layout changability
// fix the 0 added at line 88
// add collections + animations


import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import LikesPageFavoritesMap from "./LikesPageFavoritesMap";
import { useTranslation } from 'react-i18next'

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
                <div className="">
                    <div className="flex flex-col justify-center items-center h-[480px]">
                            <svg className="animate-spin mb-8 h-10 w-10 text-primaryYellow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <h2 className="text-lg text-center text-primaryGray-900">Loading cocktails ...</h2>
                    </div>
                </div>
            )}
            
            {/* IF DATA IS RETURNED STATE IS TRUE = SHOW DATA */}
            {isFound && (
                <div>
                    <h3 className="text-2xl font-medium mb-7">{t("likespage.title")}</h3>
                    <LikesPageFavoritesMap articles={articles} />
                </div>
            )}
   
            {/* EMPTY STATE IF USER HAS NO FAVOURITES and loading is done*/}
            {!isFound & !isLoading && (
                <div>
                    <h3 className="font-medium leading-relaxed text-2xl mt-7 mb-4 text-center">
                        {t("likespage.emptyStateTxt")}
                    </h3>
                    <p className="text-center font-thin text-lg">
                        {t("likespage.emptyStateTxtBottom")}
                    </p>
                </div>
            )}
        </section>
    );
}