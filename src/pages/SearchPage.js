import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdjustmentsVerticalIcon, Bars4Icon } from "@heroicons/react/24/outline"

export default function SearchPage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className='mt-20 px-6'>

      <input className='placeholder-primaryGray-700 border-solid border-[1px] border-primaryGray-700 w-full py-3 rounded-xl bg-primaryGray-900 bg-opacity-20'
      type="text" id="search" name="search" placeholder={t("searchpage.searchPlaceholder")} value="" 
      />

      <div className='mt-5'>
        <h3 className="text-xl font-medium">
          {t("searchpage.title")}
        </h3>

         <p className='text-base text-primaryGray-500 font-thin leading-relaxed mt-2'>
         {t("searchpage.body")}
         </p>
      </div>

      

      <div className='flex justify-between items-center mt-14'>
        <button class="text-primaryYellow uppercase border-[1.2px] rounded-xl px-5 py-[0.2rem]">
          <div className='flex gap-2 h-7'>
            <AdjustmentsVerticalIcon />
            <p>{t("searchpage.filter")}</p>
          </div>
        </button>

        <div className='flex gap-2 h-7'>
          <Bars4Icon />
          <p>{t("searchpage.list")}</p>
        </div>
      </div>

      

    </section>
  )
}
