import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../assets/svg/logo.svg"

// import flags for lng change
import daFlag from '../assets/svg/flags/dk.svg'
import enFlag from '../assets/svg/flags/gb.svg'
import { XMarkIcon, ArrowLeftIcon,  EllipsisVerticalIcon } from "@heroicons/react/24/outline"

export default function TopNavigation() {
    // import translations from i18n
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    console.log(location.pathname);
    
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
        <nav className="h-16 flex items-center justify-between px-6 py-8 fixed bg-primaryBlack w-full top-0 left-0 z-50 text-primaryWhite">

            
            {openLngSelect && 
                <div className='languageSelector fixed top-0 left-0 bg-primaryBlack z-50 w-full h-screen flex flex-col gap-14 text-3xl items-center pt-16'>
                    <XMarkIcon className='h-10 w-10 mb-36 cursor-pointer' onClick={handleLngSelect}/>
                    <div className='flex gap-10 flex-col'>
                        <h3>{t("topnav.selectlng")}</h3>
                        <div className='flex gap-10 items-center justify-center'>

                            <button
                                    className='w-16 h-16 rounded-full border-solid border-2 border-primaryWhite'
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
                                    className='w-16 h-16 rounded-full border-solid border-2 border-primaryWhite'
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
            
            {/* FOR THE HOME PAGE */}
            {location.pathname === "/" && (
                <ul className='list-none font-displayBook text-lg'>
                        <li className='text-primaryWhite fill-primaryWhite'>
                            <Link to="/">
                                <img src={logo} className="w-20" alt="On The Rocks Logo Small" />
                            </Link>
                        </li>
                </ul>
            )}
            {/* FOR THE SEARCH PAGE */}
            {location.pathname === "/search" && (
                <ul className='list-none text-lg'>
                    <li className='text-primaryWhite fill-primaryWhite'>
                        <h2>{t("topnav.searchTitle")}</h2>
                    </li>
                </ul>    
            )}
            {/* FOR THE LIKES PAGE */}
            {location.pathname === "/likes" && (
                <ul className='list-none text-lg'>
                    <li className='text-primaryWhite fill-primaryWhite'>
                        <h2>{t("topnav.likesTitle")}</h2>
                    </li>
                </ul>    
            )}

            {/* FOR THE PROFILE PAGE */}
            {location.pathname === "/profile" && (
                <ul className='list-none text-lg'>
                    <li className='text-primaryWhite fill-primaryWhite'>
                        <h2>{t("topnav.profileTitle")}</h2>
                    </li>
                </ul>    
            )}
            {/* FOR THE RECIPE PAGE - LEFT AROOW  */}
            {location.pathname.includes("/recipe") && (
                <ul className='list-none text-lg'>
                    <li className='text-primaryWhite fill-primaryWhite flex justify-between'>
                        <div onClick={() => navigate(-1)} className="flex iconsize">
                            <ArrowLeftIcon className='h-7 w-7' />
                        </div>
                    </li>
                </ul>    
            )}
            {/* FOR THE RECIPE PAGE - TEXT */}
            {location.pathname.includes("/recipe") && (
                <ul className='list-none text-lg'>
                    <li className='text-primaryWhite fill-primaryWhite flex justify-between'>
                        <div onClick={() => navigate(-1)} className="flex iconsize">
                            <h2 className=''>Opskrift</h2>
                        </div>
                    </li>
                </ul>    
            )}
            
 

            <div id='mobileTopNav' className='flex'>

            
                {i18n.language === "en" &&
                    (
                        <div>
                            <button
                                className='w-7 h-7 rounded-full border-solid border-[1.5px] border-primaryWhite'
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
                            className='w-7 h-7 rounded-full border-solid border-[1.5px] border-primaryWhite'
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
                                            {/* FOR THE RECIPE PAGE - SETTINGS ICON  */}
            {location.pathname.includes("/recipe") && (
                <ul className='list-none text-lg'>
                    <li className='text-primaryWhite fill-primaryWhite flex justify-between'>
                        <button className="flex iconsize">
                            <EllipsisVerticalIcon className='h-7 w-7 self-end' />
                        </button>
                    </li>
                </ul>    
            )}

            </div>

            <ul id='desktopTopNav' className='gap-5 hidden lg:flex'>
                <li>
                    <p>Hjem</p>
                </li>

                <li>
                    <p>Cocktails</p>
                </li>

                <li>
                    <p>Gemt</p>
                </li>

                <li>
                    <p>Min profil</p>
                </li>
            </ul>
        </nav>
    )
}
