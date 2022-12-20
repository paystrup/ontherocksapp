import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
// i18n language support
import { useTranslation } from "react-i18next";
import Spinanimation from "./Spinanimation";

export default function ArticlesFeatured(slug) {
  // Import lang support from i18n
  const { t, i18n } = useTranslation();
  // import navigation
  const navigate = useNavigate();

  // Define state for the loading indicator
  const [isLoading, setIsLoading] = useState(true); 

  // state for setting our fetched cocktail data
  // emtpy state with array so we can append the data and map later
  const [article, setArticle] = useState([]);

  // get current language selected for fetching the right collection in firestore
  const fetchLng = i18n.language;

  // fetch starts here
  useEffect(() => {
    // collection from firebase
    // db is our database
    // collection = competitions, documents = "featured", subcollection = "fetchLng" / da or en to fetch the selected lng by the user
    const articleRef = collection(db, "competitions", "featured", fetchLng);

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for slug
    // fetch all competitions directly -> saves space -> better performance -> we dont have to loop through everything
    const q = query(articleRef, where("slug", "==", "competition"));

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // store data (setState) change state -> importing the array of competitions from the db
      setArticle(data);
      console.log(data); // checking if it works
      // Set isLoading to false -> hide loader anim
      setIsLoading(false);
    });
  }, [fetchLng, t]); // dependency array listens for language change and rerenders when new language is chosen

  return (
    <section className="my-24 lg:my-0">
      {/* IF LOADING IS TRUE -> render loading anim */}
      {isLoading && (
        <Spinanimation />
      )}

      <div className="h-full">
        {/* MAP THROUGH DATA AND DISPLAY THE ARTICLE -> destructured, to save space */}
        {article.map(({ headerImages, title, subtitle, id, button }) => (
          <div className="overflow-hidden relative h-80 flex items-center flex-col justify-center lg:h-[40rem]">
            <div className="text-center z-10 absolute px-6 lg:max-w-[80ch] flex flex-col items-center justify-center">
              <h2 className="text-2xl lg:text-5xl lg:mb-7 lg:max-w-[20ch]">
                {t("competition.homePage.title")} 
                <span className="underline underline-offset-4 text-primaryYellow">
                  {t("competition.homePage.second")} 
                </span>
                {t("competition.homePage.third")} 
              </h2>
              <p className="text-sm font-thin pt-2 text-primaryGray-500 pb-7 lg:text-lg lg:mb-7 lg:max-w-[40ch]">
                {subtitle}
              </p>
              <button
                className="bg-primaryYellow drop-shadow-xl text-primaryBlack w-1/2 py-3 rounded-2xl hover:opacity-50 transition-all"
                onClick={() => navigate("/competition/" + id)}
              >
                {button}
              </button>
            </div>
            <div className="absolute z-0">
              <div className="flex justify-center items-center gap-6 h-full py-10 w-[120%] -translate-x-12 lg:-translate-x-0 lg:gap-12 lg:w-[100%]">
                <div
                  className="compAnim flex flex-col w-40 h-72 rounded-3xl blur-[2px] lg:w-[375px] lg:h-[600px] opacity-70 lg:rounded-[30px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 100%, rgba(0,0,0,0) 10%), url(${headerImages?.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                <div
                  className="compAnim2 flex flex-col w-40 h-72 rounded-3xl pb-5 py-3 px-5 opacity-[15%] blur-[1px] lg:w-[375px] lg:h-[600px] lg:rounded-[30px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 100%, rgba(0,0,0,0) 10%), url(${headerImages?.src2})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                <div
                  className="compAnim3 flex flex-col w-40 h-72 rounded-xl pb-5 py-3 blur-[2px] opacity-70 lg:w-[375px] lg:h-[600px] lg:rounded-[30px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 100%, rgba(0,0,0,0) 10%), url(${headerImages?.src1})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
