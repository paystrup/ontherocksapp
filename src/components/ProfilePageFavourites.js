import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import { useTranslation } from 'react-i18next'
import Spinanimation from "./Spinanimation";
import ProfilePageFavoritesMap from "./ProfilePageFavouritesMap";

export default function ProfilePageFavourites() {
    // import copy translations from i18n
    const { t } = useTranslation();

    // Define state for the loading indicator
    const [isLoading, setIsLoading] = useState(true);

    // show 4 articles on fetch
    const [visible, setVisible] = useState(4);

    // show more btn adds 4 more likes by adding 4 to prev value
    const showMoreLikes = () => {
        setVisible((prevValue) => prevValue + 4);
    };

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
                <div className="grid-cols-2 lg:grid-cols-3 gap-[5vw] lg:gap-[2vw] grid mb-14 justify-between">
                    <ProfilePageFavoritesMap articles={articles} sliceAmount={visible}/>
                    <div className="w-full flex justify-end items-end lg:col-span-3 col-end-auto col-span-2">
                        <button 
                        className="px-5 mt-4 text-primaryGray-700 rounded-xl py-1 bg-lightBlack "
                        onClick={showMoreLikes}
                        >Vis flere</button>
                    </div>
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
            ) : null }
        </section>
    );
}