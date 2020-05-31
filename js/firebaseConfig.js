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
function createProducto() {
  var categoria = document.getElementById('categoria').value;
  var descripcion = document.getElementById('descripcion').value;
  var nombre = document.getElementById('nombre').value;
  var estado = document.getElementById('estado').value;
  var precio = document.getElementById('precio').value;
  var unidad = document.getElementById('unidad').value;
  var ruta = document.getElementById('rutaImg').value;

  db.collection("productos").doc().set({
    categoria: categoria,
    descripcion: descripcion,
    nombre: nombre,
    estado: estado,
    precio: precio,
    unidad: unidad,
    rutaImg: ruta

  })
    .then(function () {
      console.log("Producto de prueba agregado");
    })
    .catch(function (error) {
      console.log(error.message)
      return false;
    });
}

function obtenerProductos() {

  db.collection("productos").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data().nombre + " => " + doc.data().categoria + " => " + doc.data().precio + " => " + doc.data().estado + " => " + doc.data().unidad) + " => " + doc.data().unidad;
      });
      console.log("--------------------------- ");
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

}

function obtenerProducto() {
  var nombreProducto = document.getElementById("nombre").value;

  db.collection("productos").where("nombre", "==", nombreProducto)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.data().nombre + " => " + doc.data().categoria + " => " + doc.data().precio + " => " + doc.data().estado + " => " + doc.data().unidad) + " => " + doc.data().unidad;
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

}

function obtenerProductoPorCategoria() {
  var categoriaProducto = document.getElementById("categoria").value;

  db.collection("productos").where("categoria", "==", categoriaProducto)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.data().nombre, " => ", doc.id);
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

}

function actualizarProducto() {

  var categoria = document.getElementById('categoria').value;
  var descripcion = document.getElementById('descripcion').value;
  var estado = document.getElementById('estado').value;
  var precio = document.getElementById('precio').value;
  var unidad = document.getElementById('unidad').value;
  var ruta = document.getElementById('rutaImg').value;

  var nombreProducto = document.getElementById("nombre").value;
  let c = 0;

  let refProducto = db.collection("productos").where("nombre", "==", nombreProducto)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (nombre != "") {
          doc.ref.update({
            "nombre": nombre
          });
          c += 1;
        }
        if (categoria != "") {
          doc.ref.update({
            "categoria": categoria
          });
          c += 1;
        }
        if (descripcion != "") {
          doc.ref.update({
            "descripcion": descripcion
          });
          c += 1;
        }
        if (precio != "") {
          doc.ref.update({
            "precio": precio
          });
          c += 1;
        }
        if (unidad != "") {
          doc.ref.update({
            "unidad": unidad
          });
          c += 1;
        }
        if (ruta != "") {
          doc.ref.update({
            "ruta": ruta
          });
          c += 1;
        }
        if (estado != "") {
          doc.ref.update({
            "estado": estado
          });
          c += 1;
        }
        console.log("Producto actualizado en " + c + " campos");
      });
    })
    .catch(function (error) {
      console.log("No se puedo actualizar el producto: ", error.message);
    });
}

function eliminarProducto() {

  var nombreProducto = document.getElementById("nombre").value;

  let refProducto = db.collection("productos").where("nombre", "==", nombreProducto)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
        console.log("Producto eliminado")
      });
    })
    .catch(function (error) {
      console.log("No se puedo eliminar el producto: ", error.message);
    });
}

