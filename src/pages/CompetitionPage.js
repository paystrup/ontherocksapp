
// Inspiration from https://youtu.be/_7gdsAfFV9o 
import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import CompetitionCarousel from '../components/CompetitionCarousel';

// Import Swiper styles + modules
import "swiper/css";

export default function ArticlesPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;
    
    const [compitition, setCompition] = useState([]);
    const params = useParams();
    console.log(params); //Returns the slug-name of the url you're navigated to
    const id = params.id; // and the ID

    // Fetch book data based on the id from the slug
    // This way we don't have to loop through the array
    // We can fetch directly from the ID in fireStore with queries
    // Dependency array listens for a new ID and rerenders

    // articles = our fireStore collection, id = the query
    useEffect(() => {
        const docRef = doc(db, "competitions", "featured", fetchLng, id);
        
        onSnapshot(docRef, (snapshot) => {
            setCompition({ ...snapshot.data(), id: snapshot.id });
        });
    }, [id, fetchLng, t]);


  return (
    <section className='my-14 px-5 mt-16 mb-32'>
        <div 
          className='h-96 rounded-b-[30px] flex items-end'
          style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${compitition?.headerImages?.src2})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
              }}>
        </div>

        <div className='mt-14'>
          <div className='mt-4'>
            <h2 className='text-3xl font-displayBook'>{compitition?.section1?.title}</h2>
            <p className='text-md mt-4 font-thin text-primaryGray-500'>{compitition?.section1?.body}</p>
          </div>
        </div>

        <div className='mt-6 text-md'>
          <ul className="list-disc px-4 text-primaryGray-500 leading-8">
            <li>{compitition?.section2?.steps?.step1}</li>
            <li>{compitition?.section2?.steps?.step2}</li>
            <li>{compitition?.section2?.steps?.step3}</li>
            <li>{compitition?.section2?.steps?.step4}</li>
          </ul>
          <p className='text-md mt-4 font-thin text-primaryGray-500'>{compitition?.section2?.body}</p>
        </div>

        <div>
          <h2 className='text-xl font-medium mb-7 pt-20'>{compitition?.section3?.title}</h2>
          <img className='w-full rounded-3xl h-56 flex flex-col justify-end ' src={compitition?.section3?.image?.src} alt={compitition?.section2?.image?.alt} onClick={() => navigate("/")}/>
        </div>

        <div>
          <h2 className='text-xl font-medium mb-7 pt-14'>{compitition?.section4?.title}</h2>
          <CompetitionCarousel/>
        </div>
          
      </section>


  )
}

