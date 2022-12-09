import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore"
import { db } from "../firebaseConfig";

// i18n language support
import { useTranslation } from 'react-i18next'

export default function ArticlesFeatured( slug ) {
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
        const articleRef = collection(db, "competitions", "featured", fetchLng)

        // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
        // filtering for slug
        const q = query(articleRef, where("slug", "==", "competition"));

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
    <section className='my-14 px-5'>

        <div >

            {article.map(({headerImages, title, subtitle, id, button}) => (
                <div className="w-full flex flex-col gap-4 mb-4" key={id}>
                    <div
                        className="w-full rounded-3xl h-64 flex flex-col justify-end px-5 py-5"
                        
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 1%, rgba(0,0,0,1) 100%), url(${headerImages?.src})`,
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}
                        
                    >
                        <div className="text-center">
                            <h2 className="text-2xl">{title}</h2>
                            <h3 className="text-sm font-thin py-5">{subtitle}</h3>
                            <button className="bg-primaryYellow text-primaryBlack w-1/2 py-3 rounded-2xl" onClick={() => navigate("/competition/" + id)}>{button}</button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
        
    </section>
  )
}