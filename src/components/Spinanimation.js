// loading animation when fetching data
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Spinanimation() {
  const { t } = useTranslation(); // import copy translations from i18n

  return (
    <section>
      <div className="flex flex-col justify-center items-center h-[480px]">
          <svg className="animate-spin mb-8 h-10 w-10 text-primaryYellow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-lg text-center text-primaryGray-900">{t("spinAnimation.title")} cocktails ...</h2>
      </div>
    </section>
  )
}
