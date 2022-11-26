import React from 'react'

export default function TopNavigation() {
    
    return (
        <nav className="h-16 flex items-center justify-between px-6 py-8 fixed bg-white w-full top-0 left-0">
            <ul className='list-none text-black'>
                <li>
                    <h1>On The Rocks</h1>
                </li>
            </ul>

 
            <ul id='mobileTopNav' className='flex gap-5 lg:hidden'>
                <li>
                    <p>Item</p>
                </li>

                <li>
                    <p>Item</p>
                </li>
            </ul>

            <ul id='desktopTopNav' className='gap-5 hidden lg:flex'>
                <li>
                    <p>Desktop</p>
                </li>

                <li>
                    <p>Desktop</p>
                </li>
            </ul>
        </nav>
    )
}
