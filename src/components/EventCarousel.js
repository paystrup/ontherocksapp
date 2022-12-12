import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase imports for fetching
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebaseConfig";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles + modules
import "swiper/css";
import { Keyboard, Mousewheel, Pagination } from "swiper";
// Import components
import EventCarouselHeader from './EventCarouselHeader';
import { useTranslation } from 'react-i18next'

export default function EventCarousel() {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    // state for setting our fetched articles/books 
    const [events, setEvents] = useState([]);

    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;
    
    // fetch starts here
    useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, "events", "featured", fetchLng)

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for featured cocktails
    const q = query(articleRef);

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        // store data (setState) change state -> importing the array of books from the db
        setEvents(data);
        console.log(data);
    });
    }, [fetchLng, t]);

  return (
    <section className='my-14'>
        <EventCarouselHeader />
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
                pagination={{
                    clickable: true,
                }}
                modules={[Keyboard, Mousewheel, Pagination]}
                className="mySwiper smallCards w-full"
                breakpoints={{
                // when window width is >= 1px
                1: {
                    slidesPerView: "auto",
                    initialSlide: 0,
                }
            }}>
                {events.map(({id, title, time, taste, body, headerImage, slug, liqour}) => (
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
