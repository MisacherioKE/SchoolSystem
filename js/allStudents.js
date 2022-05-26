"use strict";
window.oncontextmenu =()=>{
    return false;
}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        // pull all students
        firebase.firestore().collection("students").get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                let name = doc.data().name;
                let admNo = doc.data().admNo;
                let stream = doc.data().stream;
                let studentDocId = doc.data().stdDocId;
                let stduserId = doc.data().stdUserId;
                let carriedId = studentDocId +"?"+ stduserId;

                let content ="";
               content +=`<tr>` 
               content +=`<th scope="row">1</th>` 
                content +=`<td colspan="1">${name}</td>`
                content +=`<td>${admNo}</td>`
                content +=`<td>${stream}</td>`
                content +=`<td><button onClick="viewMore(\`${studentDocId}\`)" data-bs-toggle="modal" data-bs-target="#stdDetails" class="btn btn-outline-success">more</button></td>`
                content +=`<td><button  onClick="editStd(\`${carriedId}\`)"  data-bs-toggle="modal" data-bs-target="#editInfo"  class="btn btn-outline-success">edit</button></td>`
                content +=`<td><i class="fa-solid fa-trash-can h4" style="color: red;"></i></td>`
              content +=`</tr>`


              $("#data").append(content);

            })
          
        })
          // View More
          window.viewMore =(value)=>{
             
            firebase.firestore().collection("students").doc(value).get()
            .then((doc)=>{
                let stdName = doc.data().name;
                let hostel = doc.data().hostel;
                let email = doc.data().email;
                

                document.getElementById("name").innerHTML = stdName;
                document.getElementById("hostel").innerHTML = hostel;
                document.getElementById("email").innerHTML = email;

            })
            // firebase.firestore().collection("students").where("stdDocId","==",value)
            // .get().then((querySnapshot)=>{
            //     querySnapshot.forEach((doc)=>{

            //     let stdName = doc.data().name;
            //     let hostel = doc.data().hostel;
            //     let email = doc.data().email;
               

            //     document.getElementById("name").innerHTML = stdName;
            //     document.getElementById("hostel").innerHTML = hostel;
            //     document.getElementById("email").innerHTML = email;


            //     })
            // })
        }
        // edit Student
        window.editStd =(value)=>{
            // alert(value);
            let result = value.split("?");
            let stdDocId = result[0];
            let stdUserId = result[1];

            firebase.firestore().collection("students").doc(stdDocId).get()
            .then((doc)=>{
                let name = doc.data().name;
                let admNo = doc.data().admNo;
                let stream = doc.data().stream;
                // let stdName = doc.data().name;
                let hostel = doc.data().hostel;
                let email = doc.data().email;

                document.getElementById("studentName").value = name;
                document.getElementById("admNo").value = admNo;
                document.getElementById("Stream").value = stream;
                document.getElementById("stdEmail").value = email;
                document.getElementById("Hostel").value = hostel;
                // document.getElementById("studentName").value = name;

            })
            
            // updating
            document.getElementById("updateBtn").onclick =()=>{

               let name = document.getElementById("studentName").value; 
               let admNo = document.getElementById("admNo").value;
                let stream = document.getElementById("Stream").value;
               let email = document.getElementById("stdEmail").value; 
               let hostel = document.getElementById("Hostel").value; 
               let timestamp = firebase.firestore.Timestamp.fromDate(new Date());



               firebase.firestore().collection("students").doc(stdDocId)
               .update({
                   name: name,
                   admNo: admNo,
                   stream: stream,
                   email: email,
                   hostel: hostel,
                   timestamp:timestamp
               }).then(()=>{
                   alert("student updated");

                   firebase.firestore().collection("users").doc(stdUserId)
                   .update({
                       name: name
                   }).then(()=>{
                       alert("user updated")
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