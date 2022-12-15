import React from "react";
import { useTranslation } from "react-i18next";
import EventCarousel from "../components/EventCarousel";
import FeaturedCarousel from "../components/FeaturedCarousel";
import TypeWriterEffect from "../components/TypeWriterEffect";
import ArticlesFeatured from "../components/ArticlesFeatured";
import CompetitionFeatured from "../components/CompetitionFeatured";
import AboutArticlesFeatured from "../components/AboutArticlesFeatured";
import FeaturedCarouselHeader from "../components/FeaturedCarouselHeader";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className="mt-20 font-medium mb-32 xl:mt-0">
      <HeroSection />
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
      <h4 className="uppercase text-xs px-5 mb-3 text-primaryGray-700 lg:px-16 lg:text-xl lg:leading-normal">Hvem er vi?</h4>
      <h3 className="px-5 text-3xl font-displayBook lg:px-16 lg:text-6xl lg:leading-normal">Bornholm, Bornholm, Bornholm. Du, min <span className="text-primaryYellow underline">dejlige</span> ferieø.</h3>
      {/* ABOUT THE COMPANY -> Adds value */}
      <AboutArticlesFeatured />

    </section>
  );
}
