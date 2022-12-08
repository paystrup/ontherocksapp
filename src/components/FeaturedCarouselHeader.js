import React from 'react';
import { useTranslation } from 'react-i18next';
import SeeMoreBtn from './SeeMoreBtn';

export default function FeaturedCarouselHeader() {
    // import translations from i18n
    const { t } = useTranslation();

    return (
        <div className='flex justify-between items-center mb-6 px-5'>
            <h3 className='text-xl font-medium'>{t("homepage.featuredCarousel.title")}</h3>
            <SeeMoreBtn text={t("homepage.featuredCarousel.btnText")} />
        </div>
    )
}
