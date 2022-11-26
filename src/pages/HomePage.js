import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const {t, i18n} = useTranslation();

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  }

  return (
    <section className='mt-20'>
      <button onClick={() => handleChangeLng("en")}>English</button>
      <button onClick={() => handleChangeLng("da")}>Danish</button>
      <h1>{t("homepage.hello")}</h1>
    </section>
  )
}
