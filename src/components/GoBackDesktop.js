// imported on bottom-level pages on desktop to improve ux and remove dead ends
import React from 'react'
import { useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export default function GoBackDesktop() {
    // navigation
    const navigate = useNavigate();

    return (
        <div className='w-full text-primaryGray-700 mt-32 px-6 lg:px-14 hidden lg:flex'>
            <div onClick={() => navigate(-1)} className="flex cursor-pointer gap-3 justify-center items-center hover:opacity-50">
                <ArrowLongLeftIcon className="h-8" />
                <p className='uppercase text-sm'>Gå tilbage</p>
            </div>
        </div>
    );
}
