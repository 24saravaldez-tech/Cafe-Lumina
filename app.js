//Seccion pedido
//===============

class Producto {
    #nombre;
    #precio;
    #cantidad;
    #orden;

    constructor(nombre, precio, cantidad, orden) {
        this.#nombre = nombre;
        this.#precio = precio;
        this.#cantidad = cantidad;
        this.#orden = orden
    }

    get nombre() {
        return this.#nombre
    }

    set nombre(value) {
        this.#nombre = value
    }

    get precio() {
        return this.#precio
    }

    set precio(value) {
        this.#precio = value
    }

    get cantidad() {
        return this.#cantidad
    }

    set cantidad(value) {

        // if (value <= 0) {
        this.#cantidad = value
        // } else {
        //     throw new Error('No se aceptan valores menores a 1')
        // }
    }

    get orden() {
        return this.#orden
    }

    set orden(value) {
        this.#orden = value
    }


    aumentar() {
        let resultado = this.#cantidad = this.#cantidad + 1
        return resultado
    }

    disminuir() {
        //   let validarCantidad = false
        //   if (this.#cantidad >= 1) {
        return this.#cantidad = this.#cantidad - 1
        //      validarCantidad = true
        //   }
    }

    subtotal() {
        return this.#precio * this.#cantidad
    }

}

//Seccion de Productos individuales

class Productoss {
    #name;
    #count;
    #type;
    #price;
    #id;

    constructor(name, count, type, price, id) {
        this.#name = name;
        this.#count = count;
        this.#type = type;
        this.#price = price;
        this.#id = id;
    }


    get name() {
        return this.#name
    }

    set name(value) {
        this.#name = value
    }

    get count() {
        return this.#count
    }

    set count(value) {
        this.#count = value
    }

    get type() {
        return this.#type
    }

    set type(value) {
        this.#type = value
    }

    get price() {
        return this.#price
    }

    set price(value) {
        this.#price = value
    }

    get id() {
        return this.#id
    }

    set id(value) {
        this.#id = value
    }
}


//Seccion de carrito porque no me queda de otra
class Carrito {
    #pedidos;

    constructor(pedidos) {
        this.#pedidos = pedidos;
    }

    calcularSubtotalTotal() {
        let total = 0
        this.#pedidos.forEach(producto => {
            total += producto.subtotal()
        })
        return total;
    }

    impuesto() {
        let recargo = 0
        this.#pedidos.forEach(producto => {
            recargo = this.calcularSubtotalTotal() * 0.05
        })
        return recargo
    }

    totalTotal() {
        let totalTotal = 0
        this.#pedidos.forEach(producto => {
            totalTotal = this.calcularSubtotalTotal() - this.impuesto()
        })

        return totalTotal
    }
}



const productosCafeteria = [
    new Productoss("Café Americano", 1, "Bebida caliente", 12.00, 1),
    new Productoss("Café Latte", 1, "Bebida caliente", 18.00, 2),
    new Productoss("Capuccino Clásico", 1, "Bebida caliente", 20.00, 3),
    new Productoss("Espresso Doble", 1, "Bebida caliente", 15.00, 4),
    new Productoss("Té Matcha Latte", 1, "Bebida caliente", 22.00, 5),
    new Productoss("Frappé de Chocolate", 1, "Bebida fría", 25.00, 6),
    new Productoss("Smoothie de Fresa", 1, "Bebida fría", 22.00, 7),
    new Productoss("Iced Caramel Macchiato", 1, "Bebida fría", 24.00, 8),
    new Productoss("Limonada con Menta", 1, "Bebida fría", 16.00, 9),
    new Productoss("Muffin de Vainilla", 1, "Postre", 15.00, 10),
    new Productoss("Cheesecake de Frutos Rojos", 1, "Postre", 28.00, 11),
    new Productoss("Brownie Fudge", 1, "Postre", 18.00, 12),
    new Productoss("Sandwich de Pollo", 1, "Comida", 30.00, 13),
    new Productoss("Bagel con Queso Crema", 1, "Comida", 20.00, 14),
    new Productoss("Croissant de Jamón y Queso", 1, "Comida", 22.00, 15)
];


