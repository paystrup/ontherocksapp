// 🏡🏡🏡🏡🏡🏡🏡🏡🏡🏡
// HOMEPAGE "path - /" + catchall *
import React from "react";
import { useTranslation } from "react-i18next";
import EventCarousel from "../components/EventCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";
import TypeWriterEffect from "../components/TypeWriterEffect";
import ArticlesFeatured from "../components/ArticlesFeatured";
// import CompetitionFeatured from "../components/CompetitionFeatured";
import AboutArticlesFeatured from "../components/AboutArticlesFeatured";
import FeaturedCarouselHeader from "../components/FeaturedCarouselHeader";
import HeroSection from "../components/HeroSection";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import CompetitionFeatured from "../components/CompetitionFeatured";

export default function HomePage() {
  const { t } = useTranslation(); // import copy translations from i18n

  return (
    <section className="mt-20 font-medium mb-32 xl:mt-0">
      <ScrollToTopBtn />
      <HeroSection />
      <section className="px-5 lg:hidden">
        <h1 className="text-5xl font-displayBook leading-tight">
          {t("homepage.title")}
        </h1>
      </section>

      {/* MOST POPULAR */}
      <FeaturedCarouselHeader
        link={"/search"}
        btnText={t("homepage.featuredCarousel.btnText")}
        title={t("homepage.featuredCarousel.title")}
      />
      <FeaturedCarousel category={"frontPage"} parameter={"=="} value={true} />
      
      {/* NO SEE MORE BTN -> HEADER ADDED INSIDE HERE */}
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
      {/* STATIC SLUG RN -> can be changed to dynamic after more articles are added */}
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
      
      {/* ABOUT THE COMPANY -> Adds value and a more personal relation to the user */}
      <AboutArticlesFeatured />

    </section>
  );
}
