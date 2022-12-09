import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig.js";
import ppFallback from "../assets/images/profilePicFallback.png";
import SeeMoreBtn from '../components/SeeMoreBtn.js';
import video from "../assets/video/video2.webm";
import Login from '../components/Login';
import Spinanimation from "../components/Spinanimation";

export default function ProfilePage() {
  // import copy translations from i18n
  const { t } = useTranslation();
  const [user, loading] = useAuthState(auth);
  // user.metadata.creationTime
  if (loading) return <Spinanimation/>;
  if (!user)
  return(
    <section>
      <div className="video bg-primaryBlack">  
            <video 
                src={video} 
                autoPlay 
                loop 
                muted
                playsinline 
                type="video/mp4"
                className='videovideo'
            >
            </video>
          </div>
        <div className="mt-10 mb-32 px-6 relative">
        <h1 className='text-3xl font-displayBook leading-tight text-center'>
          <div className='textspan' dangerouslySetInnerHTML={{ __html: t('profilepage.login.title') }}></div>
        </h1>
        <p className="text-base text-primaryGray-500 font-thin leading-relaxed mt-4 line-clamp-4 text-center mb-20">
          {t("profilepage.login.body")}
        </p>

      <Login />
      </div>
    </section>
    )
  if (user)
  return (
    <section className='mt-20 px-6'>
      <div className='flex flex-col items-center justify-center mb-7 gap-2'>
        <img
            className="imageProfile rounded-full"
            src={auth.currentUser.photoURL}
            alt={user.displayName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = { ppFallback };
            }}
        />
        <h3 className='font-medium text-base'>
          {user.displayName}
        </h3>
      </div>

      <div className='flex justify-between text-sm uppercase'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='font-medium text-primaryGray-500'>{t("profilepage.saved")}</p>

          <div className='text-center'>
            <p className='text-4xl'>0</p>
            <p className='text-[10px] text-primaryGray-700'>{t("profilepage.savedBottom")}</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='font-medium text-primaryGray-500'>{t("profilepage.tasteprofile")}</p>

          <div className='text-center'>
            <p className='text-4xl'>0</p>
            <p className='text-[10px] text-primaryGray-700'>{t("profilepage.tasteprofileBottom")}</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='font-medium text-xs text-primaryGray-500'>{t("profilepage.createdAt")}</p>

          <div className='text-center'>
            <p className='text-4xl'>0</p>
            <p className='text-[10px] text-primaryGray-700'>{t("profilepage.createdAtBottom")}</p>
          </div>
        </div>
      </div>

      <div className='h-44 bg-primaryYellow mt-7 rounded-xl px-6 py-4 flex justify-between'>
            <div>
              <p>Data her</p>
            </div>
            <div>
              <h4 className='font-medium text-base'>
                {t("profilepage.tasteProfileTitle")}
              </h4>

              <div className='flex gap-1 flex-wrap font-regular'>
                <p className='bg-primaryGray-700 px-3 rounded-md'>TAG</p>
                <p className='bg-primaryGray-700 px-3 rounded-md'>TAGTAG</p>
                <p className='bg-primaryGray-700 px-3 rounded-md'>TAG</p>
                <p className='bg-primaryGray-700 px-3 rounded-md'>TAG</p>
              </div>

            </div>
            
   
      </div>

      <div className='mt-14 flex justify-between'>
        <h3 className='font-medium text-xl'>{t("profilepage.latestAdded")}</h3>
        <SeeMoreBtn text={t("profilepage.latestAddedBtn")}/>
      </div>

      <div className='mt-14 flex justify-between'>
        <h3 className='font-medium text-xl'>{t("profilepage.yourCollections")}</h3>
        <SeeMoreBtn text={t("profilepage.yourCollectionsBtn")}/>
      </div>

      <div className="signOut mt-8">
          <button
            className="border-[1px] w-full py-2 rounded-xl"
            onClick={() => auth.signOut()}
          >
            {t("profilepage.signOutBtn")} {user.displayName}
          </button>
        </div>
    </section>
  )
}
