// Ejercicio 1: Abstraccion
// solo dejo lo que sirve para vender

class Producto {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;

  constructor(nombre: string, precio: number, categoria: string, stock: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

  describir(): string {
    return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`;
  }

  hayStock(cantidad: number): boolean {
    return cantidad > 0 && cantidad <= this.stock;
  }

  // lanzo error porque si no se puede vender, el que llama se tiene que enterar
  venderUnidades(cantidad: number): void {
    if (!this.hayStock(cantidad)) {
      throw new Error(`No hay stock suficiente de ${this.nombre} (quedan ${this.stock})`);
    }
    this.stock -= cantidad;
  }

  // no cambia el precio original
  aplicarDescuento(porcentaje: number): number {
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error("El descuento tiene que ser entre 0 y 100");
    }
    return this.precio - (this.precio * porcentaje) / 100;
  }
}

// pruebas
const teclado = new Producto("Teclado", 10000, "electrónica", 5);
const yerba = new Producto("Yerba 1kg", 3500, "almacén", 20);

console.log(teclado.describir());
console.log(yerba.describir());

console.log("Hay stock para 3?", teclado.hayStock(3));
console.log("Hay stock para 10?", teclado.hayStock(10));

teclado.venderUnidades(3);
console.log(teclado.describir());

try {
  teclado.venderUnidades(10);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

console.log("Con 15% de descuento:", teclado.aplicarDescuento(15));
console.log("Precio original:", teclado.precio);