function ingresarProductoFila(doc, fila) {
  let d = document.createElement('div');
  $(d).addClass("col-3");
  $(d).addClass("border border-success");

  let contador = crearBotonIncremento(quitarEspaciosNombre(doc.data().nombre));

  let btn_agregar = document.createElement("input");
  btn_agregar.setAttribute('type', "button");
  btn_agregar.setAttribute('value', "Agregar al carrito");
  btn_agregar.className += "btn btn-success";

  // Logica para funcionalidad de ingresar al carrito

  btn_agregar.addEventListener("click", function () {
    let nombre = doc.data().nombre;
    let precio = parseFloat(doc.data().precio);
    let cantidad = parseInt(document.getElementById("cantidad-" + quitarEspaciosNombre(nombre)).value);
    console.log(nombre, precio, cantidad)
    ingresarAlcarrito(nombre, precio, cantidad);
  }
  );

  var img = $('<img>');
  img.attr('src', doc.data().rutaImg);
  img.attr('height', "200");
  img.attr('width', "200");

  $(d).append(doc.data().categoria + " " + doc.data().nombre + " " + doc.data().precio);
  $(d).append(img);
  $(d).append(contador);
  $(d).append(btn_agregar);
  $(fila).append(d);
}

function ingresarTodosProductosCont() {
  limpiarProductos();
  let refProducto = db.collection("productos")
    .get()
    .then(function (querySnapshot) {
      let c = 0;
      let r = document.createElement('div');
      $(r).addClass("row");

      querySnapshot.forEach(function (doc) {
        ingresarProductoFila(doc, r);
        c += 1;
        if (c % 4 == 0 && c != querySnapshot.size) {
          $("#contenedor-productos").append(r);
          r = document.createElement('div');
          $(r).addClass("row");
        }
        if (c == querySnapshot.size) {
          $("#contenedor-productos").append(r);
        }
      });
    })
    .catch(function (error) {
      console.log("Error producto: ", error.message);
    });
}

function ingresarProductosPorCategoriasCont() {
  limpiarProductos();
  var categoriaProducto = document.getElementById("categoria").value;

  db.collection("productos").where("categoria", "==", categoriaProducto)
    .get()
    .then(function (querySnapshot) {
      let c = 0;
      let r = document.createElement('div');
      $(r).addClass("row");

      querySnapshot.forEach(function (doc) {
        ingresarProductoFila(doc, r);
        c += 1;
        if (c % 4 == 0 && c != querySnapshot.size) {
          $("#contenedor-productos").append(r);
          r = document.createElement('div');
          $(r).addClass("row");
        }
        if (c == querySnapshot.size) {
          $("#contenedor-productos").append(r);
        }
      });
    })
    .catch(function (error) {
      console.log("Error producto: ", error.message);
    });

}

function ingresarProductosPorBusquedaCont() {
  limpiarProductos();
  let nombreProducto = document.getElementById("nombre").value;
  let refProducto = db.collection("productos")
    .get()
    .then(function (querySnapshot) {
      //Logica para contar el limite
      let limite = 0;
      querySnapshot.forEach(function (doc) {
        if ((doc.data().nombre).startsWith(nombreProducto)) {
          limite += 1;
        }
      })
      //Logica para ingresar al contenedor usando el limite
      let c = 0;
      let r = document.createElement('div');
      $(r).addClass("row");
      querySnapshot.forEach(function (doc) {
        //  console.log(doc.data().nombre + " " + nombreProducto + " " + (doc.data().nombre).startsWith(nombreProducto));
        if ((doc.data().nombre).startsWith(nombreProducto)) {
          ingresarProductoFila(doc, r);
          c += 1;
          if (c % 4 == 0 && c != limite) {
            $("#contenedor-productos").append(r);
            r = document.createElement('div');
            $(r).addClass("row");
          }
          if (c == limite) {
            $("#contenedor-productos").append(r);
          }
        }
      });
    })
    .catch(function (error) {
      console.log("Error producto: ", error.message);
    });
}

