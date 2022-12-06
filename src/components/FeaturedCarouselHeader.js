import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FeaturedCarouselHeader() {
    // import translations from i18n
    const { t } = useTranslation();

    return (
        <div className='flex justify-between mb-6 px-5'>
            <h3 className='text-2xl font-medium'>{t("homepage.featuredCarousel.title")}</h3>
            <button className='text-primaryYellow font-thin text-sm border-[1.2px] rounded-3xl px-5'>
                {t("homepage.featuredCarousel.btnText")}
            </button>
        </div>
    )
}
