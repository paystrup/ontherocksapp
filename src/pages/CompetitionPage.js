// Inspiration from https://youtu.be/_7gdsAfFV9o
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CompetitionCarousel from "../components/CompetitionCarousel";
import ScrollToTopBtn from "../components/ScrollToTopBtn";

// Import Swiper styles + modules
import "swiper/css";
import ShareSocialModal from "../components/ShareSocialModal";
import Spinanimation from "../components/Spinanimation";
import GoBackDesktop from "../components/GoBackDesktop";

export default function ArticlesPage() {
  const [isLoading, setIsLoading] = useState(true); // Define state for the loading indicator
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // fetch depending on i18n language chosen
  const fetchLng = i18n.language;

  const [compitition, setCompition] = useState([]);
  const params = useParams();
  console.log(params); //Returns the slug-name of the url you're navigated to
  const id = params.id; // and the ID

  // Fetch book data based on the id from the slug
  // This way we don't have to loop through the array
  // We can fetch directly from the ID in fireStore with queries
  // Dependency array listens for a new ID and rerenders

  // articles = our fireStore collection, id = the query
  useEffect(() => {
    const docRef = doc(db, "competitions", "featured", fetchLng, id);

    onSnapshot(docRef, (snapshot) => {
      setCompition({ ...snapshot.data(), id: snapshot.id });
      // Set isLoading to false -> hide loader anim
      setIsLoading(false);
    });
  }, [id, fetchLng, t]);


  return (
    <section className="my-14 mt-16 lg:mt-0 mb-32 leading-loose">

      {isLoading && (
          <Spinanimation />
      )}

      {!isLoading && (
        <section>
          <GoBackDesktop />
          <ScrollToTopBtn />
          <div className="lg:flex lg:flex-row lg:px-14 lg:mt-7 lg:gap-[4rem] lg:relative">
            <div
              className="h-96 rounded-b-[30px] flex items-end lg:h-[80vh] lg:w-[50vw] lg:rounded-t-[30px] lg:sticky lg:top-20"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${compitition?.headerImages?.src2})`,
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="px-5 lg:w-[50vw] mt-14 lg:mt-0">
              <div className="flex justify-between">
                <p className="font-thin uppercase text-primaryYellow">
                  {compitition?.subcategorytitle}
                </p>
                <ShareSocialModal article={compitition}/>
              </div>

              <div className=" lg:w-[45vw]">
                <div className="mt-7">
                  <h2 className="text-5xl font-displayBook lg:mr-14 lg:text-6xl">
                    {compitition?.section1?.title}
                  </h2>
                  <p className="text-xl text-primaryGray-500 font-thin lg:text-2xl leading-relaxed mt-4 lg:mr-14 ">
                    {compitition?.section1?.body}
                  </p>
                </div>
              </div>

              <div className="text-md mt-14">
                <ul className="list-disc px-4 text-primaryGray-500 leading-8">
                  <li>{compitition?.section2?.steps?.step1}</li>
                  <li>{compitition?.section2?.steps?.step2}</li>
                  <li>{compitition?.section2?.steps?.step3}</li>
                  <li>{compitition?.section2?.steps?.step4}</li>
                </ul>
                <p className="text-md font-thin text-primaryGray-500 lg:mr-14 mt-8">
                  {compitition?.section2?.body}
                </p>
              </div>

              <div className="w-full flex flex-col gap-4 mb-4" key={id}>
                <h2 className="text-xl font-medium mb-2 lg:mr-14 lg:px-5 pt-20">
                  {compitition?.section3?.title}
                </h2>

                <div
                  className="w-full rounded-3xl h-56 flex flex-col justify-end px-5 py-5 lg:h-80"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 1%, rgba(0,0,0,1) 100%), url(${compitition?.section3?.image?.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => navigate("/" + id)}
                >
                  <div>
                    <div className="flex gap-2 mb-3 text-xs font-regular">
                      <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("filters.taste.sweet")}</p>
                      <p className="border-[2px] px-4 py-1 rounded-full uppercase">{t("filters.taste.tropic")}</p>
                    </div>
                    <h2 className="text-2xl font-medium">{t("competition.fifthdrink.title")}</h2>
                    <p className="text-md font-thin text-primaryGray-500 line-clamp-2">{t("competition.fifthdrink.body")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-20">
            <h2 className="text-xl font-medium pt-14 lg:px-14 px-5 lg:text-3xl mb-10">
              {compitition?.section4?.title}
            </h2>
            <CompetitionCarousel />
          </div>
        </section>
      )}
    </section>
  );
}
