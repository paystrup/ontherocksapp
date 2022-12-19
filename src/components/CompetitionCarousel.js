import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// firebase imports for fetching
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Import Swiper React components + styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Mousewheel } from "swiper";

// Import components
import Spinanimation from "./Spinanimation";

// i18n language support
import { useTranslation } from "react-i18next";

export default function CompetitionCarousel() {
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

  // Show loading indicator while data is being fetched

  return (
    <section className="mt-6">
      <div className="flex">
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
            },
            1280: {
              slidesPerView: 4,
              initialSlide: 0,
              slidesOffsetBefore: "56",
              spaceBetween: 25,
            },
            1700: {
              slidesPerView: 4,
              initialSlide: 0,
              slidesOffsetBefore: "56",
              spaceBetween: 25,
            },
          }}
        >
          <SwiperSlide
            className="w-2/3 rounded-[24px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${compitition?.section4?.sliderImages?.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex w-full justify-end flex-col h-full rounded-[30px] px-6 pb-5">
              <div></div>
              <div>
                <div className="flex gap-2 mb-3 text-xs font-regular">
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.firstdrink.tagone")}</p>
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.firstdrink.tagtwo")}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-medium">{t("competition.firstdrink.title")}</p>
                  <p className="text-md font-thin text-primaryGray-500 line-clamp-2">{t("competition.firstdrink.body")}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide
            className="w-2/3 rounded-[24px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${compitition?.section4?.sliderImages?.src1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex w-full justify-end flex-col h-full rounded-[30px] px-6 pb-5">
              <div></div>
              <div>
                <div className="flex gap-2 mb-3 text-xs font-regular">
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.seconddrink.tagone")}</p>
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.seconddrink.tagtwo")}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-medium">{t("competition.seconddrink.title")}</p>
                  <p className="text-md font-thin text-primaryGray-500 line-clamp-2">{t("competition.seconddrink.body")}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="w-2/3 rounded-[24px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${compitition?.section4?.sliderImages?.src2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex w-full justify-end flex-col h-full rounded-[30px] px-6 pb-5">
              <div></div>
              <div>
                <div className="flex gap-2 mb-3 text-xs font-regular">
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.thirddrink.tagone")}</p>
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.thirddrink.tagtwo")}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-medium">{t("competition.thirddrink.title")}</p>
                  <p className="text-md font-thin text-primaryGray-500 line-clamp-2">{t("competition.thirddrink.body")}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="w-2/3 rounded-[24px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%), url(${compitition?.section4?.sliderImages?.src3})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex w-full justify-end flex-col h-full rounded-[30px] px-6 pb-5">
              <div></div>
              <div>
                <div className="flex gap-2 mb-3 text-xs font-regular">
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.fourthdrink.tagone")}</p>
                  <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("competition.fourthdrink.tagtwo")}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-medium">{t("competition.fourthdrink.title")}</p>
                  <p className="text-md font-thin text-primaryGray-500 line-clamp-2">{t("competition.fourthdrink.body")}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
