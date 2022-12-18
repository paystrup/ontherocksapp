// 🌐 EVENTPAGE
// Inspiration from https://youtu.be/_7gdsAfFV9o

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import ArticlesFeatured from "../components/AboutArticlesFeatured"
// Import Swiper styles + modules
import "swiper/css";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";
import GoBackDesktop from "../components/GoBackDesktop";
import ShareSocialModal from "../components/ShareSocialModal";

export default function EventPage() {
  const { t, i18n } = useTranslation(); // import translations from i18n
  const fetchLng = i18n.language; // fetch depending on i18n language chosen

  const [article, setArticle] = useState([]); // empty array 
  const params = useParams();
  console.log(params); //Returns the slug-name of the url you're navigated to
  const id = params.id; // and the ID

  // Fetch data based on the id from the slug
  // This way we don't have to loop through the array
  // We can fetch directly from the ID in fireStore with queries
  // Dependency array listens for a new ID and rerenders

  // articles = our fireStore collection, id = the cocktailid
  useEffect(() => {
    const docRef = doc(db, "events", "featured", fetchLng, id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, [id, fetchLng, t]); // listen for lng change and id -> rerender on change

  return (
    <div>
      <GoBackDesktop />
      <div className="text-primaryWhite mt-16 mb-32 fadeInAnimation lg:mt-0">
        <div className="lg:flex lg:flex-row lg:px-0 lg:mt-7 lg:gap-[4rem] lg:relative">
          <div
            className="lg:ml-14 h-96 rounded-b-[30px] flex items-end lg:h-[80vh] lg:w-[50vw] lg:rounded-t-[30px] lg:sticky lg:top-20"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${article?.headerImage})`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="mt-14 px-5 lg:px-0 lg:w-[50vw] lg:mt-0">
            <div className="flex justify-between lg:mr-14 lg:px-5">
              <div className="font-thin uppercase text-primaryYellow">
                <p>{article?.subcategoryTitle}</p>
              </div>

              <div className="flex gap-3">
                <ShareSocialModal article={article}/>
              </div>
            </div>

            <div className="mt-4 leading-relaxed">
              <h2 className="text-5xl font-displayBook lg:mr-14 lg:px-5 lg:text-6xl">{article?.title}</h2>
              <p className="text-xl text-primaryGray-500 font-thin lg:text-2xl leading-relaxed mt-4 lg:mr-14 lg:px-5">
                {article?.body}
              </p>
              <div className="mt-7 font-thin text-md flex flex-col gap-2">
                <div className="my-7">
                  <h3 className="mb-2 text-xl font-medium lg:mr-14 lg:px-5">
                    {article?.slider1?.title}
                  </h3>
                  <p className="mb-7 text-md font-thin text-primaryGray-500 lg:mr-14 lg:px-5">
                    {article?.slider1?.body}
                  </p>

                  <FeaturedProductsCarousel
                    product={article?.slider1?.slidedata?.slug1}
                    product2={article?.slider1?.slidedata?.slug2}
                    product3={article?.slider1?.slidedata?.slug3}
                    product4={article?.slider1?.slidedata?.slug4}
                    product5={article?.slider1?.slidedata?.slug5}
                    category={"featured"}
                    parameter={"=="}
                    value={true}
                  />
                </div>

                <div className="slider2 my-7 lg:my-14">
                  <h3 className="text-xl font-medium mb-2 lg:mr-14 lg:px-5">
                    {article?.slider2?.title}
                  </h3>
                  <p className="text-md font-thin text-primaryGray-500 lg:mr-14 lg:px-5">
                    {article?.slider2?.body}
                  </p>
                
                  <FeaturedProductsCarousel
                      product={article?.slider2?.slidedata?.slug1}
                      product2={article?.slider2?.slidedata?.slug2}
                      product3={article?.slider2?.slidedata?.slug3}
                      product4={article?.slider2?.slidedata?.slug4}
                      product5={article?.slider2?.slidedata?.slug5}
                      category={"featured"}
                      parameter={"=="}
                      value={true}
                  />
                </div>

                <div className="slider3 my-7 lg:my-14">
                  <h3 className="text-xl font-medium mb-2 lg:mr-14 lg:px-5">
                    {article?.slider3?.title}
                  </h3>
                  <p className="text-md font-thin text-primaryGray-500 lg:mr-14 lg:px-5">
                    {article?.slider3?.body}
                  </p>
                
                  <FeaturedProductsCarousel
                      product={article?.slider3?.slidedata?.slug1}
                      product2={article?.slider3?.slidedata?.slug2}
                      product3={article?.slider3?.slidedata?.slug3}
                      product4={article?.slider3?.slidedata?.slug4}
                      product5={article?.slider3?.slidedata?.slug5}
                      category={"featured"}
                      parameter={"=="}
                      value={true}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* WHEN MORE ARTICLES ARE ADDED -> SEND ID AS PROP -> DYNAMIC -> ALREADY SETUP IN THE DB */}
        <div className="lg:mt-32">
          <ArticlesFeatured />
        </div>
      </div>
    </div>
  );
}
