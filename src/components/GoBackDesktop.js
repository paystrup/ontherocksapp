// imported on bottom-level pages on desktop to improve ux and remove dead ends
// articles, events, competition, cocktails - pages

import React from 'react'
import { useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
// i18n language support
import { useTranslation } from "react-i18next";

export default function GoBackDesktop() {
    const navigate = useNavigate(); // navigation
    const { t } = useTranslation(); // import translations from i18n

    return (
        <div className='w-full text-primaryGray-700 mt-32 px-6 lg:px-14 hidden lg:flex'>
            <div onClick={() => navigate(-1)} className="flex cursor-pointer gap-3 justify-center items-center hover:opacity-50">
                <ArrowLongLeftIcon className="h-8" />
                <p className='uppercase text-sm'>{t("goBackBtn")}</p>
            </div>
        </div>
    );
}
