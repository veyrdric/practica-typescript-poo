// Ejercicio 3: Herencia

export class Empleado {
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  // cada subclase lo calcula a su manera
  calcularSueldo(): number {
    return 0;
  }

  describir(): string {
    return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`;
  }
}

export class EmpleadoFijo extends Empleado {
  private sueldoBase: number;

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    super(nombre, antiguedad);
    this.sueldoBase = sueldoBase;
  }

  // bono de 2% por año
  override calcularSueldo(): number {
    const bono = this.sueldoBase * 0.02 * this.antiguedad;
    return this.sueldoBase + bono;
  }
}

// pruebas, solo corren si ejecuto este archivo
if (import.meta.main) {
  const generico = new Empleado("Juan", 3);
  const fijo = new EmpleadoFijo("María", 5, 500000);
  const fijoNuevo = new EmpleadoFijo("Pedro", 0, 400000);

  console.log(generico.describir());
  console.log(fijo.describir());
  console.log(fijoNuevo.describir());
}
