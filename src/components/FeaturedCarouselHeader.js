import React from 'react';
import SeeMoreBtn from './SeeMoreBtn';
import { Link} from "react-router-dom";

export default function FeaturedCarouselHeader({link, title, btnText}) {

    return (
        <div className='mt-14 flex justify-between items-center mb-6 px-5 lg:px-14'>
            <h3 className='text-xl font-medium lg:text-2xl'>{title}</h3>
            <Link to={link}>
                <SeeMoreBtn text={btnText} />
            </Link>
        </div>
    )
}
