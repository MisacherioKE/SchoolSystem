"use strict";
window.oncontextmenu =()=>{
    return false;
}

document.getElementById("allTchr").onclick =()=>{
    window.location.href ="/html/allTeachers.html";
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
                    let residence = document.getElementById("residence").value;
                    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());


                    // Invoke firebase to create user

                    firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((userCredentials)=>{
                        let user = userCredentials.user;
                        let uid = user.uid;

                        alert("user created successfully");

                        firebase.firestore().collection("users").doc(uid).set({
                            name:teacherName,
                            userType: "teacher",
                            userId: uid,
                            timestamp: timeStamp

                        }).then(()=>{
                            alert("user Updated");

                            let teacherDoc = firebase.firestore().collection("teachers").doc();
                            teacherDoc.set({
                                name: teacherName,
                                staffNo: staffNo,
                                phoneNum: tPhone,
                                email : email,
                                subjects: subjects,
                                timestamp: timeStamp,
                                teacherDocId: teacherDoc.id,
                                residence:residence,
                                teacherUserId: uid
                            }).then(()=>{
                                alert("teacher created");
                                window.location.reload();
                            }).catch((error)=>{
                                alert(error.message);
                            })
                        }).catch((error)=>{
                            alert(error.message);
                        })
                    })


                }



            // }else{
            //     window.location.href ="/html/index.html";
            // }

        })


    }else{
        window.location.href ="/html/index.html";
    }
})