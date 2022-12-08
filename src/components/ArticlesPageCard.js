import React from 'react'
import card from '../assets/images/card.webp'

export default function ArticlesPageCard() {
  return (
    <section className='text-primaryBlack w-full' 
    style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url({})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }}>
    <h3 className='text-xl font-regular'>hej</h3>
</section>
    
  )
}
