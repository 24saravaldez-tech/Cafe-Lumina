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

let controlPedidos = []

let pedidoCliente;
let productoPedido;
let html = '';


botonAgregar.forEach(btn => {


    btn.addEventListener('click', (event) => {
        pedidoCliente = productosCafeteria.find(id => id.id == event.target.id)
        console.log(pedidoCliente)

        productoPedido = new Producto(pedidoCliente.name, pedidoCliente.price, pedidoCliente.count, pedidoCliente.id)
        console.log(productoPedido)


        if (!controlPedidos.includes(productoPedido.nombre)) {

            controlPedidos.push(productoPedido.nombre)
            alerta.classList.remove('d-none')
            alerta.classList.remove('alert-danger')
            alerta.classList.add('alert-success')

            alerta.textContent = 'Producto agregado'

            setTimeout(() => {
                alerta.classList.add('d-none')
            }, 2000)

            renderizar()


        } else {

            alerta.classList.remove('d-none')
            alerta.classList.remove('alert-success')
            alerta.classList.add('alert-danger')

            alerta.textContent = 'El producto ya está añadido a tu cesta. Si quieres aumentar su cantidad, puedes presionar el botono "+" en la sección de Tu Pedido'

            setTimeout(() => {
                alerta.classList.add('d-none')
            }, 3000)
        }

    })

})




function renderizar() {

 //   if (!controlPedidos.includes(productoPedido.nombre)) {

        html += ` <div class="cart-item mb-3 p-3 rounded">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="fw-bold small-title nombre">${productoPedido.nombre}</span>
                                <button class="btn btn-sm btn-outline-danger btn-delete">✕</button>
                            </div>
                            <div class="d-flex justify-content-between align-items-center small text-muted mb-2 precio">
                                <span>Precio: Q${productoPedido.precio.toFixed(2)}</span>
                                <span class="fw-bold color-accent">Subtotal: Q36.00</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-qty menos">-</button>
                                <span class="mx-3 fw-bold cantidad">${productoPedido.cantidad}</span>
                                <button class="btn btn-sm btn-qty mas" data-id=${productoPedido.orden}>+</button>
                            </div>
                        </div>`
        contenedorCardsPedido.innerHTML = html
 //   }

}


contenedorCardsPedido.addEventListener('click', (event) => {
    let orden = controlPedidos.find(item => item.id == event.target.getAttribute('data-id'))

    if (event.target.classList.contains('mas')) {
        productoPedido.aumentar()
    } else if (event.target.classList.contains('menos')) {
        productoPedido.disminuir()
    }
    renderizar()
})
