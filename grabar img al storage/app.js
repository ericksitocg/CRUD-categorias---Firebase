var firebaseConfig = {
  apiKey: "AIzaSyCimmToIygcPtrRH4OH7WLAiPO_wmlojNs",
  authDomain: "mercadito-2020.firebaseapp.com",
  databaseURL: "https://mercadito-2020.firebaseio.com",
  projectId: "mercadito-2020",
  storageBucket: "mercadito-2020.appspot.com",
  messagingSenderId: "504863942032",
  appId: "1:504863942032:web:37ee72c756d0429402ff15",
  measurementId: "G-NT2EFGHSL9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


window.onload=inicializar;
var fichero;
var storageRef=firebase.storage().ref();
function inicializar(){
  fichero=document.getElementById('fichero');
  fichero.addEventListener("change",subirImagenAFb,false);

}

function subirImagenAFb(){
  //alert("subi archivo");
  var imagenASubir= fichero.files[0];
  var uploadTask= storageRef.child('imagenes/'+ imagenASubir.name).put(imagenASubir);
  console.log("imagen subida supuestamente");
  uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      
    });
  });
  
}



//var img = storageRef.child('Merkadito logo/0001.jpg');
  //imgRef.name===img.name;
/*
  var file = ... // use the Blob or File API
ref.put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});
*/
