import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SearchPage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className='mt-20 px-6'>
      <h2 className='text-2xl font-bold'>
        {t("searchpage.title")}
      </h2>
    </section>
  )
}
