import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EventCarouselHeader() {
    // import translations from i18n
    const { t } = useTranslation();

    return (
        <div className='flex justify-between mb-6 px-5'>
            <h3 className='text-xl font-medium'>{t("homepage.EventCarousel.title")}</h3>
        </div>
    )
}
