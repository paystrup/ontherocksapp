import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Import Swiper React components + styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel } from "swiper";

// Import components
import Spinanimation from "./Spinanimation";

// i18n language support
import { useTranslation } from "react-i18next";


export default function FeaturedProductsCarousel({ product, product2, product3, product4, product5, category, parameter, value }) {
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
    const articleRef = collection(db, fetchLng);

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for featured cocktails
    const q = query(articleRef, where(category, parameter, value));

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
  }, [fetchLng, t, category, parameter, value]);

  // Show loading indicator while data is being fetched

  return (
    <section className="mt-7">
      
      {isLoading && <Spinanimation />}

      {!isLoading && (
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
          modules={[Keyboard, Mousewheel]}
          className="mySwiper featuredProducts w-full"
          breakpoints={{
            // when window width is >= 1px
            1: {
              slidesPerView: "auto",
              initialSlide: 0,
            },
            600: {
              slidesPerView: 2,
              initialSlide: 0,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              initialSlide: 0,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              initialSlide: 0,
              slidesOffsetBefore: "20",
              slidesOffsetAfter: 56,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 4,
              initialSlide: 0,
              slidesOffsetBefore: "20",
              slidesOffsetAfter: 56,
              spaceBetween: 25,
            },
          }}
        >
          {cocktails.map(({ id, title, taste, image, slug }) => (
            <>
              {(slug === product) |
              (slug === product2) |
              (slug === product3) |
              (slug === product4) |
              (slug === product5) ? (
                <SwiperSlide
                  key={id}
                  className="w-2/3 rounded-[24px] relative"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${image.src})`,
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => navigate("/recipe/" + id)}
                >
                  <div className="px-4 py-4 flex w-full justify-between flex-col h-full absolute bottom-0">
                    <div></div>
                    <div>
                      <div className="flex flex-col gap-1">
                        <p className="uppercase text-xs font-thin text-primaryGray-500 line-clamp-2">
                          {taste.title}
                        </p>
                        <h3 className="text-xl font-regular">{title}</h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ) : null}
            </>
          ))}
        </Swiper>
      )}
    </section>
  );
}
