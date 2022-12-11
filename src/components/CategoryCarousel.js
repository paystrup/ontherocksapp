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
import { ClockIcon, BookmarkIcon, AdjustmentsVerticalIcon, Bars4Icon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import LikeCocktail from "./LikeCocktail";
import Spinanimation from "./Spinanimation";
import filters from "../lng/filters.json"

export default function CategoryCarousel() {
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

  // State for displaying search query
  // by default popular is fetched -> display dynamic with lng support
  const [searchDisplay, setsearchDisplay] = useState(t("categories.popular"));

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

  // change display search
  const handleSearchDisplay = (searched) => {
    setsearchDisplay(searched);
    console.log(searchDisplay);
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


  // Values for the category slider, querydata for fetching from firebase on click
  // Dynamic translations with title -> refers to i18n json data
  const categories = [
    {
      "id": "1",
      "title": "categories.popular",
      "category": true,
      "query": "featured"
    },
    {
      "id": "2",
      "title": "categories.welcome",
      "category": "velkomst",
      "query": "theme.slug"
    },
    {
      "id": "3",
      "title": "categories.dinner",
      "category": "middag",
      "query": "theme.slug"
    },
    {
      "id": "4",
      "title": "categories.hygge",
      "category": "hygge",
      "query": "theme.slug"
    },
    {
      "id": "5",
      "title": "categories.party",
      "category": "fest",
      "query": "theme.slug"
    },
    {
      "id": "6",
      "title": "categories.romance",
      "category": "romantik",
      "query": "theme.slug"
    },
    {
      "id": "7",
      "title": "categories.relaxing",
      "category": "afslapning",
      "query": "theme.slug"
    }
  ]

  const [changeLayout, setChangeLayout] = useState(false);

  const handleLayoutChange = (event) => {
    setChangeLayout(!changeLayout);
    console.log(changeLayout);
  }

  // state for opening filter modal
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = (event) => {
    setOpenFilter(!openFilter)
  }

  return (
    <section className="my-6">
      <div>
        {/* RUN LOADING ANIM WHILE FETCHING */}
        {isLoading && (
          <Spinanimation />
        )}

        {/* FILTER MODAL OPENS BY SETTING OPENFILTER STATE ONCLICK FILTER BTN */}
        {openFilter && (
          <div id='filterModal' className='fixed z-[9999] overflow-y-scroll overflow-x-hidden top-0 left-0 h-full w-full bg-primaryBlack px-6'>
            <div className='flex items-center justify-center mt-4'>
              <XMarkIcon className='h-10 w-10' onClick={handleFilterOpen}/>
            </div>

            {/* FILTERS FOR MODAL STARTS HERE -> imported from /lng/filters.json - HIGHLIGTING FOR THE CLICKED + FETCHED CATEGORY BY CHECKING IF THE SET STATE MATCHES THE CATEGORY*/}
            <div className='flex flex-col mt-14'>
              {filters.map(({ title, id, data }) => 
                  <div key={id}>
                    <h3 className='text-xl font-medium mb-4'>{t(title)}</h3>
                    <div className="flex flex-wrap mb-7">
                        {data.map(({ id, title, category, query }) =>
                          <div
                            className="py-1 px-1 cursor-pointer"
                            onClick={() => {
                              handleCategory(category);
                              handleQuery(query);
                              handleSearchDisplay(title);
                              handleFilterOpen();
                            }}
                            key={id}
                          >
                            <button className={fetchCategory === category ?"bg-primaryYellow px-3 py-1 rounded-lg text-primaryBlack" : "border-[1px] px-3 py-1 rounded-lg"}>
                              <h3 className="text-base font-regular">
                                {t(title)}
                              </h3>
                            </button>
                          </div>       
                        )}
                    </div>
                  </div>
              )}               

              <h3 className='text-xl font-medium'>Tid</h3>
            </div>
          </div>
        )}
        

        {/* FILTER MODAL BTN AND CHANGE LAYOUT BTN */}
        <div className='px-6 mb-4'>
          <div className='flex justify-between items-center mt-14'>
            <button className='text-primaryYellow uppercase border-[1.2px] rounded-xl px-5 py-[0.2rem]'>
              <div className='flex gap-1 text-sm justify-center items-center' onClick={handleFilterOpen}>
                <AdjustmentsVerticalIcon className='h-6 w-6' />
                <p>{t("searchpage.filter")}</p>
              </div>
            </button>

            {!changeLayout &&
              <button 
                className='items-center justify-center text-sm flex gap-1'
                onClick={() => handleLayoutChange()}
              >
                <Bars4Icon className='h-6 w-6'/>
                <p className='uppercase text-primaryGray-500'>{t("searchpage.list")}</p>
              </button>
            }

            {changeLayout &&
              <button 
                className='items-center justify-center text-sm flex gap-1'
                onClick={() => handleLayoutChange()}
              >
                <Squares2X2Icon className='h-6 w-6'/>
                <p className='uppercase text-primaryGray-500'>{t("searchpage.grid")}</p>
              </button>
            }
          </div>
        </div>        

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

          {/* 
            MAP THROUGH CATEGORIES AND CHANGE FETCH DEPENDING ON CATEGORY ONCLICK 
            IF CATEGORY IS IN STATE = IS FETCHED = IS CLICKED = SHOW UX STYLING
          */}
          {categories.map(({ id, title, category, query}) =>
            <SwiperSlide
              className="py-1 cursor-pointer"
              onClick={() => {
                handleCategory(category);
                handleQuery(query);
                handleSearchDisplay(title);
              }}
              key={id}
            >
              <div>
                <h3 className={fetchCategory === category ? "text-base font-regular text-primaryWhite": "text-base text-primaryGray-700 font-thin focus:bg-primaryYellow"}>
                  {t(title)}
                </h3>

                {fetchCategory === category && (
                  <div className="slideIn mt-2 w-10 h-0.5 bg-primaryYellow"></div>
                )}
                
              </div>
            </SwiperSlide>
          )}

        </Swiper>
      </div>

      {/* EMPTY STATE IF DATA IS EMPTY */}
      {events.length === 0 && (
        <div className="fadeInAnimation px-5 mt-16 font-thin text-primaryGray-500 text-center">
          <h2 className="text-xl">"{t(searchDisplay)}" {t("searchpage.resultsEmptyStateTop")}</h2>
          <p className="mt-2 text-base">{t("searchpage.resultsEmptyStateBottom")}</p>
        </div>
      )}

      {/* IF RESULTS ARE SHOW, SHOW LENGTH + TITLE FOR FETCHED QUERY + LNG SUPPORT */}
      {events.length > 0 && (
        <div className="fadeInAnimation px-5 mt-7 font-thin text-primaryGray-500">
          <h2 className="text-xl">
            {events.length} {t("searchpage.resultsText")} "{t(searchDisplay)}"
          </h2>
        </div>
      )}

      {/* IF LAYOUT IS CHANGED OR LIST CHOSEN / LAYOUT TRUE = LIST  */}
      {changeLayout && (
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

      {/* IF LAYOUT IS CHANGED OR DEFAULT - LAYOUT = FALSE  = GRID  */}
      {!changeLayout && (
        <div className="px-5 mt-7 flex flex-wrap gap-4 justify-between">
          {events.map(
            ({ title, id, likes, image, body, time, taste }) => (
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
