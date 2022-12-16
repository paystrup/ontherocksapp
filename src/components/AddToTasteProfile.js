// Inspiration from https://youtu.be/_7gdsAfFV9o 
import React, { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import filters from "../lng/tasteProfileTaste.json"
import { t } from "i18next";

export default function AddToTasteProfile({ id, cocktail }) {
    // import copy translations from i18n
    const { t } = useTranslation();

    // // get current language selected for fetching the right collection in firestore
    // const fetchLng = i18n.language;

    // props are sent from CocktailPage.js
    // State for logging the chosen taste
    // by default the cocktails set taste is set to state
    // -> user can change if it they feel it tastes differently
    const [comment, setComment] = useState(cocktail?.taste?.slug);

    // verify user is logged in -> makes us able to send user data via. the comment
    const [user] = useAuthState(auth);

    // reference to our database in FireBase, collection = articles, id = our book Doc, the specific book displayed
    const commentRef = doc(db, "da", id);
    
    // ideal to update this to store more than 1 taste in an array
    // todo
    const handleTasteChange = (taste) => {
        setComment(taste);
        console.log(comment);
    }

    const handleSubmitTasteProfile = (event) => {
        updateDoc(commentRef, {
            // updateDoc and arrayUnion to update array with new values (no overrides)
            // send the values we need
            comments: arrayUnion({
                sentBy: auth.currentUser.uid,
                sentByName: user.displayName,
                sentByImageUrl: auth.currentUser.photoURL,
                comment: comment,
                createdAt: new Date(),
                commentId: uuidv4(),
                cocktailTitle: cocktail.title,
                cocktailImage: cocktail.imageUrl,
                cocktailId: cocktail.id
            }),
        }).then(() => {
            // UX for message sent
            toast("Du har nu tilføjet denne cocktail til din smagsprofil.", { type: "success" });
            console.log("Tilføjet til smagsprofil");
        });
    }


    return (
        <div className="px-5 lg:px-14 mt-14">
            <div className="flex flex-wrap gap-2 mb-4">
                {filters.map(({ id, title, category}) =>
                    <button 
                        className="px-2 bg-primaryYellow text-primaryBlack py-1 rounded-xl"
                        key={id}
                        onClick={() => handleTasteChange(category)}
                    >
                        <p>{t(title)}</p>
                    </button>
                )}
            </div>
            <button 
                className="bg-primaryYellow w-full"
                onClick={handleSubmitTasteProfile}
            >
                Føj til smagsprofil
            </button>
        </div>
    )
}
