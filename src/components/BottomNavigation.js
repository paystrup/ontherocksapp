import React from 'react'
import { HomeIcon, BookmarkIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export default function BottomNavigation() {
    // import copy translations from i18n
    const { t } = useTranslation();
    return (
        <section className='pt-6 pb-10 px-10 fixed bottom-0 left-0 z-10 bg-white w-full lg:hidden'>

            <ul className='text-black list-none flex items-center justify-between gap-10 md:justify-center md:gap-32'>
                <li className="h-7 w-7 cursor-pointer">
                    <NavLink to="/" end className="flex flex-col items-center gap-1">
                        <HomeIcon />
                        <p className='text-xs text-primaryGray-500'>{t("bottomnav.home")}</p>
                    </NavLink>
                </li>

                <li className="h-7 w-7 cursor-pointer">
                    <NavLink to="/search" className="flex flex-col items-center gap-1.5">
                        <MagnifyingGlassIcon />
                        <p className='text-xs text-primaryGray-500'>{t("bottomnav.cocktails")}</p>
                    </NavLink>
                </li>

                <li className="h-7 w-7 cursor-pointer ">
                    <NavLink to="/likes" className="flex flex-col items-center gap-1">
                        <BookmarkIcon />
                        <p className='text-xs text-primaryGray-500'>{t("bottomnav.favourites")}</p>
                    </NavLink>
                </li>

                <li className="h-7 w-7 cursor-pointer">
                    <NavLink to="/profile" className="flex flex-col items-center gap-1">
                        <UserIcon  />
                        <p className='text-xs text-primaryGray-500'>{t("bottomnav.profile")}</p>
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}
