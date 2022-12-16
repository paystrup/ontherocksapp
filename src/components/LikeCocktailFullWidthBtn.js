// inspiration from https://github.com/voranzovv/my-article/tree/main/src/components
import React, { useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

export default function LikeCocktailFullWidthBtn({ id, likes }) {
    // import copy translations from i18n
    const { t } = useTranslation();

    // authentication auth and db are found in the firestore config, ref to our projekt in firebase
    const [user] = useAuthState(auth);

    // reference to our FireStore db, collection = articles, sort by ID of posts / books
    const likesRefDa = doc(db, "da", id);
    const likesRefEn = doc(db, "en", id);

    // best solution would be to create a new collection in Firebase
    // containing all likes + data from the cocktail liked to fetch later
    // to-do 😎

    // State for showing / hiding button -> button is only showed for better conversion after the top bookmark btn is scrolled past
    // easier navigation for the user
    const [showButton, setShowButton] = useState(false);
        
    useEffect(() => {
        // Button is displayed after scrolling down 550px -> after add to tasteprofile btn
        // Hidden after 1500px offset to show featured products at the end -> better conversions
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 600 &  window.pageYOffset < 1550 ? setShowButton(true) : setShowButton(false);
        };

        // add eventlistener 😎
        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.addEventListener('scroll', handleScrollButtonVisibility);
        };

    }, []);

    // for the onclick on like
    const handleLike = () => {
        // if user already has liked the cocktail, remove the uid from the likes array
        // with updateDoc so we don't override other data

        if (likes?.includes(user.uid)) {
        updateDoc(likesRefDa, {
            likes: arrayRemove(user.uid),
        }).then(() => {
            console.log("unliked");
        }).catch((e) => {
                console.log(e);
        });
        }

        if (likes?.includes(user.uid)) {
            updateDoc(likesRefEn, {
            likes: arrayRemove(user.uid),
            }).then(() => {
                console.log("unliked");
            }).catch((e) => {
                console.log(e);
            });
        }
        // if uid isn't found in the likes array add the uid
        // to the likes array in FireStore in our DB
        // arrayUnion, so we don't override data
        else{
            updateDoc(likesRefDa,{
                likes:arrayUnion(user.uid)
            }).then(() => {
                console.log("liked");
                toast(t("cocktailPage.bookmarkToast"), { type: "success", toastId: "succesToast", }); // toast because there's no btn to change styling on -> UX feedback
            }).catch((e) => {
                console.log(e);
            });

            updateDoc(likesRefEn,{
                likes:arrayUnion(user.uid)
            }).then(() => {
                console.log("liked");
                toast(t("cocktailPage.bookmarkToast"), { type: "success", toastId: "succesToast", }); // toast because there's no btn to change styling on -> UX feedback
            }).catch((e) => {
                console.log(e);
            });
        }
    };

    // if scrollamount is reached, and showButton state is set to true, show the btn
    // dynamic className -> hidden if user has already liked the cocktail
  return (
    <>  
        {showButton && (
            <div 
               className={likes?.includes(user.uid) ? "hidden" : "fixed bottom-0 left-0 z-[1] mb-[5rem] w-full lg:hidden"}
               style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 70%)`,
                }}            
            >
                <div className="px-5 flex items-center justify-center mb-7">
                    <button 
                        className="text-primaryBlack bg-primaryYellow w-full py-3 rounded-xl"
                        onClick={handleLike}
                    >
                        {t("cocktailPage.saveBtnWide")}
                    </button>
                </div>
            </div>
        )}
    </>
  );
}