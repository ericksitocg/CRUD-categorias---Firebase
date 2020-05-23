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

function obtenerProducto(){
  var nombreProducto = document.getElementById("nombre").value;

  db.collection("productos").where("nombre", "==", nombreProducto)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.data().nombre, " => ", doc.id);
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

}

function actualizarProducto(){

  var categoria=document.getElementById('categoria').value;
  var descripcion=document.getElementById('descripcion').value;
  var estado=document.getElementById('estado').value;
  var precio=document.getElementById('precio').value;
  var unidad=document.getElementById('unidad').value;
  var ruta=document.getElementById('rutaImg').value;

  var nombreProducto = document.getElementById("nombre").value;
  let c = 0;

  let refProducto = db.collection("productos").where("nombre", "==", nombreProducto)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(nombre!=""){
          doc.ref.update({
            "nombre":nombre
          });
          c+=1;  
        }
        if(categoria!=""){
          doc.ref.update({
            "categoria":categoria
          });
          c+=1;  
        }
        if(descripcion!=""){
          doc.ref.update({
            "descripcion":descripcion
          });  
          c+=1;  
        }
        if(precio!=""){
          doc.ref.update({
            "precio":precio
          });
          c+=1;    
        }
        if(unidad!=""){
          doc.ref.update({
            "unidad":unidad
          });  
          c+=1;  
        }
        if(ruta!=""){
          doc.ref.update({
            "ruta":ruta
          });  
          c+=1;  
        }
        if(estado!=""){
          doc.ref.update({
            "estado":estado
          });  
          c+=1;  
        }
        console.log("Producto actualizado en " + c + " campos");
      });
  })
  .catch(function(error) {
      console.log("No se puedo actualizar el producto: ", error.message);
  });
}

function eliminarProducto(){

  var nombreProducto = document.getElementById("nombre").value;

  let refProducto = db.collection("productos").where("nombre", "==", nombreProducto)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
        console.log("Producto eliminado")
      });
  })
  .catch(function(error) {
      console.log("No se puedo eliminar el producto: ", error.message);
  });
}

/*
function cambiarNombres(){
  
  db.collection("productos").get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      let nuevoNombre = doc.data().nombre.toLowerCase();
      doc.ref.update({
        nombre:nuevoNombre
      });
      console.log(doc.data().nombre + " -> " + doc.id);
      console.log("--------------------------- ");
      });
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}
*/
