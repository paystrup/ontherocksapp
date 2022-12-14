// Inspiration from https://youtu.be/_7gdsAfFV9o
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import EventPageCard from "../components/EventPageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
// Import Swiper styles + modules
import "swiper/css";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";

export default function ArticlesPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // fetch depending on i18n language chosen
  const fetchLng = i18n.language;

  const [article, setArticle] = useState([]);
  const params = useParams();
  console.log(params); //Returns the slug-name of the url you're navigated to
  const id = params.id; // and the ID

  // Fetch book data based on the id from the slug
  // This way we don't have to loop through the array
  // We can fetch directly from the ID in fireStore with queries
  // Dependency array listens for a new ID and rerenders

  // articles = our fireStore collection, id = the query
  useEffect(() => {
    const docRef = doc(db, "articles", "featured", fetchLng, id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, [id, fetchLng, t]);

  return (
    <div className="text-primaryWhite mt-16 mb-32 lg:flex lg:justify-between lg:px-14 lg:mt-32">
      <div className="lg:w-[45vw] lg:relative">
        <div
          className="h-96 rounded-b-[30px] flex items-end lg:w-[45vw] lg:rounded-t-[30px] lg:h-[90vh] lg:sticky lg:top-20"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${article?.headerImage})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="mt-14 lg:mt-0">
        <div className="flex justify-between px-5">
          <div className="font-thin uppercase text-primaryYellow">
            <p>{article?.subcategoryTitle}</p>
          </div>

          <div className="flex gap-3">
            <div className="border-[1px] rounded-full p-1">
              <PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
            </div>
          </div>
        </div>
        {/* ARTICLE TEXT */}
        <div className=" lg:w-[45vw]">
          <div className="mt-4 px-5">
            <h2 className="text-4xl font-displayBook">
              {article?.section1?.title}
            </h2>
            <p className="text-md mt-4 font-thin text-primaryGray-500">
              {article?.section1?.body}
            </p>
          </div>

          <div className="section2 my-14">
            <h3 className="text-xl font-medium mb-2 px-5">
              {article?.section2?.title}
            </h3>
            <p className="text-md font-thin text-primaryGray-500 px-5">
              {article?.section2?.body}
            </p>
            {article?.section2?.image && (
              <img
                className="mt-7"
                src={article?.section2?.image?.src}
                alt={article?.section2?.image?.alt}
              />
            )}
            
            <FeaturedProductsCarousel
              product={article?.section2?.data?.slug1}
              product2={article?.section2?.data?.slug2}
              product3={article?.section2?.data?.slug3}
              product4={article?.section2?.data?.slug4}
              product5={article?.section2?.data?.slug5}
              category={"featured"}
              parameter={"=="}
              value={true}
            />
          </div>

          <div className="section3 my-14">
            <div className="px-5">
              <h3 className="text-xl font-medium mb-2">
                {article?.section3?.title}
              </h3>
              <p className="text-md font-thin text-primaryGray-500">
                {article?.section3?.body}
              </p>
            </div>
            {article?.section3?.image && (
              <img
                className="mt-7"
                src={article?.section3?.image?.src}
                alt={article?.section2?.image?.alt}
              />
            )}
            <FeaturedProductsCarousel
              product={article?.section3?.data?.slug1}
              product2={article?.section3?.data?.slug2}
              product3={article?.section3?.data?.slug3}
              product4={article?.section3?.data?.slug4}
              product5={article?.section3?.data?.slug5}
              category={"featured"}
              parameter={"=="}
              value={true}
            />
          </div>

          <div className="section4 my-14">
            <div className="px-5">
              <h3 className="text-xl font-medium mb-2">
                {article?.section4?.title}
              </h3>
              <p className="text-md font-thin text-primaryGray-500">
                {article?.section4?.body}
              </p>
            </div>
              <FeaturedProductsCarousel
              product={article?.section4?.data?.slug1}
              product2={article?.section4?.data?.slug2}
              product3={article?.section4?.data?.slug3}
              product4={article?.section4?.data?.slug4}
              product5={article?.section4?.data?.slug5}
              category={"featured"}
              parameter={"=="}
              value={true}
            />
          </div>

          <div className="section4 my-14">
            <div className="px-5">
              <h3 className="text-xl font-medium mb-2">
                {article?.section5?.title}
              </h3>
              <p className="text-md font-thin text-primaryGray-500">
                {article?.section5?.body}
              </p>
            </div>

            <FeaturedProductsCarousel
              product={article?.section5?.data?.slug1}
              product2={article?.section5?.data?.slug2}
              product3={article?.section5?.data?.slug3}
              product4={article?.section5?.data?.slug4}
              product5={article?.section5?.data?.slug5}
              category={"featured"}
              parameter={"=="}
              value={true}
            />
          </div>

          <div>
              <div className="bg-primaryYellow h-48 mx-5 px-5 py-4 rounded-3xl flex flex-col justify-end bg-center bg-cover" 
                    style={{backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%), url(https://firebasestorage.googleapis.com/v0/b/on-the-rocks-app.appspot.com/o/articles.webp?alt=media&token=5b1913bf-aae2-4d2f-9a21-b9d02bada4a2)"}}
                    onClick={() => navigate("/search")}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">Udforsk vores cocktails</h3>
                  <p className="text-primaryGray-500 text-sm">Lav et cocktailkort med dine favoritter, og bliv klar til julen og nytår.</p>
                </div>

              </div>

          </div>

          <div className="px-5">
            {article?.section4?.button && (
              <a
                href="https://bornholmspirits.com/pages/vores-historie"
                target="_blank" rel="noreferrer"
              >
                <button className="text-primaryYellow font-medium w-full py-3 rounded-2xl border-[1.2px] readMoreBtn">
                  {article?.section4?.button}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
