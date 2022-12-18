import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase imports for fetching and query
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

// i18n language support
import { useTranslation } from "react-i18next";

export default function AboutArticlesFeatured(slug) {
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
    // filtering for slug, fetches for our slug
    const q = query(articleRef, where("slug", "==", "om-bornholm-spirits"));

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
    <section className="my-14 px-5 lg:px-14">
      <div>
        {/* MAP THROUGH DATA AND DISPLAY THE ARTICLE -> destructured, to save space */}
        {article.map(({ headerImage, title, subcategoryTitle, id }) => (
          <div className="lg:flex xl:gap-40 lg:gap-10" key={id}>

            {/* HEADER TEXT */}
            <div className="mb-7">
              <h4 className="uppercase text-xs mb-3 text-primaryGray-700 lg:text-lg lg:leading-normal">{t("aboutArticle.tag")}</h4>
              <h3 className="text-3xl font-displayBook lg:text-6xl lg:leading-normal">Bornholm, Bornholm, Bornholm. Du, min <span className="text-primaryYellow underline">dejlige</span> ferieø.</h3>
              <button className="hidden lg:flex mt-14 px-14 text-primaryYellow border-[1px] rounded-xl py-2 hover:opacity-50" onClick={() => navigate("/articles/" + id)}>{t("readMoreBtn.title")}</button>
            </div>

            {/* IMAGE CARD W/ TEXT */}
            {/* ONCLICK NAVIGATES TO THE ARTICLE PAGE WITH THE ID CLICKED -> THE ARTICLE */}
            <div className="w-full flex flex-col gap-4 mb-4 cursor-pointer hover:opacity-70 transition-all" key={id}>
              <div
                className="w-full rounded-3xl h-56 flex flex-col justify-end px-5 py-5 lg:px-8 lg:py-8 lg:h-[40rem]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 1%, rgba(0,0,0,1) 100%), url(${headerImage})`,
                  backgroundPosition: "top",
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
