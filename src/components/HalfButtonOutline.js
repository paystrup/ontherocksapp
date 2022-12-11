import React from 'react'

export default function HalfButtonOutline({ text }) {
  return (
    <button className='w-full border-2 py-3 rounded-2xl border-primaryYellow text-primaryYellow font-regular bg-primaryBlack'>
      {text}
    </button>
  )
}
