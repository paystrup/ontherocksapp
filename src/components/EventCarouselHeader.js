import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EventCarouselHeader() {
    // import translations from i18n
    const { t } = useTranslation();

    return (
        <div className='flex justify-between mb-6 px-5 lg:px-14 lg:mb-12'>
            <h3 className='text-xl font-medium lg:text-2xl'>{t("homepage.EventCarousel.title")}</h3>
        </div>
    )
}
