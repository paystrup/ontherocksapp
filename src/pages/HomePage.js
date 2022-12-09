import React from 'react'
import { useTranslation } from 'react-i18next'
import EventCarousel from '../components/EventCarousel';
import FeaturedCarousel from '../components/FeaturedCarousel';
import TypeWriterEffect from '../components/TypeWriterEffect'
import ArticlesFeatured from '../components/ArticlesFeatured'
import { useState } from 'react';
import CompetitionFeatured from '../components/CompetitionFeatured';
import MainButton from '../components/MainButton';
import AboutArticlesFeatured from '../components/AboutArticlesFeatured'
import Spinanimation from "../components/Spinanimation";

export default function HomePage() {
  // import copy translations from i18n
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleAgeConfirmed = (event) => {
      setIsConfirmed(true);
      console.log(isConfirmed);
  }

  const handleAgeConfirmedDelete = (event) => {
      setIsConfirmed(false);
      console.log(isConfirmed);
  }

  return (
    <section className='mt-20 font-medium mb-32'>
      {isConfirmed && (
          <section className='fixed h-full w-full top-0 left-0 bg-primaryGray-700 z-[9999]'>
              <h2 className='font-displayBook text-7xl text-center'>Er du over 18 år?</h2>
              <MainButton />

              <div className='flex gap-5'>
                  <button 
                      onClick={handleAgeConfirmed()}
                      className="border-2"
                  >
                      Klik her for at confirme

                  </button>

                  <button 
                      onClick={handleAgeConfirmedDelete()}
                      className="border-2"
                  >
                      Klik her for at slette

                  </button>
              </div>
          </section>
      )}
      
      <div className='px-5'>
        {/* <h1 className='text-xl'>{t("homepage.hello")}</h1> */}
        <h1 className='text-[3.2rem] font-displayBook leading-tight'>
          {t("homepage.title")}
        </h1>
      </div>
      <FeaturedCarousel />
      <EventCarousel />
      <div className='px-5'>
        <TypeWriterEffect words={['din kæreste', 'din hund', 'din håndværker', 'dit postbud', 'din ven', 'din morfar','din kollega']} />
      </div>
      <ArticlesFeatured slug="sobczyk"/>    
      <CompetitionFeatured/>  
      <AboutArticlesFeatured/>
      
  
    </section>
  )
}
