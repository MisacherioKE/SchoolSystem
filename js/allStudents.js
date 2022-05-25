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

                let content ="";
               content +=`<tr>` 
               content +=`<th scope="row">1</th>` 
                content +=`<td>${name}</td>`
                content +=`<td>${admNo}</td>`
                content +=`<td>${stream}</td>`
              content +=`</tr>`


              $("#data").append(content);

            })
        })

    }else{
        window.location.href ="/html/index.html";
    }
})