import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DeleteTasteProfile({ id, tasteProfile }) {
  // authentication auth and db are found in the firestore config, ref to our projekt in firebase
  const [user] = useAuthState(auth);

  // reference to our FireStore db, collection = da, sort by ID of cocktails
  const likesRefDa = doc(db, "da", id);

  // for the onclick on delete
  const handleDeleteTasteProfileItem = () => {
    // if user already has added the cocktail, remove the uid from the addedToTasteProfile array
    // with updateDoc so we don't override other data
    if (tasteProfile?.includes(user.uid)) {
      updateDoc(likesRefDa, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("Deleted from tasteprofile");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return <div onClick={handleDeleteTasteProfileItem}>X</div>;
}
