import React from "react";
import { useTranslation } from "react-i18next";
import EventCarousel from "../components/EventCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";
import TypeWriterEffect from "../components/TypeWriterEffect";
import ArticlesFeatured from "../components/ArticlesFeatured";
import { useState } from "react";
import CompetitionFeatured from "../components/CompetitionFeatured";
import AboutArticlesFeatured from "../components/AboutArticlesFeatured";
import FeaturedCarouselHeader from "../components/FeaturedCarouselHeader";

// video source: https://www.pexels.com/@cottonbro/ + edited in Adobe AE
import video from "../assets/video/ontherocksvid.webm";

export default function HomePage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className="mt-20 font-medium mb-32">
      <section className="hidden h-[80vh] w-full overflow-hidden mb-32 lg:flex">
        <div className=" bg-primaryBlack">  
            <video 
                src={video} 
                autoPlay 
                loop 
                muted
                playsinline 
                type="video/mp4"
            >
            </video>
        </div>

      </section>
      <section className="px-5 lg:hidden">
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
