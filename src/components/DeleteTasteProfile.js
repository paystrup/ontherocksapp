import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteTasteProfile({ id }) {
  // authentication auth and db are found in the firestore config, ref to our projekt in firebase
  const [user] = useAuthState(auth);

  // reference to our FireStore db, collection = da, sort by ID of cocktails
  const likesRefDa = doc(db, "da", id);

  // for the onclick on delete
  const handleDeleteTasteProfileItem = () => {
      if (id === true) {
        updateDoc(likesRefDa, {
          addedToTasteProfile: arrayRemove(user.uid),
        })
        .then(() => {
          console.log("Deleted from tasteprofile");
        })
        .catch((e) => {
          console.log(e);
        });
      }
      else {
        console("no id")
      };
  }

  return (

      <div onClick={handleDeleteTasteProfileItem}>
        <TrashIcon className="h-7 w-7"/>
      </div>
  );
}
