import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

// i18n language support
import { useTranslation } from "react-i18next";

export default function ArticlesFeatured(slug) {
  // the slug could be imported as props as shown above
  // currently we only have one article, so slug is static below

  const { t, i18n } = useTranslation(); // import translations from i18n
  const navigate = useNavigate(); // import navigation from react router

  // State for setting our fetched articles/cocktails in an empty array so we can map through the data later
  const [article, setArticle] = useState([]);

  // Get current language selected -> for fetching the right collection in Firestore
  const fetchLng = i18n.language;

  // Fetch starts here -> useEffect so dependency array checks for changes and rerenders -> fx. for language change, updated content etc.
  useEffect(() => {
    // collection from firebase
    // db is our database, go to "articles" collection, document "featured", "fetchLng" = da/en collection depending on chosen language
    const articleRef = collection(db, "articles", "featured", fetchLng);

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for slug
    const q = query(articleRef, where("slug", "==", "sobczyk"));

    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // store data (setState) change state -> importing the array of cocktails from the db
      setArticle(data);
      console.log(data); // check if data is fetched
    });
  }, [fetchLng, t]); // dependency array listens for language change and rerenders data on changes

  return (
    <section className="my-14 px-5 lg:px-16 lg:mb-32">
      <div>
        {/* MAP THROUGH DATA AND DISPLAY THE ARTICLE -> destructured, to save space */}
        {/* onclick navigates to article page and shows the current id / article clicked */}
        {/* onclick featured products redirects to Bornholm Spirits product */}
        {article.map(({ headerImage, title, subcategoryTitle, id, relatedProducts, first, link }) => (
          <div className="w-full flex flex-col gap-4 mb-4 lg:flex-row lg:h-[40rem]" key={id}>
            <div
              className="w-full rounded-3xl h-56 flex flex-col justify-end px-5 py-5 lg:h-[40rem] bg-top lg:bg-left-bottom lg:px-8 lg:py-8 hover:opacity-70 cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%), url(${headerImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => navigate("/articles/" + id)}
            >
              <div className="flex flex-col gap-1">
                <h3 className="uppercase text-xs font-light text-primaryGray-500 lg:text-xl">
                  {subcategoryTitle}
                </h3>
                <h2 className="text-base lg:text-3xl">{title}</h2>
              </div>

            </div>
              
            <div className="flex w-full sm:justify-center gap-4 sm:w-full lg:flex-col lg:w-[40%] lg:h-[40rem] lg:justify-between">
              <a className="w-1/2 h-24 lg:w-full lg:h-1/2 lg:flex lg:justify-center hover:opacity-70 transition-all" href={relatedProducts?.first?.link} target="_blank" rel="noreferrer">
                <div 
                  className="flex flex-col w-full h-full rounded-xl pb-5 items-end py-3 px-5 lg:w-[100%] "
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 0%, rgba(0,0,0,0) 60%), url(${relatedProducts?.first?.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <LinkIcon className="h-7 w-7 drop-shadow-lg shadow-primaryBlack text-primaryYellow"/>
                </div>
              </a>

              <a className="w-1/2 h-24 lg:w-full lg:h-1/2 lg:flex lg:justify-center hover:opacity-70 transition-all" href={relatedProducts?.second?.link} target="_blank" rel="noreferrer">
                <div className="flex flex-col w-full h-full rounded-xl pb-5 items-end py-3 px-5 lg:w-[100%]"
                  style={{
                    backgroundImage:`linear-gradient(180deg, rgba(12,12,12,0.4) 0%, rgba(0,0,0,0) 60%), url(${relatedProducts?.second?.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <LinkIcon className="h-7 w-7 drop-shadow-lg shadow-primaryBlack text-primaryYellow"/>
                </div>
              </a>
            </div>
          </div>
        ))}
    </div>
    </section>
  );
}
