import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// import flags for lng change
import daFlag from '../assets/svg/flags/dk.svg'
import enFlag from '../assets/svg/flags/gb.svg'
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function TopNavigation() {
    // import translations from i18n
    const { t, i18n } = useTranslation();

    const [openLngSelect, setOpenLngSelect] = useState(false);

    // handle openlngselector
    const handleLngSelect = () => {
        setOpenLngSelect(!openLngSelect);
    }

    // forn handling lng change + store in localstorage cache, so we can use it later, and it works on page reload
    const handleChangeLng = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
        setOpenLngSelect(!openLngSelect);
    }

    return (
        <nav className="h-16 flex items-center justify-between px-6 py-8 fixed bg-white w-full top-0 left-0 z-50">
            
            {openLngSelect && 
                <div className='languageSelector fixed top-0 left-0 bg-orange-600 z-50 w-full h-screen flex flex-col gap-14 text-3xl items-center pt-16'>
                    <XMarkIcon className='h-10 w-10 mb-36 cursor-pointer' onClick={handleLngSelect}/>
                    <div className='flex gap-10 flex-col'>
                        <h3>{t("topnav.selectlng")}</h3>
                        <div className='flex gap-10 items-center justify-center'>
                            <button
                                    className='w-16 h-16 rounded-full'
                                    style={{ 
                                        backgroundImage: `url(${enFlag})`,
                                        backgroundPosition: "top",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                    }} 
                                    onClick={() => handleChangeLng("en")}
                                >
                            </button>

                            <button
                                    className='w-16 h-16 rounded-full'
                                    style={{ 
                                        backgroundImage: `url(${daFlag})`,
                                        backgroundPosition: "top",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                    }} 
                                    onClick={() => handleChangeLng("da")}
                                >
                            </button>
                        </div>
                    </div>
                </div>
            }
            
            <ul className='list-none text-black font-bold text-2xl'>
                <li>
                    <h1>On The Rocks</h1>
                </li>
            </ul>
 
            <div id='mobileTopNav' className='flex gap-5'>
            
                {i18n.language === "en" &&
                    (
                        <div>
                            <button
                                className='w-7 h-7 rounded-full'
                                style={{ 
                                    backgroundImage: `url(${enFlag})`,
                                    backgroundPosition: "top",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                }} 
                                onClick={handleLngSelect}
                            >
                            </button>
                        </div>
                    )
                }
  
                {i18n.language === "da" &&    
                    <div>
                        <button
                            className='w-7 h-7 rounded-full'
                            style={{ 
                                backgroundImage: `url(${daFlag})`,
                                backgroundPosition: "top",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }} 
                            onClick={handleLngSelect}
                        >
                        </button>
                    </div>
                }

            </div>

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
