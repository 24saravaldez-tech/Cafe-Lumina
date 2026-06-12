
class Producto {
    #nombre;
    #precio;
    #cantidad;

    constructor(nombre, precio, cantidad) {
        this.#nombre = nombre;
        this.#precio = precio;
        this.#cantidad = cantidad;
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


    aumentar() {
        return this.#cantidad = this.#cantidad + 1
        console.log(this.#cantidad)
    }

    disminuir() {
        let validarCantidad = false
        if (this.#cantidad >= 1) {
            this.#cantidad++
            validarCantidad = true
        }
    }

    subtotal() {
        return this.#precio * this.#cantidad
    }
}

