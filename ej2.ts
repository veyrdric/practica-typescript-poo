// Ejercicio 2: Encapsulamiento

interface Movimiento {
  tipo: "depósito" | "retiro";
  monto: number;
}

class CuentaBancaria {
  readonly titular: string;
  private saldo: number;
  private historial: Movimiento[] = [];

  constructor(titular: string, montoInicial: number) {
    if (montoInicial < 0) {
      throw new Error("El monto inicial no puede ser negativo");
    }
    this.titular = titular;
    this.saldo = montoInicial;
  }

  depositar(monto: number): void {
    if (monto <= 0) {
      throw new Error("El monto a depositar tiene que ser mayor a 0");
    }
    this.saldo += monto;
    this.historial.push({ tipo: "depósito", monto });
  }

  retirar(monto: number): void {
    if (monto <= 0) {
      throw new Error("El monto a retirar tiene que ser mayor a 0");
    }
    if (monto > this.saldo) {
      throw new Error("Saldo insuficiente");
    }
    this.saldo -= monto;
    this.historial.push({ tipo: "retiro", monto });
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  // devuelvo una copia para que no puedan modificar el historial real
  obtenerHistorial(): Movimiento[] {
    return this.historial.map((m) => ({ ...m }));
  }
}

// pruebas
const cuenta = new CuentaBancaria("Ana López", 5000);
console.log("Titular:", cuenta.titular);
console.log("Saldo inicial:", cuenta.consultarSaldo());

cuenta.depositar(2000);
cuenta.retirar(1500);
console.log("Saldo:", cuenta.consultarSaldo());

try {
  cuenta.depositar(-100);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  cuenta.retirar(100000);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

const historial = cuenta.obtenerHistorial();
console.log("Historial:", historial);

// pruebo modificar la copia
historial.push({ tipo: "depósito", monto: 999999 });
historial[0]!.monto = 1;
console.log("Historial despues de modificar la copia:", cuenta.obtenerHistorial());

// cuenta.saldo = 1000000; // no compila, es private
