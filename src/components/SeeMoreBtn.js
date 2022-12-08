import React from 'react';

export default function SeeMoreBtn({ text }) {
    
    return (
    <button 
        className='text-primaryYellow font-thin text-sm border-[1.2px] rounded-[10px] px-5 py-[0.2rem]'
        
    >
        {text}
    </button>
  )
}
