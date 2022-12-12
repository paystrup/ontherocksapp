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
    <section className='my-14'>

        <div className="h-full">

            {article.map(({headerImages, title, subtitle, id, button}) => (
                <div className="overflow-hidden relative h-80 flex items-center flex-col justify-center">
                    <div className="text-center z-10 absolute px-6">
                        <h2 className="text-2xl">Vind <span className="underline underline-offset-4 text-primaryYellow">kittet</span> der gør din næste fest til et hit!</h2>
                        <p className="text-sm font-thin pt-2 text-primaryGray-500 pb-7">{subtitle}</p>
                        <button className="bg-primaryYellow drop-shadow-xl text-primaryBlack w-1/2 py-3 rounded-2xl" onClick={() => navigate("/competition/" + id)}>{button}</button>
                    </div>
                    <div className="absolute z-0">
                        <div className="flex justify-center items-center gap-6 h-full py-10 w-[120%] -translate-x-12">
                            <div className="compAnim flex flex-col w-40 h-72 rounded-3xl blur-[2px] opacity-50"
                                style={{
                                backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 100%, rgba(0,0,0,0) 10%), url(${headerImages?.src})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}>
                            </div>

                            <div className="compAnim2 flex flex-col w-40 h-72 rounded-3xl pb-5 py-3 px-5 opacity-20 blur-[1px]"
                                style={{
                                backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 100%, rgba(0,0,0,0) 10%), url(${headerImages?.src2})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}>
                            </div>

                            <div className="compAnim3 flex flex-col w-40 h-72 rounded-xl pb-5 py-3 blur-[2px] opacity-70"
                                style={{
                                backgroundImage: `linear-gradient(180deg, rgba(12,12,12,0.4) 100%, rgba(0,0,0,0) 10%), url(${headerImages?.src1})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}>
                            </div>
                        </div>
                    </div>
  
                </div>
            ))}

        </div>
        
    </section>
  )
}