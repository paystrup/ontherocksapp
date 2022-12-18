import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase imports for fetching
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebaseConfig";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles + modules
import "swiper/css";
import { Keyboard, Mousewheel } from "swiper";
// Import components
import EventCarouselHeader from './EventCarouselHeader';
import { useTranslation } from 'react-i18next'

export default function EventCarousel() {
    const { t, i18n } = useTranslation(); // import translations from i18n
    const navigate = useNavigate(); // import navigation from react router
    
    const [events, setEvents] = useState([]); // state for setting our fetched events

    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;
    
     // Fetch starts here -> useEffect so dependency array checks for changes and rerenders -> fx. for language change, updated content etc.
    useEffect(() => {
    // collection from firebase
    // db is our database, go to "articles" collection, document "featured", "fetchLng" = da/en collection depending on chosen language
    const articleRef = collection(db, "events", "featured", fetchLng)

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    const q = query(articleRef);

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        // store data (setState) change state -> importing the array of events from the db
        setEvents(data);
        console.log(data);
    });
    }, [fetchLng, t]);

  return (
    <section className='my-14 lg:my-32'>
        <EventCarouselHeader />
         {/* MAP THROUGH DATA AND DISPLAY THE events as slides -> destructured, to save space */}
        <div className='flex gap-3'>
            <Swiper       
                spaceBetween={20}
                // centeredSlides={true}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
                grabCursor={true}
                onSlideChange={() => console.log("slide change")}
                keyboard={{
                    enabled: true,
                }}
                modules={[Keyboard, Mousewheel]}
                className="mySwiper smallCards w-full lg:h-96"
                breakpoints={{
                // when window width is >= 1px
                1: {
                    slidesPerView: "auto",
                    initialSlide: 0,
                },
                1280: {
                    slidesPerView: 3,
                    initialSlide: 0,
                    slidesOffsetBefore: "56",
                    spaceBetween: 25,
                },
                1500: {
                    slidesPerView: 3,
                    initialSlide: 0,
                    slidesOffsetBefore: "56",
                    spaceBetween: 25,
                },

            }}>
                
                {events.map(({id, title, body, headerImage}) => (
                    <SwiperSlide
                        key={id}
                        className="w-2/3 rounded-[24px]" 
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${headerImage})`,
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}
                        onClick={() => navigate("/events/" + id)}
                    >
                        <div className='pb-2 pt-2 flex w-full justify-between flex-col h-full'>
                            <div></div>
                            <div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='text-xl font-regular'>{title}</h3>
                                    <p className='text-sm font-thin text-primaryGray-500 line-clamp-2'>
                                        {body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    </section>
  )
}
