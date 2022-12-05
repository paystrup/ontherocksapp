import React from 'react';
import { BookmarkIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function FeaturedCarouselCard() {
  return (
    <div className='pb-5 pt-2 flex w-full justify-between flex-col h-full'>
        <div className='flex justify-between font-thin pl-2'>
            <div className='flex items-center gap-2'>
                <ClockIcon className='h-5'/>
                <p className='text-md'>
                    3 min
                </p>
            </div>
            <BookmarkIcon className='w-9'/> 
        </div>
        <div className='px-2'>
            <div className='flex gap-2 mb-3 text-xs font-light'>
                <p className='border-[2px] px-5 py-1 rounded-full'>TAG</p>
                <p className='border-[2px] px-5 py-1 rounded-full'>VODKA</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-2xl font-medium'>Screw Driver</h3>
                <p className='text-md font-thin text-primaryGray-500 line-clamp-2'>
                    Her indsættes en beskrivelse af cocktailen og hvordan den smager.
                </p>
            </div>
        </div>
    </div>
  )
}
