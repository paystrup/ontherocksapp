import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkIcon, ClockIcon } from "@heroicons/react/24/outline";
// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore"
import { db } from "../firebaseConfig";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles + modules
import "swiper/css";
import { Keyboard, Mousewheel, Pagination } from "swiper";
// Import components
import FeaturedCarouselHeader from './FeaturedCarouselHeader';
import { useTranslation } from 'react-i18next'

export default function FeaturedCarousel() {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    // state for setting our fetched articles/books 
    const [cocktails, setCocktails] = useState([]);

    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;
    
    // fetch starts here
    useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, fetchLng)

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for featured cocktails
    const q = query(articleRef, where("featured", "==", true));

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        // store data (setState) change state -> importing the array of books from the db
        setCocktails(data);
        console.log(data);
    });
    }, [fetchLng, t]);
  return (
    <section className='my-14 px-5'>
        <FeaturedCarouselHeader />
        <div className='flex gap-3'>
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
                className="mySwiper featuredCards w-full"
                breakpoints={{
                // when window width is >= 1px
                1: {
                    slidesPerView: "auto",
                    initialSlide: 0,
                }
            }}>

                    {cocktails.map(({id, title, time, taste, teaser, image, slug, liqour}) => (
                        <SwiperSlide
                            key={id}
                            className="w-8/12 rounded-[30px]" 
                            style={{
                                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                                backgroundPosition: "top",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                            onClick={() => navigate("/recipe/" + id)}
                        >
                            <div className='pb-3 flex w-full justify-between flex-col h-full'>
                                <div className='flex justify-between font-thin pl-2'>
                                    <div className='flex items-center gap-1'>
                                        <ClockIcon className='h-5'/>
                                        <p className='text-md'>
                                            {time} min
                                        </p>
                                    </div>
                                    <BookmarkIcon className='w-9'/> 
                                </div>
                                <div className='px-1'>
                                    <div className='flex gap-2 mb-3 text-xs font-regular'>
                                        <p className='border-[2px] px-4 py-1 rounded-full uppercase'>{taste?.title}</p>
                                        <p className='border-[2px] px-4 py-1 rounded-full uppercase'>{liqour?.type}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-2xl font-medium'>{title}</h3>
                                        <p className='text-md font-thin text-primaryGray-500 line-clamp-2'>
                                            {teaser}
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
