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


                let content ="";
                content +=`<tr>`         
               content +=`<th scope="row">1</th>`
                content +=`<td colspan="2">${name}</td>`
                content +=`<td>${staffNo}</td>`
                content +=`<td>${subjects}</td>`
              content +=`</tr>`

              $("#teacherData").append(content);
            }).catch((error)=>{
                alert(error.message);
            })
        })


    }else{
        window.location.href ="/html/index.html";
    }
})