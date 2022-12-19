import React, { useEffect, useState } from "react";
// firebase imports for fetching
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles + modules
import "swiper/css";
import { Keyboard, Mousewheel } from "swiper";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  ClockIcon,
  BookmarkIcon,
  AdjustmentsVerticalIcon,
  Bars4Icon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// i18n language support
import { useTranslation } from "react-i18next";

// Like function
import LikeCocktail from "./LikeCocktail";

// Loading Animation for the loading state while fetching
import Spinanimation from "./Spinanimation";

// Importing filters + titles + lng support for the filters
import filters from "../lng/filters.json";



// this could have been made into more components
// TODO -> time has been prioritized differently -> as it works now 🌞
export default function CategoryCarousel() {
  const navigate = useNavigate();

  // Google Authentication + userdata
  const [user] = useAuthState(auth);

  const { t, i18n } = useTranslation(); // import translations from i18n

  // Define state for the loading indicator, by default set to true
  const [isLoading, setIsLoading] = useState(true);

  // For changing fetch queries in Firestore
  // Default -> loads featured (most popular) recipes
  // ✨ TODO: add featured 1-10 popularity scale and sort by asc ✨
  const [fetchCategory, setFetchCategory] = useState(true);
  const [fetchQuery, setFetchQuery] = useState("featured");

  // State for displaying search query
  // by default popular is fetched -> display dynamic with lng support
  // this is only the display value -> doesn't fetch from this value -> as it's kept in danish to asure lng support
  const [searchDisplay, setsearchDisplay] = useState(t("categories.popular"));

  // Change category onclick a category
  const handleCategory = (category) => {
    setFetchCategory(category);
    console.log(fetchCategory);
  };

  // Change key onclick
  const handleQuery = (query) => {
    setFetchQuery(query);
    console.log(fetchQuery);
  };

  // Change display search
  const handleSearchDisplay = (searched) => {
    setsearchDisplay(searched);
    console.log(searchDisplay);
  };

  // State with empty array for setting our fetched cocktail data
  const [events, setEvents] = useState([]);

  // fetch depending on i18n language chosen, choose db collection in firestore
  const fetchLng = i18n.language;

  // -----------------------------> fetch starts here <---------------------------------
  // Fetch starts here -> useEffect so dependency array checks for changes and rerenders -> fx. for language change, updated content etc.
  // + new categories or queries so it fetches new data
  useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, fetchLng);

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // db is our database, go to "articles" collection, document "featured", "fetchLng" = da/en collection depending on chosen language
    const q = query(articleRef, where(fetchQuery, "==", fetchCategory));

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // store data (setState) change state -> importing cocktails
      setEvents(data);
      console.log(data);

      // Set isLoading to false -> hide loader anim
      setIsLoading(false);
    });
  }, [fetchLng, t, fetchCategory, fetchQuery]);

  // Values for the category slider, querydata for fetching from firebase on click
  // Dynamic translations with title -> refers to i18n json data
  // title from i18n lng -> results shown and titles changes with language change in i18n
  // query is for firebase q
  // category is the value in firebase
  // example .where(query, "==", category)
  const featuredCategories = [
    {
      id: "1",
      title: "categories.popular",
      category: true,
      query: "featured",
    },
    {
      id: "100",
      title: "categories.christmas",
      category: "jul",
      query: "ocassion.slug",
    },
    {
      id: "99",
      title: "categories.newyears",
      category: "nytår",
      query: "ocassion.slug",
    },
    {
      id: "2",
      title: "categories.welcome",
      category: "velkomst",
      query: "theme.slug",
    },
    {
      id: "3",
      title: "categories.dinner",
      category: "middag",
      query: "theme.slug",
    },
    {
      id: "4",
      title: "categories.hygge",
      category: "hygge",
      query: "theme.slug",
    },
    {
      id: "5",
      title: "categories.party",
      category: "fest",
      query: "theme.slug",
    },
    {
      id: "6",
      title: "categories.romance",
      category: "romantik",
      query: "theme.slug",
    },
    {
      id: "7",
      title: "categories.relaxing",
      category: "afslapning",
      query: "theme.slug",
    }
  ];

  // state for chaning layout between grid + list
  const [changeLayout, setChangeLayout] = useState(false);

  // run when layout changes, set the state to the opposite of the current value
  const handleLayoutChange = (event) => {
    setChangeLayout(!changeLayout);
    console.log(changeLayout);
  };

  // state for opening filter modal
  const [openFilter, setOpenFilter] = useState(false);

  // onclick sets value to the opposite -> if open -> close -> open
  const handleFilterOpen = (event) => {
    setOpenFilter(!openFilter);
  };

  return (
    <section className="my-6 fadeInAnimation">
      <div>
        {/* RUN LOADING ANIM WHILE FETCHING */}
        {isLoading && <Spinanimation />}

        {/* FILTER MODAL OPENS BY SETTING OPENFILTER STATE ONCLICK FILTER BTN */}
        {openFilter && (
          <div
            id="filterModal"
            className="fixed z-[9999] overflow-y-scroll overflow-x-hidden top-0 left-0 h-full w-full bg-primaryBlack px-6 pb-32 lg:px-14"
          >
            <div className="flex items-center justify-center mt-4">
              <XMarkIcon
                className="h-10 w-10 cursor-pointer hover:opacity-50 transition-all"
                onClick={handleFilterOpen}
              />
            </div>

            {/* FILTERS FOR MODAL STARTS HERE -> imported from /lng/filters.json - HIGHLIGTING FOR THE CLICKED + FETCHED CATEGORY BY CHECKING IF THE SET STATE MATCHES THE CATEGORY*/}
            <div className="flex flex-col gap-6 lg:gap-12 mt-14 lg:mt-28">
              {filters.map(({ title, id, data }) => (
                <div key={id}>
                  <h3 className="text-xl font-medium mb-4 lg:text-2xl">{t(title)}</h3>
                  <div className="flex flex-wrap">
                    {data.map(({ id, title, category, query }) => (
                      <div
                        className="py-1 px-1 cursor-pointer"
                        onClick={() => {
                          handleCategory(category);
                          handleQuery(query);
                          handleSearchDisplay(title);
                        }}
                        key={id}
                      >
                        <button
                          className={
                            fetchCategory === category
                              ? "bg-primaryYellow px-3 py-1 rounded-lg text-primaryBlack uppercase font-thin"
                              : "border-[1px] px-3 py-1 rounded-lg uppercase font-thin"
                          }
                        >
                          <h3 className="text-base font-regular">{t(title)}</h3>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div
                className="px-6 pt-4 fixed bottom-0 left-0 w-full"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,1) 84%)`,
                }}
              >
                <div className="flex gap-2 mb-7">
                  <button
                    onClick={() => {
                      handleCategory(true);
                      handleQuery("featured");
                      handleSearchDisplay(t("categories.popular"));
                    }} 
                  className='w-full border-2 py-3 rounded-2xl border-primaryYellow text-primaryYellow font-regular bg-primaryBlack'>
                    {t("searchpage.filterModalResetBtn")}
                  </button>
                  <button
                    onClick={handleFilterOpen}
                    className="w-full py-3 rounded-2xl  text-primaryBlack font-regular bg-primaryYellow"
                  >
                    {t("searchpage.filterModalApplyBtn")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FILTER MODAL BTN AND CHANGE LAYOUT BTN */}
        <div className="px-5 mb-4 lg:px-14">
          <div className="flex justify-between items-center mt-14 lg:mt-32">
            <button className="text-primaryYellow uppercase border-[1.2px] rounded-xl px-5 py-[0.2rem]">
              <div
                className="flex gap-1 text-sm justify-center items-center"
                onClick={handleFilterOpen}
              >
                <AdjustmentsVerticalIcon className="h-6 w-6" />
                <p>{t("searchpage.filter")}</p>
              </div>
            </button>

            {!changeLayout && (
              <button
                className="items-center justify-center text-sm flex gap-1"
                onClick={() => handleLayoutChange()}
              >
                <Bars4Icon className="h-6 w-6" />
                <p className="uppercase text-primaryGray-500">
                  {t("searchpage.list")}
                </p>
              </button>
            )}

            {changeLayout && (
              <button
                className="items-center justify-center text-sm flex gap-1"
                onClick={() => handleLayoutChange()}
              >
                <Squares2X2Icon className="h-6 w-6" />
                <p className="uppercase text-primaryGray-500">
                  {t("searchpage.grid")}
                </p>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY CAROUSEL FOR FILTERS  */}
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
          modules={[Keyboard, Mousewheel]}
          className="categorySlider mySwiper w-full"
          breakpoints={{
            // when window width is >= 1px
            1: {
              slidesPerView: "auto",
              initialSlide: 0,
              slideToClickedSlide: true,
              
            },
            1024: {
              slidesPerView: 6,
              slidesOffsetBefore: "56",
              spaceBetween: 25
            },
            1500: {
              slidesPerView: 6,
              initialSlide: 0,
              slidesOffsetBefore: "56",
              slidesOffsetAfter: "56",
              spaceBetween: 0,
              slideToClickedSlide: false,
              pagination: false,
              keyboard: false,
              grabCursor: false,
              enabled: false
            },
          }}
        >
          {/* 
            MAP THROUGH CATEGORIES AND CHANGE FETCH DEPENDING ON CATEGORY ONCLICK 
            IF CATEGORY IS IN STATE = IS FETCHED = IS CLICKED = SHOW UX STYLING
          */}
          {featuredCategories.map(({ id, title, category, query }) => (
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
                <h3
                  className={
                    fetchCategory === category
                      ? "text-base font-regular text-primaryWhite"
                      : "text-base text-primaryGray-700 font-thin focus:bg-primaryYellow"
                  }
                >
                  {t(title)}
                </h3>

                {fetchCategory === category && (
                  <div className="slideIn mt-2 w-10 h-0.5 bg-primaryYellow"></div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* EMPTY STATE IF DATA IS EMPTY */}
      {events.length === 0 && (
        <div className="fadeInAnimation px-5 mt-16 font-thin text-primaryGray-500 text-center">
          <h2 className="text-xl">
            "{t(searchDisplay)}" {t("searchpage.resultsEmptyStateTop")}
          </h2>
          <p className="mt-2 text-base">
            {t("searchpage.resultsEmptyStateBottom")}
          </p>
        </div>
      )}

      {/* IF RESULTS ARE SHOWN, SHOW LENGTH + TITLE FOR FETCHED QUERY + LNG SUPPORT */}
      {events.length > 0 && (
        <div className="fadeInAnimation px-5 mt-7 font-thin text-primaryGray-500 lg:px-14 lg:mt-10">
          <h2 className="text-xl lg:text-2xl">
            {events.length} {t("searchpage.resultsText")} "{t(searchDisplay)}"
          </h2>
        </div>
      )}

      {/* IF LAYOUT IS CHANGED OR LIST CHOSEN / LAYOUT TRUE = LIST  */}
      {changeLayout && (
        <div className="px-5 mt-7 lg:px-14">
            {events.map(({ title, id, likes, image, body, taste, liqour, first, second, third, ingredients }) => (
              <div className="md:flex md:flex-row-reverse md:justify-between md:bg-primaryGray-200 md:gap-18 lg:gap-20 md:my-12 md:rounded-2xl cursor-pointer"> 
                <div className="fadeInAnimation h-60 w-full mb-4 md:h-[32vh] md:w-[45vw] lg:h-[30vh] relative lg:w-[45vw]" key={id}>
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
                    className="flex w-full justify-end flex-col h-full rounded-2xl md:w-[45vw] md:h-[32vh] lg:w-[45vw] lg:h-[32vh] cursor-pointer"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${image?.srcMin})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => navigate("/recipe/" + id)}
                    >
                    <div className="px-4 py-5 md:hidden lg:hidden">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium lg:text-4xl">{title}</h3>
                        <p className="line-clamp-2 text-sm font-regular text-primaryGray-500 md:font-thin md:text-primaryGray-700 lg:line-clamp-3 lg:text-lg">
                          {body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 hidden md:flex" onClick={() => navigate("/recipe/" + id)}>
                  <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-medium md:text-4xl md:px-6 md:pt-6">{title}</h3>
                      <p className="line-clamp-1 text-sm font-thin md:pt-2 text-primaryGray-500 md:line-clamp-3 md:text-base md:px-6">
                        {body}
                      </p>
                      <div className=" flex-wrap gap-2 text-[12px] font-regular mt-[2vh] md:px-6 md:pt-6 hidden xl:flex">
                        <a href={liqour?.link} target="_blank" rel="noreferrer">
                        <p className="border-[1px] text-primaryYellow px-4 py-2 rounded-xl uppercase hidden md:flex hover:bg-primaryYellow hover:text-primaryBlack transition-all">
                          {ingredients?.liqour?.title}
                        </p>
                        </a>
                        <p className="border-[1px] text-primaryYellow px-4 py-2 rounded-xl uppercase hidden md:flex">
                          {ingredients?.first?.title}
                        </p>
                        <p className="border-[1px] text-primaryYellow px-4 py-2 rounded-xl uppercase hidden md:flex">
                          {ingredients?.second?.title}
                        </p>
                        <p className="border-[1px] text-primaryYellow px-4 py-2 rounded-xl uppercase hidden md:flex">
                          {ingredients?.third?.title}
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
        <div className="px-5 mt-7 flex flex-wrap gap-4 justify-between lg:px-14 lg:grid-cols-3 lg:gap-y-12 lg:gap-[4%] lg:justify-start cursor-pointer">
          {events.map(({ title, id, likes, image, body, time, taste }) => (
            <div className="fadeInAnimation h-60 max-w-[46%] md:h-96 lg:max-w-[30%] xl:max-w-[22%] lg:min-h-[500px] relative" key={id}>
              <div className="flex justify-between font-thin absolute items-start w-full px-3 py-3 lg:px-5 lg:py-5">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-3 lg:h-5" />
                  <p className="text-xs shadow-primaryBlack lg:text-base">{time} min</p>
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
                className="flex w-full justify-end flex-col h-full rounded-2xl px-4 py-4 lg:px-5 lg:py-5"
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
                    <div className="flex text-xs font-regular lg:text-sm">
                      <p className="border-[1px] px-4 py-1 rounded-xl uppercase">
                        {taste?.title}
                      </p>
                    </div>

                    <h3 className="text-base font-medium lg:text-2xl lg:mt-3">{title}</h3>
                    <p className="line-clamp-1 text-xs font-regular text-primaryGray-500 lg:line-clamp-2 lg:leading-normal lg:text-base">
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
