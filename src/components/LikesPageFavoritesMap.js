import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeCocktail from "./LikeCocktail.js";
import { useTranslation } from 'react-i18next'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export default function LikesPageFavoritesMap({ articles }) {
  // props imported from FavouritePost.js
  const navigate = useNavigate();

  // authentication
  const [user] = useAuthState(auth);

  // display users favourites
  return (
    <>
      <div className="md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-[5vw] lg:gap-[2vw] grid mb-14 justify-between">
        {articles.map(
          ({ id, image, title, time, liqour, taste, teaser, likes }) =>
            likes?.includes(auth.currentUser.uid) && (
              <div className="md:h-96 h-52 w-full mb-4 relative" key={id}>
                  <div className='flex justify-end font-thin absolute items-start w-full px-5 py-4'>
                      {user && <LikeCocktail id={id} likes={likes} />}
                  </div>
                  <div className='flex w-full justify-end flex-col h-full rounded-2xl px-3 pb-5'
                      style={{
                          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat"
                      }}
                      onClick={() => navigate("/recipe/" + id)}
                  >
          

                      <div className='px-2'>
                          <div className='flex flex-col gap-2'>
                              <h3 className='text-xl md:text-2xl font-medium'>{title}</h3>
                          </div>
                      </div>
                          </div>
              </div>
            )
        )}
      </div>
    </>
  );
}