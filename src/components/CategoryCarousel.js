import React, { useEffect, useState } from "react";
// firebase imports for fetching
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles + modules
import "swiper/css";
import { Keyboard, Mousewheel, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { ClockIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import LikeCocktail from "./LikeCocktail";
import Spinanimation from "./Spinanimation";

export default function CategoryCarousel({ layout }) {
  // -> PROPS from layout selection imported, to show grid or list layout onclick
  const navigate = useNavigate();

  // authentication
  const [user] = useAuthState(auth);
  // Import translations
  const { t, i18n } = useTranslation();

  // Define state for the loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // For changing fetch queries in Firestore
  // Default -> loads featured (most popular) recipes
  // ✨ TODO: add featured 1-10 scale and sort by asc ✨
  const [fetchCategory, setFetchCategory] = useState(true);
  const [fetchQuery, setFetchQuery] = useState("featured");

  // change category onclick
  const handleCategory = (category) => {
    setFetchCategory(category);
    console.log(fetchCategory);
  };

  // change key onclick
  const handleQuery = (query) => {
    setFetchQuery(query);
    console.log(fetchQuery);
  };

  // State with empty array for setting our fetched cocktail data
  const [events, setEvents] = useState([]);

  // fetch depending on i18n language chosen, choose db collection in firestore
  const fetchLng = i18n.language;

  // -----------------------------> fetch starts here <---------------------------------
  useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, fetchLng);

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for featured cocktails
    const q = query(articleRef, where(fetchQuery, "==", fetchCategory));

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // store data (setState) change state -> importing the array of books from the db
      setEvents(data);
      console.log(data);

      // Set isLoading to false -> hide loader anim
      setIsLoading(false);
    });
  }, [fetchLng, t, fetchCategory, fetchQuery]);

  return (
    <section className="my-6">
      <div>
        {/* RUN LOADING ANIM WHILE FETCHING */}
        {isLoading && (
          <Spinanimation />
        )}

        {/* CATEGORY CAROUSEL FOR FILTERING  */}
        <Swiper
          spaceBetween={0}
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
          className="categorySlider mySwiper w-full"
          breakpoints={{
            // when window width is >= 1px
            1: {
              slidesPerView: "auto",
              initialSlide: 0,
            },
          }}
        >
          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory(true);
              handleQuery("featured");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin focus:bg-primaryYellow">
                Populære
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory("velkomst");
              handleQuery("theme.slug");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin">
                Velkomst
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory("middag");
              handleQuery("theme.slug");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin">
                Middag
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory("hygge");
              handleQuery("theme.slug");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin">
                Til hyggen
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory("fest");
              handleQuery("theme.slug");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin">
                Til festen
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory("romantik");
              handleQuery("theme.slug");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin">
                Romantik
              </h3>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="py-1 cursor-pointer"
            onClick={() => {
              handleCategory("afslapning");
              handleQuery("theme.slug");
            }}
          >
            <div>
              <h3 className="text-base text-primaryGray-700 font-thin">
                Afslapning
              </h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* EMPTY STATE IF DATA IS EMPTY */}
      {events.length === 0 && (
        <div className="fadeInAnimation px-5 mt-16 font-thin text-primaryGray-500 text-center">
          <h2 className="text-xl">Der blev ikke fundet nogle cocktails 😥</h2>
          <p className="mt-2 text-base ">Prøv at bruge et andet filter</p>
        </div>
      )}

      {/* IF RESULTS ARE SHOW, SHOW LENGTH 
            🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 TODO FIX POPULAR CATEGORY
        */}
      {events.length > 0 && (
        <div className="fadeInAnimation px-5 mt-7 font-thin text-primaryGray-500">
          <h2 className="text-xl">
            {events.length} resultater for "{fetchCategory}"
          </h2>
        </div>
      )}

      {/* IF LAYOUT IS CHANGED OR LIST CHOSEN = LIST  */}
      {layout && (
        <div className="px-5 mt-7">
          {events.map(({ title, id, likes, image, body, taste, liqour }) => (
            <div className="fadeInAnimation h-44 w-full mb-4 relative" key={id}>
              <div className="flex justify-between font-thin absolute items-start w-full px-5 py-4">
                <div className="flex gap-2 text-xs font-regular">
                  <p className="bg-primaryBlack bg-opacity-50 px-4 py-1 rounded-xl uppercase">
                    {taste?.title}
                  </p>
                  <p className="bg-primaryBlack bg-opacity-50 px-4 py-1 rounded-xl uppercase">
                    {liqour?.type}
                  </p>
                </div>
                {user && <LikeCocktail id={id} likes={likes} />}

                {/* IF NO USER SHOW BOOKMARK BUTTON WITH REDIRECT TO LIKES PAGE WITH ONBOARDING */}
                {!user && (
                  <div className="bookmarkIcon bg-primaryBlack bg-opacity-60 rounded-full px-2 py-2 shadow-primaryBlack shadow-2xl">
                    <BookmarkIcon
                      className="h-7 w-7 text-primaryYellow shadow-2xl"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/likes")}
                    />
                  </div>
                )}
              </div>

              <div
                className="flex w-full justify-end flex-col h-full rounded-2xl px-3 pb-5"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => navigate("/recipe/" + id)}
              >
                <div className="px-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-medium">{title}</h3>
                    <p className="line-clamp-1 text-sm font-regular text-primaryGray-500">
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IF LAYOUT IS CHANGED OR DEFAULT = GRID  */}
      {!layout && (
        <div className="px-5 mt-7 flex flex-wrap gap-4 justify-between">
          {events.map(
            ({ title, id, likes, image, body, time, taste, liqour }) => (
              <div
                className="fadeInAnimation h-60 max-w-[46%] relative"
                key={id}
              >
                <div className="flex justify-between font-thin absolute items-start w-full px-3 py-3">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3" />
                    <p className="text-xs shadow-primaryBlack">{time} min</p>
                  </div>
                  {user && <LikeCocktail id={id} likes={likes} />}

                  {/* IF NO USER SHOW BOOKMARK BUTTON WITH REDIRECT TO LIKES PAGE WITH ONBOARDING */}
                  {!user && (
                    <div className="bookmarkIcon bg-primaryBlack bg-opacity-60 rounded-full px-2 py-2 shadow-primaryBlack shadow-2xl">
                      <BookmarkIcon
                        className="h-7 w-7 text-primaryYellow shadow-2xl"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/likes")}
                      />
                    </div>
                  )}
                </div>

                <div
                  className="flex w-full justify-end flex-col h-full rounded-2xl px-3 pb-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => navigate("/recipe/" + id)}
                >
                  <div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 text-xs font-regular">
                        <p className="border-[1px] px-4 py-1 rounded-xl uppercase">
                          {taste?.title}
                        </p>
                      </div>

                      <h3 className="text-base font-medium">{title}</h3>
                      <p className="line-clamp-1 text-xs font-regular text-primaryGray-500">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
