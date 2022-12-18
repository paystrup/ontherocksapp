// TODO -> fix this function -> currently not used
// Same principals as the like function
// Go to the array, delete the array with the user id authenticated


import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteTasteProfile({ id }) {
  // authentication auth and db are found in the firestore config, ref to our projekt in firebase
  const [user] = useAuthState(auth);

  // // reference to our FireStore db, collection = da, sort by ID of cocktails
  // const likesRefDa = doc(db, "da", id);

  // // for the onclick on delete
  // const handleDeleteTasteProfileItem = () => {
  //     if (id === true) {
  //       updateDoc(likesRefDa, {
  //         addedToTasteProfile: arrayRemove(user.uid),
  //       })
  //       .then(() => {
  //         console.log("Deleted from tasteprofile");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //     }
  //     else {
  //       console("no id")
  //     };
  // }

  return (

      <div className="bg-primaryBlack bg-opacity-70 text-primaryWhite text- rounded-full px-2 py-2">
        <TrashIcon className="h-6 w-6"/>
      </div>
  );
}
