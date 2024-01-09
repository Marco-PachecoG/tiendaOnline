
const productos = [
    {
        id: "Playera-OVZH1",
        titulo: "Playera OVZ Hombre Blanca",
        imagen: "./IMG/Hombre/ovz1.jpg",
        categoria:{
            nombre: "Playeras Oversize",
            id: "Hombre"
        },
        precio: 350

    },
    {
        id: "Playera-OVZH2",
        titulo: "Playera OVZ Hombre Negra",
        imagen: "./IMG/Hombre/ovz2.jpg",
        categoria:{
            nombre: "Playeras Oversize",
            id: "Hombre"
        },
        precio: 350

    },
    {
        id: "Playera-OVZH3",
        titulo: "Playera OVZ Hombre Gris",
        imagen: "./IMG/Hombre/ovz3.jpg",
        categoria:{
            nombre: "Playeras Oversize",
            id: "Hombre"
        },
        precio: 350

    },
    {
        id: "Playera-OVZH4",
        titulo: "Playera OVZ Hombre Nar",
        imagen: "./IMG/Hombre/ovz4.jpg",
        categoria:{
            nombre: "Playeras Oversize",
            id: "Hombre"
        },
        precio: 350

    },
    {
        id: "Playera-OVZM1",
        titulo: "Playera OVZ Mujer Blanca",
        imagen: "./IMG/Mujer/ovzm1.jpg",
        categoria:{
            nombre: "Crop Top Oversize",
            id: "Mujer"
        },
        precio: 350

    },
    {
        id: "Playera-OVZM2",
        titulo: "Playera OVZ Mujer Negra",
        imagen: "./IMG/Mujer/ovzm2.jpg",
        categoria:{
            nombre: "Crop Top Oversize",
            id: "Mujer"
        },
        precio: 350

    },
    {
        id: "Playera-OVZM3",
        titulo: "Playera OVZ Mujer Gris",
        imagen: "./IMG/Mujer/ovzm3.jpg",
        categoria:{
            nombre: "Crop Top Oversize",
            id: "Mujer"
        },
        precio: 350

    },
    {
        id: "Playera-OVZM4",
        titulo: "Playera OVZ Mujer Nar",
        imagen: "./IMG/Mujer/ovzm4.jpg",
        categoria:{
            nombre: "Crop Top Oversize",
            id: "Mujer"
        },
        precio: 350

    },
    {
        id: "Suplemento2",
        titulo: "Carnitina PowerGym",
        imagen: "./IMG/Suplementos/creatina.jpg",
        categoria:{
            nombre:"Suplemento",
            id: "Suplemento"
        },
        precio: 900

    },
    {
        id: "Suplemento3",
        titulo: "Magnesium PowerGym",
        imagen: "./IMG/Suplementos/magnesio.jpg",
        categoria:{
            nombre:"Suplemento",
            id: "Suplemento"
        },
        precio: 900

    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos){

        contenedorProductos.innerHTML = "";

        productosElegidos.forEach(producto =>   {

            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="detalles-producto">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="precio-producto">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            ` ; 
            contenedorProductos.append(div);
        })
        actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id == e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id == e.currentTarget.id);
            cargarProductos(productosBoton);
        }else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        

    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}   