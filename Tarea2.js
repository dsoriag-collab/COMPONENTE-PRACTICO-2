/*
Ejercicio 1. Sistema de inventario inteligente
Desarrolle un programa que administre un inventario de productos utilizando un arreglo de
objetos.
Cada producto debe contener:
• código
• nombre
• categoría
• precio
• cantidad
El programa deberá implementar:
• Funciones nombradas para registrar productos.
• Funciones flecha para calcular el valor total del inventario.
• Una función de orden superior (filter) para obtener únicamente los productos cuya
cantidad sea menor a 5.
• Un ciclo for para recorrer el inventario.
• Una función constructora llamada Producto.
*/

console.log("Ejercicio 1. Sistema de inventario inteligente\n");

function Producto(codigo, nombre, categoria, precio, cantidad) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.cantidad = cantidad;
}

const inventario = [];

function registrarProducto(codigo, nombre, categoria, precio, cantidad) {
    const producto = new Producto(codigo, nombre, categoria, precio, cantidad);
    inventario.push(producto);
}

registrarProducto("P-01", "Teclado", "Periféricos", 25, 10);
registrarProducto("P-02", "Mouse", "Periféricos", 15, 3);
registrarProducto("P-03", "Monitor", "Pantallas", 180, 2);
registrarProducto("P-04", "Audífonos", "Audio", 30, 8);

const calcularValorTotal = () => {
    let total = 0;

    for (let producto of inventario) {
        total += producto.precio * producto.cantidad;
    }

    return total;
};

const productosConPocoStock = inventario.filter(producto => producto.cantidad < 5);

console.log("Inventario:");

for (let producto of inventario) {
    console.log(producto);
}

console.log("Valor total del inventario:", calcularValorTotal());
console.log("Productos con cantidad menor a 5:", productosConPocoStock);

/*
Ejercicio 2. Gestión de estudiantes
Utilizando un arreglo de estudiantes donde cada estudiante tenga un diccionario con:
• nombre
• notas
• asistencia
Desarrolle un sistema que:
• Calcule el promedio mediante funciones flecha.
• Utilice map() para generar un nuevo arreglo con los promedios.
• Emplee filter() para mostrar únicamente los aprobados.
• Clasifique el rendimiento mediante if...else anidados.
• Recorra las notas usando for y while.
*/

console.log("Ejercicio 2. Gestión de estudiantes\n");

const estudiantes = [
    {
        nombre: "Emily",
        notas: [8, 9, 7],
        asistencia: 90
    },
    {
        nombre: "Elkin",
        notas: [5, 6, 4],
        asistencia: 75
    },
    {
        nombre: "Vitinha",
        notas: [7, 8, 6],
        asistencia: 85
    }
];

const calcularPromedio = notas => {
    let suma = 0;

    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }

    return suma / notas.length;
};

const promedios = estudiantes.map(estudiante => {
    return {
        nombre: estudiante.nombre,
        promedio: calcularPromedio(estudiante.notas),
        asistencia: estudiante.asistencia
    };
});

const aprobados = promedios.filter(estudiante => estudiante.promedio >= 7);

for (let i = 0; i < promedios.length; i++) {
    let rendimiento;

    if (promedios[i].promedio >= 9) {
        rendimiento = "(Excelente)";
    } else {
        if (promedios[i].promedio >= 7) {
            rendimiento = "(Bueno)";
        } else {
            rendimiento = "(Insuficiente)";
        }
    }

    console.log(promedios[i].nombre, rendimiento);
}

let i = 0;

while (i < estudiantes.length) {
    console.log(estudiantes[i].nombre, estudiantes[i].notas);
    i++;
}

console.log("Promedios:", promedios);
console.log("Aprobados:", aprobados);

/*
Ejercicio 3. Registro de vehículos
Implemente un sistema utilizando una función constructora denominada Vehiculo.
Cada vehículo tendrá:
• placa
• marca
• año
• kilometraje
El programa deberá:
• Almacenar varios vehículos en un arreglo.
• Encontrar el vehículo con mayor kilometraje.
• Clasificar cada vehículo según su antigüedad utilizando if...else.
*/

console.log("Ejercicio 3. Registro de vehículos\n");

function Vehiculo(placa, marca, año, kilometraje) {
    this.placa = placa;
    this.marca = marca;
    this.año = año;
    this.kilometraje = kilometraje;
}

const vehiculos = [
    new Vehiculo("ABC-123", "Toyota", 2020, 60000),
    new Vehiculo("DEF-456", "Chevrolet", 2015, 120000),
    new Vehiculo("GHI-789", "Kia", 2023, 30000)
];

let mayorKilometraje = vehiculos[0];

for (let i = 0; i < vehiculos.length; i++) {
    if (vehiculos[i].kilometraje > mayorKilometraje.kilometraje) {
        mayorKilometraje = vehiculos[i];
    }

    let antigüedad = 2026 - vehiculos[i].año;
    let clasificacion;

    if (antigüedad <= 3) {
        clasificacion = "Nuevo";
    } else if (antigüedad <= 10) {
        clasificacion = "Seminuevo";
    } else {
        clasificacion = "Antiguo";
    }

    console.log(vehiculos[i].marca, clasificacion);
}

console.log("Vehículo con mayor kilometraje:", mayorKilometraje);

/*
Ejercicio 4. Biblioteca digital
Cada libro tendrá:
• título
• autor
• año
• disponible
El sistema deberá:
• Buscar libros por autor.
• Filtrar únicamente los disponibles.
• Clasificar los libros según su antigüedad.
*/

console.log("Ejercicio 4. Biblioteca digital\n");

const libros = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        año: 1967,
        disponible: true
    },
    {
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        año: 1943,
        disponible: false
    },
    {
        titulo: "You",
        autor: "Caroline Kepnes",
        año: 2014,
        disponible: true
    }
];

