import React from 'react'
import { useTranslation } from 'react-i18next'
import FeaturedCarousel from '../components/FeaturedCarousel';

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
    </section>
  )
}
