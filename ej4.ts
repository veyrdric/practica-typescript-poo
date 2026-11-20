// Ejercicio 4: Polimorfismo

import { Empleado, EmpleadoFijo } from "./ej3.ts";

class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private valorHora: number;

  constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
    super(nombre, antiguedad);
    this.horasTrabajadas = horasTrabajadas;
    this.valorHora = valorHora;
  }

  override calcularSueldo(): number {
    return this.horasTrabajadas * this.valorHora;
  }
}

class EmpleadoPorComision extends Empleado {
  private ventasDelMes: number;
  private porcentajeComision: number;

  constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
    super(nombre, antiguedad);
    this.ventasDelMes = ventasDelMes;
    this.porcentajeComision = porcentajeComision;
  }

  override calcularSueldo(): number {
    return (this.ventasDelMes * this.porcentajeComision) / 100;
  }
}

function calcularNomina(empleados: Empleado[]): number {
  let total = 0;
  for (const empleado of empleados) {
    total += empleado.calcularSueldo();
  }
  return total;
}

// pruebas
const empleados: Empleado[] = [
  new EmpleadoFijo("María", 5, 500000),
  new EmpleadoPorHoras("Lucas", 2, 120, 3000),
  new EmpleadoPorComision("Sofía", 4, 4000000, 10),
  new EmpleadoFijo("Pedro", 1, 400000),
  new EmpleadoPorHoras("Carla", 7, 80, 3500),
];

for (const empleado of empleados) {
  console.log(empleado.describir());
}

console.log("Total nomina: $" + calcularNomina(empleados));
