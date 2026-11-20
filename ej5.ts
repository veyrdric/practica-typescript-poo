// Ejercicio 5: Getters y setters

class Persona {
  private readonly dni: string;
  nombre: string;
  private _edad!: number;
  private _email!: string;

  constructor(dni: string, nombre: string, edad: number, email: string) {
    this.dni = dni;
    this.nombre = nombre;
    // uso los setters para que valide desde el principio
    this.edad = edad;
    this.email = email;
  }

  get edad(): number {
    return this._edad;
  }

  set edad(valor: number) {
    if (valor < 0) {
      throw new Error("La edad no puede ser negativa");
    }
    if (valor > 120) {
      throw new Error("La edad no puede ser mayor a 120");
    }
    this._edad = valor;
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    if (!valor.includes("@")) {
      throw new Error("El email tiene que tener @");
    }
    this._email = valor;
  }

  get esMayorDeEdad(): boolean {
    return this._edad >= 18;
  }

  // sin dni ni email
  get datosPublicos(): string {
    return `Nombre: ${this.nombre}, mayor de edad: ${this.esMayorDeEdad ? "si" : "no"}`;
  }

  getDni(): string {
    return this.dni;
  }
}

// pruebas
const persona = new Persona("40123456", "Lucía", 17, "lucia@mail.com");

console.log("Edad:", persona.edad);
console.log("Email:", persona.email);
console.log("Es mayor?", persona.esMayorDeEdad);
console.log(persona.datosPublicos);

persona.edad = 18;
console.log("Es mayor?", persona.esMayorDeEdad);

persona.nombre = "Lucía Fernández";
persona.email = "lucia.f@otro.com";
console.log(persona.datosPublicos);
console.log("DNI:", persona.getDni());

try {
  persona.edad = -1;
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  persona.edad = 150;
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  persona.email = "correo-invalido";
} catch (error) {
  console.log("Error:", (error as Error).message);
}

console.log("Edad:", persona.edad);

// persona.esMayorDeEdad = false; // no compila, es solo lectura
