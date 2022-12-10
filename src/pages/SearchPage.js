import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdjustmentsVerticalIcon, Bars4Icon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";
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

  // state for opening filter modal
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = (event) => {
    setOpenFilter(!openFilter)
  }

  return (
    <section className='mt-20 mb-32'>

      {/* FILTER MODAL OPENS BY SETTING OPENFILTER STATE ONCLICK FILTER BTN */}
      {openFilter && (
        <div id='filterModal' className='fixed z-[9999] overflow-y-scroll overflow-x-hidden top-0 left-0 h-full w-full bg-primaryBlack px-6'>
          <div className='flex items-center justify-center mt-4'>
            <XMarkIcon className='h-10 w-10' onClick={handleFilterOpen}/>
          </div>

          <div className='flex flex-col gap-11 mt-14'>
            <h3 className='text-xl font-medium'>Stemning</h3>
            <h3 className='text-xl font-medium'>Begivenhed</h3>
            <h3 className='text-xl font-medium'>Tid</h3>
            <h3 className='text-xl font-medium'>Smagsnoter</h3>
            <h3 className='text-xl font-medium'>Spiritus</h3>
          </div>
        </div>
      )}

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
            <div className='flex gap-1 text-sm justify-center items-center' onClick={handleFilterOpen}>
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
