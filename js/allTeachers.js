"use strict";

window.oncontextmenu =()=>{
    return false;
}
firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        firebase.firestore().collection("teachers").get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                let name = doc.data().name;
                let staffNo = doc.data().staffNo;
                let subjects = doc.data().subjects;
                let teacherDocId = doc.data().teacherDocId;
                let teacherUserId = doc.data().teacherUserId;
                let carriedId = teacherDocId +"?"+ teacherUserId;


                let content ="";
                content +=`<tr>`         
               content +=`<th scope="row">1</th>`
                content +=`<td colspan="2">${name}</td>`
                content +=`<td>${staffNo}</td>`
                content +=`<td>${subjects}</td>`
                content +=`<td><button onClick="viewMore(\`${teacherDocId}\`)" data-bs-toggle="modal" data-bs-target="#teacherDetails" class="btn btn-outline-success">more</button></td>`
                content +=`<td><button onClick="editTeacher(\`${carriedId}\`)" data-bs-toggle="modal" data-bs-target="#editTeacherDetails" class="btn btn-outline-success">edit</button></td>`
                content +=`<td><i class="fa-solid fa-trash-can"></i></td>`
              content +=`</tr>`

              $("#teacherData").append(content);
            })
        })
        // viewMore Function
        window.viewMore = (value)=>{
            // alert(value);
            firebase.firestore().collection("teachers").doc(value)
            .get().then((doc)=>{
                let name = doc.data().name;
                let email = doc.data().email;
                let phoneNumber = doc.data().phoneNum;

                document.getElementById("name").innerHTML = name;
                document.getElementById("phoneNumber").innerHTML = phoneNumber;
                document.getElementById("email").innerHTML = email;
            }).catch((error)=>{
                alert(error.message);
            })
        }
        // Edit Teacher

        window.editTeacher = (value)=>{
            // alert(value);
            let result = value.split("?");
            let teacherDocId = result[0];
            let teacherUserId = result[1];

            firebase.firestore().collection("teachers").doc(teacherDocId).get()
            .then((doc)=>{
                
                    let name = doc.data().name;
                    let staffNo = doc.data().staffNo;
                    let subjects = doc.data().subjects;
                    let email = doc.data().email;
                    let phoneNumber = doc.data().phoneNum;

                    document.getElementById("teacherName").value = name;
                    document.getElementById("staffNo").value = staffNo;
                    document.getElementById("subjects").value = subjects;
                    document.getElementById("tPhone").value = phoneNumber;
                    document.getElementById("tEmail").value = email;
                
                
            })

            // updating
            document.getElementById("updateButton").onclick =()=>{
 
                let name = document.getElementById("teacherName").value; 
                let staffNo = document.getElementById("staffNo").value; 
                let subjects = document.getElementById("subjects").value;
               let phoneNum = document.getElementById("tPhone").value;
                let email = document.getElementById("tEmail").value;
                let timestamp = firebase.firestore.Timestamp.fromDate(new Date());

                firebase.firestore().collection("teachers").doc(teacherDocId)
                .update({
                    name: name,
                    staffNo:staffNo,
                    subjects: subjects,
                    phoneNumber:phoneNum,
                    email: email,
                    timestamp: timestamp

                }).then(()=>{
                    alert("teacher updated");

                    firebase.firestore().collection("users").doc(teacherUserId)
                    .update({
                        name:name
                    }).then(()=>{
                        alert("user updated");
                        window.location.reload();
                    }).catch((error)=>{
                        alert(error.message);
                    })

                }).catch((error)=>{
                    alert(error.message);
                })



            }

        }


    }else{
        window.location.href ="/html/index.html";
    }
})