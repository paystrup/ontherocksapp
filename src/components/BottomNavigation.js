import React from 'react'
import { HomeIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline"

export default function BottomNavigation() {
  return (
    <section className='pt-6 pb-10 px-10 fixed bottom-0 left-0 z-20 bg-white w-full lg:hidden'>

        <ul className='text-black list-none flex items-center justify-between gap-10 md:justify-center md:gap-32'>
            <li className="h-8 w-8 cursor-pointer">
                <HomeIcon />
            </li>

            <li className="h-8 w-8 cursor-pointer">
                <HeartIcon />
            </li>

            <li className="h-8 w-8 cursor-pointer">
                <UserIcon  />
            </li>
        </ul>
    </section>
  )
}
