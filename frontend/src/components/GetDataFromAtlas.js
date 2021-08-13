import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
var firebaseConfig = {
    apiKey: "AIzaSyAY-t4b0mdxJ3VbnUi1j96s0VKSXlSCcLE",
    authDomain: "projekt-efed5.firebaseapp.com",
    databaseURL: "https://projekt-efed5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projekt-efed5",
    storageBucket: "projekt-efed5.appspot.com",
    messagingSenderId: "223757511329",
    appId: "1:223757511329:web:81f3f2a8da8df608f45ee0",
    measurementId: "G-YW2RVJFM7F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 function test(){
    var test = [];
    const dbRef = firebase.database().ref();
    dbRef.child("data").get().then((snapshot) => {
    if (snapshot.exists()) {
        test=snapshot.val();
        document.getElementById("div1").innerHTML=JSON.stringify(test); 
        console.log(test);
    } else {
        test = "error";
    }
    }).catch((error) => {
    console.error(error);
    });
    console.log(test);
 }
  
function GetDataFromAtlas(props) {
    const [response, setResponse] = useState([]);
    

    return (
        <div id="div1" onLoad={test()} style={{ margin: "5px", overflow: "auto", height: "85vh", padding: "30px", background: "#29648A" }}>

        </div>
    );
}
export default GetDataFromAtlas;
