import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore"
import { db } from "../firebaseConfig";

// Import components
import { useTranslation } from 'react-i18next'

export default function EventPageCard({ slug }) {
    const { t, i18n } = useTranslation();

    // state for setting our fetched articles/books 
    const [cardData, setCardData] = useState([]);

    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;
    const fetchSlug = slug;
    // fetch starts here
    useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, fetchLng)

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for featured cocktails
    const q = query(articleRef, where("slug", "==", "dannebrog"));
    
    // get the data, on snapshot
    onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        // store data (setState) change state -> importing the array of books from the db
        setCardData(data);
        console.log(data);
    });
    }, [slug, fetchLng]);
    
  return (
    <section className='text-primaryBlack' style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${cardData[0]?.image?.srcMin})`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
              }}>
        <h3 className='text-xl font-regular  '>{cardData[0]?.title}</h3>
    </section>
  )
}