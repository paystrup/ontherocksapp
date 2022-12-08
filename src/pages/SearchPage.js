import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdjustmentsVerticalIcon, ViewListlIcon } from "@heroicons/react/24/outline"

export default function SearchPage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  return (
    <section className='mt-20 px-6'>

      <input type="text" id="search" name="search" placeholder={t("searchpage.searchPlaceholder")} value="" />

      <div className='mt-5'>
        <h3 className="text-xl font-medium">
          {t("searchpage.title")}
        </h3>

         <p className='text-base text-primaryGray-500 font-thin leading-relaxed mt-2'>
         {t("searchpage.body")}
         </p>
      </div>

      

      <div>
        <button class="text-primaryYellow uppercase border-[1.2px] rounded-3xl px-5 py-[0.2rem]">
          <div>
            <AdjustmentsVerticalIcon />
            Filter
          </div>
        </button>

        <div>
          <Bars4Icon />
          <p>Liste</p>
        </div>
      </div>

      

    </section>
  )
}
