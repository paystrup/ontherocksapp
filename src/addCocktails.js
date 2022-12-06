const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCUIFpnm7bQUBxdyLV5yHjoPIHYLgZ4y0s",
    authDomain: "on-the-rocks-app.firebaseapp.com",
    projectId: "on-the-rocks-app",
  });
  
var db = firebase.firestore();

var cocktails =[  
    {  
       "id":1,
       "name":"Focaccia al rosmarino",
       "description":"Wood fired rosemary and garlic focaccia",
       "price":8.50,
       "type":"Appetizers"
    },
    {  
       "id":2,
       "name":"Burratta con speck",
       "description":"Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
       "price":13.50,
       "type":"Appetizers"
    }
 ]

cocktails.forEach(function(obj) {
    db.collection("cocktails").add({
        id: obj.id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        type: obj.type
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});