function crearBotonIncremento(nombre) {
  let principal = document.createElement('div');
  principal.setAttribute("id", "principal-" + nombre);

  let btonMinus = document.createElement('input');
  btonMinus.setAttribute('type', "button");
  btonMinus.setAttribute('value', "-");
  btonMinus.setAttribute('id', "min-" + nombre);
  btonMinus.addEventListener("click", function () {
    quantityField = $(this).next();
    if (quantityField.val() != 0) {
      quantityField.val(parseInt(quantityField.val(), 10) - 1);
    }
  });

  let btonPlus = document.createElement('input');
  btonPlus.setAttribute('type', "button");
  btonPlus.setAttribute('value', "+");
  btonPlus.setAttribute('id', "plus-" + nombre);
  btonPlus.addEventListener("click", function () {
    quantityField = $(this).prev();
    quantityField.val(parseInt(quantityField.val(), 10) + 1);
  });

  let cantidad = document.createElement('input');


  cantidad.setAttribute('type',"text");
  cantidad.setAttribute('value',"1");
  cantidad.setAttribute('id',"cantidad-" + nombre);


  principal.append(btonMinus);
  principal.append(cantidad);
  principal.append(btonPlus);

  return principal;
}

function limpiarProductos() {
  document.getElementById("contenedor-productos").innerHTML = "";
}

function limpiarCarrito() {
  document.getElementById("productos-carrito").innerHTML = "";
  total = 0;
  document.getElementById("total").innerHTML = round(total);
}

// Implementacion del carrito de compras

let productosCarrito = [];
let cantidadCarrito = [];
let total = 0;

function ingresarAlcarrito(nombre = "manzana", precio = 1.2, cantidad = 1) {
  let indiceProducto = productosCarrito.indexOf(nombre);
  if (indiceProducto == -1) {

    productosCarrito.push(nombre);

    cantidadCarrito.push(cantidad);

    let producto = $("<tr>", { id: quitarEspaciosNombre(nombre) + "-carrito" });
    var tdN = document.createElement('td');
    tdN.className = "estilo-izq";
    var divN = document.createElement('div');
    divN.append(nombre);
    tdN.append(divN);
    //divN.className = "estilo-izq";
    producto.append(tdN);
    var tdC = document.createElement('td'); var tdP = document.createElement('td');

    var divC = document.createElement('div');
    var divP = document.createElement('div');
    tdP.className = "estilo-der";
    divC.append(cantidad);
    tdC.append(divC);
    divP.append("$ " + round(cantidad * precio));
    tdP.append(divP);
    tdC.className = "valor";
    producto.append(tdC);
    producto.append(tdP);
    //producto.append($("<td class='valor'><div>").append("$ " + round(cantidad*precio)));

    $("#productos-carrito").append(producto);
  }
  else {
    var tdN = document.createElement('td');
    tdN.className = "estilo-izq";
    var divN = document.createElement('div');
    divN.append(nombre);
    tdN.append(divN);
    var tdC = document.createElement('td'); var tdP = document.createElement('td');

    var divC = document.createElement('div');
    var divP = document.createElement('div');
    tdP.className = "estilo-der";

    cantidadCarrito[indiceProducto] = cantidadCarrito[indiceProducto] + cantidad;
    let Nuevacantidad = cantidadCarrito[indiceProducto];
    totalXproducto = Nuevacantidad * precio;
    document.getElementById(quitarEspaciosNombre(nombre) + "-carrito").innerHTML = "";
    console.log(nombre + "-carrito");
    $("#" + quitarEspaciosNombre(nombre) + "-carrito").append(tdN);
    divC.append(Nuevacantidad);
    tdC.append(divC);
    divP.append("$ " + round(cantidad * precio));
    tdP.append(divP);
    tdC.className = "valor";
    $("#" + quitarEspaciosNombre(nombre) + "-carrito").append(tdC);
    $("#" + quitarEspaciosNombre(nombre) + "-carrito").append(tdP);
  }

  total = total + precio * cantidad;
  document.getElementById("total").innerHTML = "$" + round(total);
  console.log(productosCarrito);
  console.log(cantidadCarrito);
  console.log("-------------------------");

}

function quitarEspaciosNombre(nombre) {
  let separacion = nombre.split(" ");
  let nuevo = separacion.map(function (palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  });
  return nuevo.join("");
}

function round(num, decimales = 2) {
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}
