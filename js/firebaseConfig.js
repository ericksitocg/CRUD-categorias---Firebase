// Your web app's Firebase configuration
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

var db = firebase.firestore();

firebase.analytics();

var app = document.getElementById('app');

/*
Zona de prueba
*/
//function createProducto(categoria,codigo,descripcion,estado,nombre,precio,pxUnit,rutaImg){
function createProducto(){  
  var categoria=document.getElementById('categoria').value;
  var descripcion=document.getElementById('descripcion').value;
  var nombre=document.getElementById('nombre').value;
  var estado=document.getElementById('estado').value;
  var precio=document.getElementById('precio').value;
  var unidad=document.getElementById('unidad').value;
  var ruta=document.getElementById('rutaImg').value;
 
  db.collection("productos").doc().set({
      categoria: categoria,
      descripcion: descripcion,
      nombre: nombre,
      estado: estado,
      precio: precio,
      unidad : unidad,
      rutaImg : ruta

  })
  .then(function(){
    console.log("Producto de prueba agregado");
  })
  .catch(function(error){
    console.log(error.message)
    return false;
  });
}

function obtenerProductos(){

    db.collection("productos").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data().nombre + " -> " + doc.id);
        });
      console.log("--------------------------- ");
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

}

function actualizarProducto(){
    var documento = document.getElementById("input-data").value;

    db.collection("productos").doc(documento).update({
      "nombre": "nombre 2"
  })
  .then(function() {
      console.log("Producto de prueba actualizado");
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

function eliminarProducto(){

  var documento = document.getElementById("input-data").value;

  db.collection("productos").doc(documento).delete().then(function() {
    console.log("Producto de prueba borrado");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

