import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeCocktail from "./LikeCocktail.js";

export default function ProfilePageFavoritesMap({ articles, sliceAmount }) {
  // props imported from FavouritePost.js -> to show and hide amount of cocktails shown
  const navigate = useNavigate(); // navigation
  const [user] = useAuthState(auth); // authentication

  // display users favourites
  // map through data and slice
  return (
    <>
      {articles.map(
        ({ id, image, title, likes }) =>
          likes?.includes(auth.currentUser.uid) && (
            <div className="h-52 max-w-[100%] relative cursor-pointer" key={id}>
              <div className="flex justify-end font-thin absolute items-start w-full px-5 py-4">
                {user && <LikeCocktail id={id} likes={likes} />}
              </div>
              <div
                className="flex w-full justify-end flex-col h-52 rounded-2xl px-3 pb-5"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => navigate("/recipe/" + id)}
              >
                <div className="px-2">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-medium">{title}</h3>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
}
