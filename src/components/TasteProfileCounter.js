import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig.js";
import Spinanimation from "./Spinanimation";

export default function TasteProfileCounter() {
    // state to store snapshot from FireStore
    const [tasteProfile, setTasteProfile] = useState([]);

    // get userID from auth
    const userID = auth.currentUser.uid;

    // Define state for the loading indicator
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(false);
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
    console.log(isFound + "is found in the counter");

    //Checks how many likes user have saved in numbers
    const tasteCounter = displayComments.filter(
        (element) => element.addedBy === auth.currentUser.uid
    ).length;
    console.log(tasteCounter);

  return (
    <section>
        {/* LOADING ANIM IF LOADING STATE = TRUE */}
        {isLoading && <Spinanimation />}

        {/* IF DATA IS RETURNED STATE IS TRUE = SHOW DATA */}
        {isFound && (
        <div className="fadeInAnimation">
            <p className="text-4xl fadeInAnimation">{tasteCounter}</p>
        </div>
        )}

        {/* IF DATA IS RETURNED STATE IS FALSE - SHOW EMPTY STATE 0 */}
        {!isFound && (
        <div>
            <p className="text-4xl">0</p>
        </div>
        )}
    </section>
  )
}
