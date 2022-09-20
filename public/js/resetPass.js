"use strict";

window.oncontextmenu =()=>{
    return false;
}

document.getElementById("login").onclick =()=>{
    
    let email = document.getElementById("email").value;

    firebase.auth().sendPasswordResetEmail(email)
    .then(() =>{
        alert("A Reset Link Has Been Sent To Your Email");
        alert("Please login with your new password");
        window.location.href="/html/index.html";
    }).catch((error)=>{
        alert(error.message);
    })

}