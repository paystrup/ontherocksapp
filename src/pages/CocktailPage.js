// Inspiration from https://youtu.be/_7gdsAfFV9o 
import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function CocktailPage() {
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
        const docRef = doc(db, 'recipes', 'da', 'cocktails', id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id });
        });
        console.log(article)
    }, [id]);
  return (
    <div className='text-primaryWhite'>
        <h1>{article.title}</h1>
    </div>
  )
}
