import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdjustmentsVerticalIcon, Bars4Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CategoryCarousel from '../components/CategoryCarousel';
import { useState } from 'react';

export default function SearchPage() {
  // import copy translations from i18n
  const { t } = useTranslation();

  const [changeLayout, setChangeLayout] = useState(false);

  const handleLayoutChange = (event) => {
    setChangeLayout(!changeLayout);
    console.log(changeLayout);
  }

  return (
    <section className='mt-20 mb-32'>

      <div className='px-6'>
        <input className='placeholder-primaryGray-700 border-solid border-[1px] border-primaryGray-700 w-full py-3 rounded-xl bg-primaryGray-900 bg-opacity-20'
        type="text" id="search" name="search" placeholder={t("searchpage.searchPlaceholder")}
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
          <button className='text-primaryYellow uppercase border-[1.2px] rounded-xl px-5 py-[0.2rem]'>
            <div className='flex gap-1 text-sm justify-center items-center'>
              <AdjustmentsVerticalIcon className='h-6 w-6' />
              
              <p>{t("searchpage.filter")}</p>
            </div>
          </button>

          {!changeLayout &&
            <button 
              className='items-center justify-center text-sm flex gap-1'
              onClick={() => handleLayoutChange()}
            >
              <Bars4Icon className='h-6 w-6'/>
              <p className='uppercase text-primaryGray-500'>{t("searchpage.list")}</p>
            </button>
          }

          {changeLayout &&
            <button 
              className='items-center justify-center text-sm flex gap-1'
              onClick={() => handleLayoutChange()}
            >
              <Squares2X2Icon className='h-6 w-6'/>
              <p className='uppercase text-primaryGray-500'>{t("searchpage.grid")}</p>
            </button>
          }
        </div>
      </div>

      <CategoryCarousel layout={changeLayout}/>

    </section>
  )
}
