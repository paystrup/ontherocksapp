// inspiration from https://github.com/voranzovv/my-article/tree/main/src/components
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function LikeCocktail({ id, likes }) {
  // authentication auth and db are found in the firestore config, ref to our projekt in firebase
  const [user] = useAuthState(auth);

  // reference to our FireStore db, collection = articles, sort by ID of posts / books
  const likesRefDa = doc(db, "da", id);
  const likesRefEn = doc(db, "en", id);

  // best solution would be to create a new collection in Firebase
  // containing all likes + data from the cocktail liked to fetch later
  // to-do 😎

  // for the onclick on like
  const handleLike = () => {
    // if user already has liked the book, remove the uid from the likes array
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

  // if likes includes id = true, turn the heart/like button to green, if not keep original styling
  // onclick uses the function above
  return (
    <div className="bg-primaryBlack bg-opacity-60 rounded-full px-2 py-2 shadow-primaryBlack shadow-2xl">
      <BookmarkIcon
        className="h-7 w-7 text-primaryYellow shadow-2xl"
        style={{
          cursor: "pointer",
          fill: likes?.includes(user.uid) ? "#FFE598" : null,
        }}
        onClick={handleLike}
      />
    </div>
  );
}