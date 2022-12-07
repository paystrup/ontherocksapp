// Inspiration from https://youtu.be/_7gdsAfFV9o 
import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BookmarkIcon, ClockIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next'

export default function CocktailPage() {
    const { t, i18n } = useTranslation();
    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;
    
    const [article, setArticle] = useState([]);
    const params = useParams();
    console.log(params); //Returns the slug-name of the url you're navigated to
    const id = params.id; // and the ID

    // Fetch book data based on the id from the slug
    // This way we don't have to loop through the array
    // We can fetch directly from the ID in fireStore with queries
    // Dependency array listens for a new ID and rerenders

    // articles = our fireStore collection, id = the query
    useEffect(() => {
        const docRef = doc(db, fetchLng, id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id });
        });
    }, [id, fetchLng, t]);

  return (
    <div className='text-primaryWhite mt-16 mb-32'>
        <div 
          className='h-96 rounded-b-[30px] flex items-end'
          style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${article?.image?.srcMin})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
              }}
        >
          <div className='flex gap-2 font-regular px-5 py-8'>
            <p className='uppercase text-sm border-[1.2px] rounded-xl py-1 px-5'>{article?.taste?.title}</p>
            <p className='uppercase text-sm border-[1.2px] rounded-xl py-1 px-5'>{article?.liqour?.type}</p>
          </div>

        </div>
        <div className='mt-14 px-5'>
          <div className='flex justify-between'>
            <div className='flex gap-1 items-center font-thin text-primaryYellow'>
              <ClockIcon className='h-5 w-5'/>
              <p>{article?.time} min</p>
            </div>

            <div className='flex gap-3'>
              <div className='border-[1px] rounded-full p-1'>
                <PaperAirplaneIcon className='h-6 w-6 -rotate-45'/>
              </div>

              <div className='border-[1px] rounded-full p-1'>
                <BookmarkIcon className='h-6 w-6'/>
              </div>
            </div>
          </div>

          <div className='mt-7'>
            <h2 className='text-5xl font-displayBook'>{article?.title}</h2>
            <p className='text-base text-primaryGray-500 font-thin leading-relaxed mt-4 line-clamp-4'>
              {article?.body}
            </p>
            <p>... Læs mere</p>
            <div className='mt-6 font-thin text-md flex flex-col gap-2'>
              <div className='flex justify-between'>
                <p>{article?.ingredients?.liqour?.amount}</p>
                <a className='font-regular uppercase w-5/6 underline underline-offset-4 decoration-primaryYellow' href={article?.ingredients?.liqour?.link}>{article?.ingredients?.liqour?.title}</a>
              </div>

              {article?.ingredients?.first &&
                <div className='flex justify-between'>
                  <p>{article?.ingredients?.first?.amount}</p>
                  <p className='uppercase w-5/6'>{article?.ingredients?.first?.title}</p>
                </div>
              }

              <div className='flex justify-between'>
                <p>{article?.ingredients?.second?.amount}</p>
                <p className='uppercase w-5/6'>{article?.ingredients?.second?.title}</p>
              </div>
              <div className='flex justify-between'>
                <p>{article?.ingredients?.third?.amount}</p>
                <p className='uppercase w-5/6'>{article?.ingredients?.third?.title}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
