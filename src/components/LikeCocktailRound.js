// inspiration from https://github.com/voranzovv/my-article/tree/main/src/components
// round cocktail btn
// styling could have been implemented by sending props and adding to a state
// if (roundBtn === true) return etc. etc.

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function LikeCocktailRound({ id, likes }) {
  const [user] = useAuthState(auth); // authentication auth and db are found in the firestore config, ref to our project in firebase

  // reference to our FireStore db, both languages to support language change shows same likes
  // best solution would be to create a new collection in Firebase
  // containing all likes + data from the cocktail liked to fetch later
  // to-do 😎
  const likesRefDa = doc(db, "da", id);
  const likesRefEn = doc(db, "en", id);

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
        }).catch((e) => {
              console.log(e);
        });

        updateDoc(likesRefEn,{
            likes:arrayUnion(user.uid)
        }).then(() => {
            console.log("liked");
        }).catch((e) => {
              console.log(e);
        });
    }
  };

  // if likes includes id, ux styling -> fill the bookmark
  // onclick uses the function above
  return (
    <div className="bookmarkIcon border-[1px] border-primaryYellow rounded-full p-1 h-9 w-9 flex items-center justify-center">
      <BookmarkIcon
        className="h-7 w-7 text-primaryYellow shadow-2xl cursor-pointer"
        style={{
          fill: likes?.includes(user.uid) ? "#FFE598" : null,
        }}
        onClick={handleLike}
      />
    </div>
  );
}