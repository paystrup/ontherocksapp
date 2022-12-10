// Inspiration from https://youtu.be/_7gdsAfFV9o 
import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next'
import EventPageCard from '../components/EventPageCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
// Import Swiper styles + modules
import "swiper/css";

export default function ArticlesPage() {
    const navigate = useNavigate();
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
        const docRef = doc(db, "articles", "featured", fetchLng, id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id });
        });
    }, [id, fetchLng, t]);

  return (
    <div className='text-primaryWhite mt-16 mb-32'>
        <div 
          className='h-96 rounded-b-[30px] flex items-end'
          style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${article?.headerImage})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
              }}
        >

        </div>
        <div className='mt-14 px-5'>
          <div className='flex justify-between'>
            <div className='font-thin uppercase text-primaryYellow'>
              <p>{article?.subcategoryTitle}</p>
            </div>

            <div className='flex gap-3'>
              <div className='border-[1px] rounded-full p-1'>
                <PaperAirplaneIcon className='h-6 w-6 -rotate-45'/>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <h2 className='text-4xl font-displayBook'>{article?.section1?.title}</h2>
            <p className='text-md mt-4 font-thin text-primaryGray-500'>{article?.section1?.body}</p>
          </div>


          <div className='section2 my-7'>
            <h3 className='text-xl font-medium mb-2'>{article?.section2?.title}</h3>
            <p className='text-md font-thin text-primaryGray-500'>{article?.section2?.body}</p>
            {article?.section2?.image && (
              <img className='mt-14' src={article?.section2?.image?.src} alt={article?.section2?.image?.alt} />
            )}
            {article?.section2?.data && (
            <h1>Billeder fra slugs</h1>
            )}
          </div>

          <div className='section3 my-7'>
            <h3 className='text-xl font-medium mb-2'>{article?.section3?.title}</h3>
            <p className='text-md font-thin text-primaryGray-500'>{article?.section3?.body}</p>
            {article?.section3?.image && (
              <img className='mt-14' src={article?.section3?.image?.src} alt={article?.section2?.image?.alt} />
            )}
            {article?.section3?.data && (
            <h1>Billeder fra slugs</h1>
            )}
          </div>

          <div className='section4 my-7'>
            <h3 className='text-xl font-medium mb-2'>{article?.section4?.title}</h3>
            <p className='text-md font-thin text-primaryGray-500'>{article?.section4?.body}</p>
            {article?.section4?.data && (
            <h1>Billeder fra slugs</h1>
            )}
          </div>

          
          <div className='section4 my-7'>
            <h3 className='text-xl font-medium mb-2'>{article?.section5?.title}</h3>
            <p className='text-md font-thin text-primaryGray-500'>{article?.section5?.body}</p>
            
            {article?.section5?.data && (
              <h1>Billeder fra slugs</h1>
            )}


            
          </div>
              

            </div>
          </div>



  )
}