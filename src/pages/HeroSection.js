import React, { useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
sap } from "gsap";

// video source: https://www.pexels.com/@cottonbro/ + edited in Adobe AE
import video from "../assets/video/ontherocksvid.webm";
import { useRef } from 'react';

export default function HeroSection() {
    // import copy translations from i18n
    const { t, i18n } = useTranslation();

    const el = useRef();
    const q = gsap.utils.selector(el);
    const tl = useRef();

    useEffect(() => {            
        tl.current = gsap.timeline(({defaults: {duration: 0.5}}))
        
        .to(q(".landingImage"), {
            y: 0,
            opacity: 1
        })
        .to(q(".landingBoxUpper"), {
            y: 0,
            opacity: 1,
            duration: 0.5
        })
        .to(q(".marqueeLanding"), {
            y: 0,
            opacity: 1
        })
        .to(q(".landingVideo"), {
            y: 0,
            opacity: 1
        });
    }, [q]);

    // import navigation
    const navigate = useNavigate();
    return (
        <section className="hidden max-h-[100vh] w-full overflow-hidden mb-32 xl:flex">
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
            <div className="absolute w-full h-full flex flex-col gap-40 justify-center items-center px-40">
            <div className="flex gap-40 items-center">
                <div className="flex flex-col gap-4 w-[50%]">      
                <h1 className="text-6xl font-displayBook leading-tight">
                    {t("homepage.hero.titleBefore")} <span className="underline underline-offset-8 text-primaryYellow">{t("homepage.hero.titleUnderline")}</span> {t("homepage.hero.titleEnd")}
                </h1>
                <p className="text-xl leading-relaxed font-thin">
                    <span className="font-regular">{t("homepage.hero.descriptionStart")}</span> {t("homepage.hero.descriptionEnd")}
                </p>
                <div className="flex gap-3 mt-10">
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
                {/* FOR THE LOGO   */}
                <div></div>
            </div>
            <div className="flex gap-3">

            </div>
            </div>
            

        </section>
    )
}
