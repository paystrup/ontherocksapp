import React from 'react'
import { HomeIcon, HeartIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom";

export default function BottomNavigation() {
  return (
    <section className='pt-6 pb-10 px-10 fixed bottom-0 left-0 z-10 bg-white w-full lg:hidden'>

        <ul className='text-black list-none flex items-center justify-between gap-10 md:justify-center md:gap-32'>
            <li className="h-8 w-8 cursor-pointer">
                <NavLink to="/" end>
                    <HomeIcon />
                </NavLink>
            </li>

            <li className="h-8 w-8 cursor-pointer">
                <NavLink to="/search">
                    <MagnifyingGlassIcon />
                </NavLink>
            </li>

            <li className="h-8 w-8 cursor-pointer">
                <NavLink to="/likes">
                    <HeartIcon />
                </NavLink>
            </li>

            <li className="h-8 w-8 cursor-pointer">
                <NavLink to="/profile">
                    <UserIcon  />
                </NavLink>
            </li>
        </ul>
    </section>
  )
}
