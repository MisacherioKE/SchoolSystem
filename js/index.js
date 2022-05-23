"use strict";

window.oncontextmenu =()=>{
    return false;
}

document.getElementById("login").onclick =()=>{

    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    // invoke firebase

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userDetails)=>{
        let user = userDetails.user;
        let uid = user.uid;

        alert("Signing ")

    //Check user type
    firebase.firestore().collection("users").doc(uid)
    .get().then((doc)=>{
        let userType = doc.data().userType;

        if(userType =="admin"){
         window.location.href ="/html/adminDash.html";
        }
    })

    }).catch((error)=>{
        alert(error.message);
    })
}