function buscarPorAutor(autor) {
    return libros.filter(libro => libro.autor === autor);
}

const disponibles = libros.filter(libro => libro.disponible === true);

for (let i = 0; i < libros.length; i++) {
    let antiguedad = 2026 - libros[i].año;
    let clasificacion;

    if (antiguedad <= 10) {
        clasificacion = "(Reciente)";
    } else if (antiguedad <= 50) {
        clasificacion = "(Antiguo)";
    } else {
        clasificacion = "(Muy antiguo)";
    }

    console.log(libros[i].titulo, clasificacion);
}

console.log("Libros del autor:", buscarPorAutor("Gabriel García Márquez"));
console.log("Libros disponibles:", disponibles);

/*
Ejercicio 5. Gestión de empleados
Cada empleado tendrá:
• nombre
• departamento
• salario
• años de experiencia
El sistema deberá:

• Calcular el salario promedio.
• Encontrar el salario más alto.
• Clasificar empleados según experiencia.
*/

console.log("Ejercicio 5. Gestión de empleados\n");

const empleados = [
    {
        nombre: "Ana",
        departamento: "Ventas",
        salario: 800,
        experiencia: 2
    },
    {
        nombre: "Luis",
        departamento: "Sistemas",
        salario: 1200,
        experiencia: 6
    },
    {
        nombre: "Carlos",
        departamento: "Contabilidad",
        salario: 1000,
        experiencia: 12
    }
];

let sumaSalarios = 0;
let salarioMasAlto = empleados[0];

for (let i = 0; i < empleados.length; i++) {
    sumaSalarios += empleados[i].salario;

    if (empleados[i].salario > salarioMasAlto.salario) {
        salarioMasAlto = empleados[i];
    }

    let clasificacion;

    if (empleados[i].experiencia < 3) {
        clasificacion = "(Principiante)";
    } else if (empleados[i].experiencia <= 10) {
        clasificacion = "(Experimentado)";
    } else {
        clasificacion = "(Experto)";
    }

    console.log(empleados[i].nombre, clasificacion);
}

const salarioPromedio = sumaSalarios / empleados.length;

console.log("Salario promedio:", salarioPromedio);
console.log("Salario más alto:", salarioMasAlto);

/*
Ejercicio 6. Sistema bancario
Realice una función constructora que permita tener una cuenta:
• titular
• saldo
• tipo de cuenta
Implemente:
• depósitos
• retiros
• consulta
*/

console.log("Ejercicio 6. Sistema bancario\n");

function Cuenta(titular, saldo, tipoCuenta) {
    this.titular = titular;
    this.saldo = saldo;
    this.tipoCuenta = tipoCuenta;

    this.depositar = function(cantidad) {
        this.saldo += cantidad;
    };

    this.retirar = function(cantidad) {
        if (cantidad <= this.saldo) {
            this.saldo -= cantidad;
        } else {
            console.log("Saldo insuficiente");
        }
    };

    this.consultar = function() {
        console.log("Titular:", this.titular);
        console.log("Tipo de cuenta:", this.tipoCuenta);
        console.log("Saldo:", this.saldo);
    };
}

const cuenta = new Cuenta("Vitiñi", 500, "Ahorros");

cuenta.depositar(200);
cuenta.retirar(100);
cuenta.consultar();

/*
Ejercicio 7. Sistema meteorológico
Registrar temperaturas de varias ciudades.
El programa deberá:
• Obtener máxima.
• Obtener mínima.
• Promedio.
• Clasificar clima.
• Mostrar recomendaciones mediante switch.
*/

console.log("Ejercicio 7. Sistema meteorológico\n");

const ciudades = [
    { nombre: "Quito", temperatura: 16 },
    { nombre: "Guayaquil", temperatura: 30 },
    { nombre: "Cuenca", temperatura: 12 },
    { nombre: "Manta", temperatura: 27 }
];

let maxima = ciudades[0];
let minima = ciudades[0];
let suma = 0;

for (let i = 0; i < ciudades.length; i++) {
    suma += ciudades[i].temperatura;

    if (ciudades[i].temperatura > maxima.temperatura) {
        maxima = ciudades[i];
    }

    if (ciudades[i].temperatura < minima.temperatura) {
        minima = ciudades[i];
    }

    let clima;

    if (ciudades[i].temperatura >= 25) {
        clima = "(Caluroso)";
    } else if (ciudades[i].temperatura >= 15) {
        clima = "(Templado)";
    } else {
        clima = "(Frío)";
    }

    console.log(ciudades[i].nombre, clima);

    switch (clima) {
        case "(Caluroso)":
            console.log("Recomendación: Usar ropa ligera");
            break;
        case "(Templado)":
            console.log("Recomendación: Llevar una chaqueta");
            break;
        case "(Frío)":
            console.log("Recomendación: Usar ropa abrigada");
            break;
    }
}

let promedio = suma / ciudades.length;

console.log("Temperatura máxima:", maxima);
console.log("Temperatura mínima:", minima);
console.log("Temperatura promedio:", promedio);

/*
Ejercicio 8. Sistema de reservas de hotel
Cada habitación tendrá:
• número
• tipo
• precio
• disponible
El programa deberá:
• Mostrar habitaciones disponibles.
*/

console.log("Ejercicio 8. Sistema de reservas de hotel\n");

const habitaciones = [
    { numero: 101, tipo: "Individual", precio: 30, disponible: true },
    { numero: 102, tipo: "Doble", precio: 50, disponible: false },
    { numero: 103, tipo: "Familiar", precio: 80, disponible: true }
];

const disponibles3 = habitaciones.filter(habitacion => habitacion.disponible);

console.log("Habitaciones disponibles:", disponibles3);