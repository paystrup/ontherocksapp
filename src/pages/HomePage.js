import React from "react";
import { useTranslation } from "react-i18next";
import EventCarousel from "../components/EventCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";
import TypeWriterEffect from "../components/TypeWriterEffect";
import ArticlesFeatured from "../components/ArticlesFeatured";
import { useState } from "react";
import CompetitionFeatured from "../components/CompetitionFeatured";
import MainButton from "../components/MainButton";
import AboutArticlesFeatured from "../components/AboutArticlesFeatured";
import Spinanimation from "../components/Spinanimation";
import video from "../assets/video/video1.webm";
import FeaturedCarouselHeader from "../components/FeaturedCarouselHeader";

export default function HomePage() {
  // import copy translations from i18n
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleAgeConfirmed = (event) => {
    setIsConfirmed(true);
    console.log(isConfirmed);
  };

  const handleAgeConfirmedDelete = (event) => {
    setIsConfirmed(false);
    console.log(isConfirmed);
  };

  return (
    <section className="mt-20 font-medium mb-32">
      {isConfirmed && (
        <section className="fixed h-full w-full top-0 left-0 bg-primaryGray-700 z-[9999]">
          <h2 className="font-displayBook text-7xl text-center">
            Er du over 18 år?
          </h2>

          <div className="flex gap-5">
            <button onClick={handleAgeConfirmed()} className="border-2">
              Klik her for at confirme
            </button>

            <button onClick={handleAgeConfirmedDelete()} className="border-2">
              Klik her for at slette
            </button>
          </div>
        </section>
      )}

      <section className="px-5 lg:px-14">
        {/* <div className="videoHomepage  bg-primaryBlack">  
            <video 
                src={video} 
                autoPlay 
                loop 
                muted
                playsinline 
                type="video/mp4"
                className='videovideoHomepage'
            >
            </video>
        </div> */}
        <h1 className="text-5xl font-displayBook leading-tight lg:text-[5rem]">
          {t("homepage.title")}
        </h1>
      </section>
      {/* MOST POPULAR */}
      <FeaturedCarouselHeader
        link={"/search"}
        btnText={t("homepage.featuredCarousel.btnText")}
        title={t("homepage.featuredCarousel.title")}
      />
      <FeaturedCarousel category={"featured"} parameter={"=="} value={true} />
      <EventCarousel />

      {/* CHRISTMAS - SEASONAL FEATURE */}
      <FeaturedCarouselHeader
        link={"/search"}
        btnText={t("homepage.featuredCarousel.btnText")}
        title={t("homepage.christmasCarousel.title")}
      />
      <FeaturedCarousel
        category={"ocassion.slug"}
        parameter={"=="}
        value={"jul"}
      />

      <section className="px-5">
        <TypeWriterEffect />
      </section>

      {/* FEATURED ARTICLES - UPDATED WITH NEW PRODUCT ROLLOUTS */}
      <ArticlesFeatured slug="sobczyk" />

      {/* NEW YEARS - SEASONAL FEATURE */}
      <FeaturedCarouselHeader
        link={"/search"}
        btnText={t("homepage.featuredCarousel.btnText")}
        title={t("homepage.newyearsCarousel.title")}
      />
      <FeaturedCarousel
        category={"ocassion.slug"}
        parameter={"=="}
        value={"nytår"}
      />

      <CompetitionFeatured />

      {/* PARTY - THEME FEATURE */}
      <FeaturedCarouselHeader
        link={"/search"}
        btnText={t("homepage.featuredCarousel.btnText")}
        title={t("homepage.partyCarousel.title")}
      />
      <FeaturedCarousel
        category={"theme.slug"}
        parameter={"=="}
        value={"fest"}
      />

      {/* ABOUT THE COMPANY -> Adds value */}
      <AboutArticlesFeatured />
    </section>
  );
}
