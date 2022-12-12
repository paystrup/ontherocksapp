import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClockIcon, BookmarkIcon } from "@heroicons/react/24/outline";

// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";

// Import Swiper React components + styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel } from "swiper";

// Import components
import FeaturedCarouselHeader from './FeaturedCarouselHeader';
import LikeCocktail from "./LikeCocktail";
import Spinanimation from "./Spinanimation";

// i18n language support
import { useTranslation } from 'react-i18next'

export default function FeaturedCarousel() {
    // authentication auth and db are found in the firestore config, ref to our projekt in firebase
    const [user] = useAuthState(auth);
    const { t, i18n } = useTranslation();

    // Define state for the loading indicator
    const [isLoading, setIsLoading] = useState(true);

    // Navigation
    const navigate = useNavigate();

    // state for setting our fetched articles/books 
    const [cocktails, setCocktails] = useState([]);

    // get current language selected for fetching the right collection in firestore
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

            // store data (setState) change state to contain cocktail dataset
            setCocktails(data);
            console.log(data);
            // Set isLoading to false -> hide loader anim
            setIsLoading(false);
        });
        
  
    }, [fetchLng, t]);

    // Show loading indicator while data is being fetched

  return (
    <section className='my-14'>
        <FeaturedCarouselHeader/>
        
        {isLoading && (
            <Spinanimation/>
        )}

        <div className='flex'>
            <Swiper       
                spaceBetween={20}
                // centeredSlides={true}
                grabCursor={true}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
                onSlideChange={() => console.log("slide change")}
                keyboard={{
                    enabled: true,
                }}
                modules={[Keyboard, Mousewheel]}
                className="mySwiper featuredCards w-full"
                breakpoints={{
                // when window width is >= 1px
                1: {
                    slidesPerView: "auto",
                    initialSlide: 0,
                }
            }}>
                {cocktails.map(({id, title, time, taste, teaser, image, slug, liqour, likes}) => (
                    <SwiperSlide
                        key={id}
                        className="bigCard w-8/12 rounded-[30px] bg-primaryBlack"
                    >
                        <div className='flex justify-between font-thin absolute items-start w-full px-5 py-4'>
                            <div className='flex items-center gap-1'>
                                <ClockIcon className='h-5'/>
                                <p className='text-md shadow-primaryBlack'>
                                    {time} min
                                </p>
                            </div>
                            {user && <LikeCocktail id={id} likes={likes} />}
                            {!user && (
                                <div className="bookmarkIcon bg-primaryBlack bg-opacity-60 rounded-full px-2 py-2 shadow-primaryBlack shadow-2xl">
                                    <BookmarkIcon
                                        className="h-7 w-7 text-primaryYellow shadow-2xl"
                                        style={{
                                        cursor: "pointer"
                                        }}
                                        onClick={() => navigate("/likes")}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='flex w-full justify-end flex-col h-full rounded-[30px] px-3 pb-5'
                            style={{
                                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                                backgroundPosition: "top",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                            onClick={() => navigate("/recipe/" + id)}
                        >
                
        
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
