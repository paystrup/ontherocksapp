// hero section -> 🚨 only shown on large devices
import React from 'react'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ReactComponent as Logo } from "../assets/logo-kit/white-OTR-Logo-emblem.svg"

// video source: https://www.pexels.com/@cottonbro/ + edited in Adobe AE by Nikolaj
// minified and compressed to improve performance ✅
import video from "../assets/video/ontherocksvid.webm";

export default function HeroSection() {  
    const { t } = useTranslation(); // import copy translations from i18n
    const navigate = useNavigate(); // import navigation

    // GSAP animations
    const el = useRef();
    const q = gsap.utils.selector(el);
    const tl = useRef();

    useEffect(() => {            
        tl.current = gsap.timeline(({defaults: {duration: 0.5}}))
        
        .to(q(".title"), {
            y: 0,
            opacity: 1
        })
        .to(q(".description"), {
            y: 0,
            opacity: 1,
            duration: 0.3
        })
        .to(q(".btns"), {
            y: 0,
            opacity: 1
        });
    }, [q]); // listen for elements rendered and rerender

    return (
        <section className="hidden h-[100vh] w-full overflow-hidden mb-32 xl:flex">
            <div dangerouslySetInnerHTML={{ __html: `  
                <video 
                    src="${video}"
                    autoPlay={true} 
                    loop={true} 
                    muted={true}
                    playsInline={true} 
                    type="video/mp4"
                />,
                
                ` }}>    
            </div>
            <div className="absolute w-full h-[100vh] flex gap-40 justify-center items-center px-40">
                <div className="flex flex-col w-[60%]" ref={el}>
                    <div className="flex flex-col gap-4">      
                        <h1 className="title gsapAnim text-6xl font-displayBook leading-tight w-[21ch]">
                            {t("homepage.hero.titleBefore")} <span className="underline underline-offset-8 text-primaryYellow">{t("homepage.hero.titleUnderline")}</span> {t("homepage.hero.titleEnd")}
                        </h1>
                        <p className="description gsapAnim text-xl leading-relaxed font-thin w-[50ch]">
                            <span className="font-regular">{t("homepage.hero.descriptionStart")}</span> {t("homepage.hero.descriptionEnd")}
                        </p>
                    </div>
                    <div className="flex gap-3 mt-10 gsapAnim btns">
                        <button 
                            className="hover:bg-primaryYellow hover:text-primaryBlack transition-all px-5 py-2 rounded-xl border-[1px] text-primaryYellow border-primaryYellow cursor-pointer"
                            onClick={() => navigate("/search")}
                        >
                            {t("homepage.hero.btnMain")}
                        </button>

                        <button 
                            className="hover:bg-primaryYellow hover:text-primaryBlack transition-all px-5 py-2 rounded-xl border-[1px] text-primaryWhite border-primaryWhite cursor-pointer"
                        >
                        {t("homepage.hero.btnSecondary")}
                        </button>                
                    </div>
                </div>
                <div className="flex gap-3 w-[30%] items-center justify-center">
                    {/* FOR THE LOGO   */}
                    <Logo fill='#FFE598' className='fadeInAnimation hidden 2xl:flex xl:w-1/2'/>
                </div>
            </div> 
        </section>
    )
}
