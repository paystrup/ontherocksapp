import React from 'react'
import { useTranslation } from 'react-i18next'
import EventCarousel from '../components/EventCarousel';
import FeaturedCarousel from '../components/FeaturedCarousel';
import TypeWriterEffect from '../components/TypeWriterEffect'

export default function HomePage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className='mt-20 font-medium mb-32'>
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
      
  
    </section>
  )
}
