"use strict";

window.oncontextmenu = ()=>{
    return false;
}
// realtime database
function submit (){
    var note = document.getElementById("note").value;

    // invoke database
    firebase.database().ref("notes").set({
        note
    })
}
firebase.database().ref("notes").get()
.then((querySnapshot)=>{
    var data = querySnapshot

    console.log(data);
  
}).catch((error)=>{
    alert(error.message);
})