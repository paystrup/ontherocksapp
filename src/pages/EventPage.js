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

export default function EventPage() {
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
        const docRef = doc(db, "events", "featured", fetchLng, id);
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
            <h2 className='text-5xl font-displayBook'>{article?.title}</h2>
            <p className='text-base text-primaryGray-500 font-thin leading-relaxed mt-4'>
              {article?.body}
            </p>
            <div className='mt-7 font-thin text-md flex flex-col gap-2'>              
              <div className='my-7'>
                <h3 className='mb-2 text-xl font-medium'>{article?.slider1?.title}</h3>
                <p className='mb-7 text-md font-thin text-primaryGray-500'>{article?.slider1?.body}</p>
                
                <Swiper       
                    spaceBetween={20}
                    // centeredSlides={true}
                    grabCursor={true}
                    onSlideChange={() => console.log("slide change")}
                    keyboard={{
                        enabled: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Keyboard, Mousewheel, Pagination]}
                    className="mySwiper eventCards w-full"
                    breakpoints={{
                    // when window width is >= 1px
                    1: {
                        slidesPerView: "auto",
                        initialSlide: 0,
                    }
                }}>
                  <SwiperSlide>
                    <EventPageCard slug={article?.slider1?.slidedata?.slug1}/>
                  </SwiperSlide>

                
                </Swiper>
              </div>

              <div className='slider2 my-7'>
                <h3 className='text-xl font-medium mb-2'>{article?.slider2?.title}</h3>
                <p className='text-md font-thin text-primaryGray-500'>{article?.slider2?.body}</p>
              </div>

              <div className='slider3 my-7'>
                <h3 className='text-xl font-medium mb-2'>{article?.slider3?.title}</h3>
                <p className='text-md font-thin text-primaryGray-500'>{article?.slider3?.body}</p>
              </div>
              

            </div>
          </div>
        </div>
    </div>
  )
}