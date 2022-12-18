// small see more btn
// added on the homepage in header components
import React from 'react';

// text imported as props -> dynamic
export default function SeeMoreBtn({ text }) {
    
    return (
    <button 
        className='text-primaryYellow font-thin text-sm border-[1.2px] rounded-[10px] px-5 py-[0.2rem] lg:text-base lg:px-8'
        
    >
        {text}
    </button>
  )
}
