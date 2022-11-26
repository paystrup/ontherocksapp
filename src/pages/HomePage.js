import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className='mt-20 px-6'>
      <h1 className='text-xl'>{t("homepage.hello")}</h1>
    </section>
  )
}
