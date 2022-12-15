import React, { useEffect, useState } from "react";

// firebase imports for fetching
import { collection, onSnapshot, where, query } from "firebase/firestore"
import { db } from "../firebaseConfig";

// Import components
import { useTranslation } from 'react-i18next'

export default function AboutPageCard({ slug }) {
    const { t, i18n } = useTranslation();

    // state for setting our fetched articles/books 
    const [cardData, setCardData] = useState([]);

    // fetch depending on i18n language chosen
    const fetchLng = i18n.language;

    // fetch starts here
    useEffect(() => {
    // collection from firebase
    // db is our database, articles is the name of the collection
    const articleRef = collection(db, fetchLng)

    // https://firebase.google.com/docs/firestore/query-data/queries#web-version-9_3
    // filtering for featured cocktails
    const q = query(articleRef, where("slug", "==", "om-bornholm-spirits"));
    
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
    }, [t, fetchLng]);
    
  return (
    <>

        {cardData.map(({ title }) =>
            <section className='text-primaryBlack w-full' 
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url(${cardData?.image?.src})`,
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}> 
            </section>
        )}

    </>
  )
}