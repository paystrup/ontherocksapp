// Inspiration from https://youtu.be/_7gdsAfFV9o 
import React, { useState, useEffect } from "react";
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
import { XMarkIcon } from "@heroicons/react/24/outline";
import { t } from "i18next";

export default function AddToTasteProfile({ id, cocktail }) {
    // import copy translations from i18n
    const { t } = useTranslation();

    // for opening and closing the modal
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = (e) => {
        setIsOpen(!isOpen); // set to the opposite -> close
    }

    // // get current language selected for fetching the right collection in firestore
    // const fetchLng = i18n.language;

    // props are sent from CocktailPage.js
    // State for logging the chosen taste
    // by default the cocktails set taste is set to state
    // -> user can change if it they feel it tastes differently
    const [tasteTag, setTasteTag] = useState(cocktail?.taste?.slug);
    
    // must use useEffect to update the state on every page change, listens for ID and cocktail
    useEffect(() => {
      setTasteTag(cocktail?.taste?.slug);
    }, [id, cocktail])
    
    // verify user is logged in -> makes us able to send user data via. the comment
    const [user] = useAuthState(auth);

    // reference to our database in FireBase, collection = articles, id = our book Doc, the specific book displayed
    const cocktailRefDa = doc(db, "da", id);

    // 🌐
    // add later so we can use translations when displaying ->
    // const cocktailRefEn = doc(db, "en", id);
    
    // ideal to update this to store more than 1 taste in an array
    // todo
    const handleTasteChange = (taste) => {
        setTasteTag(taste);
        console.log(tasteTag);
    }

    const handleSubmitTasteProfile = (event) => {
        updateDoc(cocktailRefDa, {
            // updateDoc and arrayUnion to update array with new values (no overrides)
            // send the values we need
            addedToTasteProfile: arrayUnion({
                cocktailSlug: cocktail.slug,
                cocktailTitle: cocktail.title,
                cocktailImage: cocktail.image.src,
                cocktailId: cocktail.id,
                createdAt: new Date(),
                tasteCommentId: uuidv4(),
                userTaste: tasteTag,
                cocktailTaste: cocktail.taste.slug,
                addedBy: auth.currentUser.uid,
                addedByName: user.displayName
            }),
        }).then(() => {
            // UX for message sent
            toast(t("addToTasteToast.title"), { type: "success" });
            console.log("Tilføjet til smagsprofil");
        });
    }

    if (isOpen === false)
    return (
        <div className="mt-10 px-5">
            <button 
                onClick={handleIsOpen}
                className="text-primaryYellow border-[1px] w-full py-3 rounded-xl"
            >
                {t("cocktailPage.addflavorBtn")}
            </button>
        </div>

    );

    // 🚨🚨🚨🚨 TODO ADD VALIDATION -> IF USER HAS ALREADY SUBMITTED DON'T RENDER COMPONENT 🚨🚨🚨🚨
    if (isOpen === true)
    return (
        <div className="px-5 lg:px-14 mt-14 fixed bottom-0 left-0 z-50 bg-lightBlack pb-20 pt-6 rounded-t-3xl">
            <div
                className="flex items-center justify-center mb-8" 
                onClick={handleIsOpen}
            >
                <XMarkIcon className="h-10 w-10"/>
            </div>
            <div className="mb-14">
                <h3 className="text-2xl mb-3 font-medium">{t("tasteProfile.title")}</h3>
                <p className="text-primaryGray-500 font-thin">{t("tasteProfile.subTitle")}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {filters.map(({ id, title, category}) =>
                    <button 
                        className={tasteTag === category ? "px-3 bg-primaryYellow text-primaryBlack py-1 rounded-xl uppercase font-thin" : "border-[1px] py-1 rounded-xl px-3 uppercase font-thin"}
                        key={id}
                        onClick={() => handleTasteChange(category)}
                    >
                        <p>{t(title)}</p>
                    </button>
                )}
            </div>
            <p className="text-primaryGray-500 font-thin my-7">{t("tasteProfile.bottomText")}</p>
            <button 
                className="bg-primaryYellow w-full py-3 rounded-xl text-primaryBlack"
                onClick={() => {
                    handleSubmitTasteProfile();
                    handleIsOpen();
                }}
            >
                {t("tasteProfile.submitBtn")}
            </button>
        </div>
    )
}
