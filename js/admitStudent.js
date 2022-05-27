"use strict";

window.oncontextmenu =()=>{
    return false;
}

document.getElementById("allStds").onclick =()=>{
    window.location.href="/html/allStudents.html";
}
document.getElementById("proPic").onclick =()=>{
    document.getElementById("proDetails").style.display ="block";
    
}
document.getElementById("proDetails").onmouseleave =()=>{
    document.getElementById("proDetails").style.display ="none";
}
document.getElementById("logOut").onclick =()=>{
    window.location.href ="/html/index.html";
}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        firebase.firestore().collection("users").doc(user.uid).get()
        .then((doc)=>{
            // let userType = doc.data().userType;
          
            // if(userType == "admin"){

                document.getElementById("admitBtn").onclick=()=>{
                    let studentName = document.getElementById("studentName").value;
                    let admNo = document.getElementById("admNo").value;
                    let email = document.getElementById("stdEmail").value;
                    let hostel = document.getElementById("Hostel").value;
                    let stream = document.getElementById("Stream").value;
                    let password = document.getElementById("pass").value;
                    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

                    // invoke firebase
                    firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((userCredentials)=>{
                        let user = userCredentials.user;
                        let uid = user.uid;
                        alert("user created successfully");

                        firebase.firestore().collection("users").doc(uid).set({
                            name: studentName,
                            userId: uid,
                            userType: "student",
                            timestamp: timeStamp
                        }).then(()=>{
                            alert("user updated");

                           // Create Student Collection

                         let studentDoc = firebase.firestore().collection("students").doc();
                          studentDoc.set({
                            name: studentName,
                            admNo: admNo,
                           hostel:hostel,
                           stream: stream,
                          email: email,
                           stdDocId: studentDoc.id,
                           stdUserId: uid,
                          timestamp:timeStamp
                      }).then(()=>{
                        alert("Student Created");
                        window.location.reload();
                     }).catch((error)=>{
                        alert(error.message);
                    })
                           

                        }).catch((error)=>{
                            alert(error.message);
                        })
                       

                    }).catch((error)=>{
                        alert(error.message);
                    })

                }
1

        //    }else{
        //     window.location.href ="/html/index.html";
        // }
            // 
            
        })

    }
    else{
        window.location.href ="/html/index.html";
    }
})

