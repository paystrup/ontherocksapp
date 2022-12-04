import React from 'react'
import cardImg from "../assets/images/card.webp";

export default function FeaturedCarousel() {
  return (
    <section className='my-14 px-4'>
        <div className='flex justify-between mb-7'>
            <h3 className='text-xl font-medium'>Udvalgte cocktails</h3>
            <button className='text-primaryYellow font-regular text-sm border-[1.4px] rounded-3xl px-3'>
                Se alle
            </button>
        </div>
        <div 
            className="w-3/4 h-[450px] rounded-3xl" 
            style={{
                backgroundImage: `linear-gradient(360deg, rgba(0,0,0,0.3) 6%, rgba(0,0,0,0) 100%),url(${cardImg})`,
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >


        </div>
    </section>
  )
}
