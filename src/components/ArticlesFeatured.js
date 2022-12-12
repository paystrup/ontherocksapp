import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

// i18n language support
import { useTranslation } from "react-i18next";

export default function ArticlesFeatured(slug) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // state for setting our fetched articles/books
  const [article, setArticle] = useState([]);

  // get current language selected for fetching the right collection in firestore
  const fetchLng = i18n.language;

  // fetch starts here
  useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
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

      // store data (setState) change state -> importing the array of books from the db
      setArticle(data);
      console.log(data);
    });
  }, [fetchLng, t]);

  return (
    <section className="my-14 px-5">
      <div>
        {article.map(({ headerImage, title, subcategoryTitle, id, relatedProducts, first, link }) => (
          <div className="w-full flex flex-col gap-4 mb-4" key={id}>
            <div
              className="w-full rounded-3xl h-56 flex flex-col justify-end px-5 py-5"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%), url(${headerImage})`,
                backgroundPosition: "center top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => navigate("/articles/" + id)}
            >
              <div>
                <h3 className="uppercase text-xs font-light text-primaryGray-500">
                  {subcategoryTitle}
                </h3>
                <h2 className="text-base">{title}</h2>
              </div>

            </div>
              
      <div className="flex justify-center gap-4 w-full">
          <a className="w-1/2 h-24" href={relatedProducts?.first?.link} target="_blank" rel="noreferrer">
            <div 
              className="flex flex-col w-full h-full rounded-xl pb-5 items-end py-3 px-5"
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


        <a className="w-1/2 h-24" href={relatedProducts?.second?.link} target="_blank" rel="noreferrer">
          <div className="flex flex-col w-full h-full rounded-xl pb-5 items-end py-3 px-5"
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