//Seccion totales
//===============

let contenedorCardsPedido = document.querySelector('.contenedorCardsPedido')
let botonAgregar = document.querySelectorAll('.btn-agregar-carrito')
let alerta = document.querySelector('#respuesta')
let menos = document.querySelectorAll('.menos')
let mas = document.querySelectorAll('.mas')

let subtotalCantidad = document.querySelector('#cantidad-subtotal')
let cantidadImpuesto = document.querySelector('#cantidad-impuesto')
let cantidadTotal = document.querySelector('#cantidad-total')

let botonVaciar = document.querySelector('#vaciar-pedido')
let finalizarPedido = document.querySelector('#boton-finalizar-compra')

let controlPedidos = []

let producto;
//let html = '';

//let subtotalTotal = 0


let carritoInterno = new Carrito(controlPedidos);

botonAgregar.forEach(btn => {
    btn.addEventListener('click', (event) => {

        let pedidoCliente = productosCafeteria.find(item => item.id == event.target.id)

        let incluye = controlPedidos.find(item => item.orden == pedidoCliente.id)

        let nuevoProducto = new Producto(pedidoCliente.name, pedidoCliente.price, pedidoCliente.count, pedidoCliente.id)
        //    carritoInterno = new Carrito(pedidoCliente.price * pedidoCliente.count)
        // console.log(carritoInterno.subtotal())


        if (!incluye) {

            controlPedidos.push(nuevoProducto)

            //  console.log('yo soy sumas', sumas)
            alerta.classList.remove('d-none', 'alert-danger')
            alerta.classList.add('alert-success')
            alerta.textContent = 'Producto agregado';

            setTimeout(() => {
                alerta.classList.add('d-none')
            }, 3000)

            renderizar()

        } else if (incluye) {

            let idABuscar = event.target.getAttribute('id')

            let productoSeleccionado = controlPedidos.find(item => item.orden == idABuscar)

            productoSeleccionado.aumentar()

            renderizar()
        }
    });
});


function renderizar() {

    let html = ''

    controlPedidos.forEach((producto) => {
        html += ` <div class="cart-item mb-3 p-3 rounded">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="fw-bold small-title nombre">${producto.nombre}</span>
                                <button class="btn btn-sm btn-outline-danger btn-delete" data-id=${producto.orden}>✕</button>
                            </div>
                            <div class="d-flex justify-content-between align-items-center small text-muted mb-2 precio">
                                <span>Precio: Q${producto.precio.toFixed(2)}</span>
                                <span class="fw-bold color-accent">Subtotal: ${producto.subtotal().toFixed(2)}</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-qty menos" data-id=${producto.orden}>-</button>
                                <span class="mx-3 fw-bold cantidad">${producto.cantidad}</span>
                                <button class="btn btn-sm btn-qty mas" data-id=${producto.orden}>+</button>
                            </div>
                        </div>`
    })

    subtotalCantidad.textContent = `Q${carritoInterno.calcularSubtotalTotal().toFixed(2)}`
    cantidadImpuesto.textContent = `Q${carritoInterno.impuesto().toFixed(2)}`
    cantidadTotal.textContent = `Q${carritoInterno.totalTotal().toFixed(2)}`

    contenedorCardsPedido.innerHTML = html
}

contenedorCardsPedido.addEventListener('click', (event) => {
    let idABuscar = event.target.getAttribute('data-id');

    let productoSeleccionado = controlPedidos.find(item => item.orden == idABuscar)

    if (event.target.classList.contains('mas')) {
        productoSeleccionado.aumentar()
        renderizar()

    } else if (event.target.classList.contains('menos')) {
        productoSeleccionado.disminuir();
        renderizar()

    } else if (event.target.classList.contains('btn-delete')) {
        controlPedidos = controlPedidos.filter(item => item.orden != idABuscar)
        renderizar()
    }

    carritoInterno = new Carrito(controlPedidos);
    renderizar()
});

