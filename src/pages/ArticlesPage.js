import React from 'react'
import { useState, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";


export default function ArticlesPage() {
    const [article, setArticle] = useState([]);

  return (
    <div  className='text-primaryWhite mt-16 mb-32'>
        <div 
          className='h-96 rounded-b-[30px] flex items-end'
          style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${article?.headerImage})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
              }}
        >
        </div>
        <div className='mt-14 px-5'>
          <div className='flex justify-between'>
            <div className='font-thin uppercase text-primaryYellow'>
              <p>{article?.subcategoryTitle}</p>
            </div>

            <div className='flex gap-3'>
              <div className='border-[1px] rounded-full p-1'>
                <PaperAirplaneIcon className='h-6 w-6 -rotate-45'/>
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}
