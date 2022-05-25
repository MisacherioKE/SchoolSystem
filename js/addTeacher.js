"use strict";
window.oncontextmenu =()=>{
    return false;
}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){


        firebase.firestore().collection("users").doc(user.uid)
        .get().then((doc)=>{
            // let userType = doc.data().userType;

            // if(userType === "admin"){

                document.getElementById("addTeacher").onclick =()=>{

                    let teacherName = document.getElementById("teacherName").value;
                    let staffNo = document.getElementById("staffNo").value;
                    let subjects = document.getElementById("subjects").value;
                    let tPhone = document.getElementById("tPhone").value;
                    let email = document.getElementById("tEmail").value;
                    let password = document.getElementById("pass2").value;



                }



            // }else{
            //     window.location.href ="/html/index.html";
            // }

        })


    }else{
        window.location.href ="/html/index.html";
    }
})