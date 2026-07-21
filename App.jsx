import { useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  function guardarProducto(evento) {
    evento.preventDefault();

    if (nombre === "" || precio === "" || categoria === "") {
      alert("Complete todos los campos");
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre: nombre,
      precio: Number(precio),
      categoria: categoria,
    };

    setProductos([...productos, nuevoProducto]);

    setNombre("");
    setPrecio("");
    setCategoria("");
  }

  function eliminarProducto(id) {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este producto?"
    );

    if (confirmar) {
      const productosActualizados = productos.filter(
        producto => producto.id !== id
      );

      setProductos(productosActualizados);
    }
  }

  const productosFiltrados = productos.filter(producto => {
    if (filtro === "Todos") {
      return true;
    }

    return producto.categoria === filtro;
  });

  const costoTotal = productos.reduce((total, producto) => {
    return total + producto.precio;
  }, 0);

  return (
    <div className="contenedor">
      <h1>Inventario de productos</h1>

      <form onSubmit={guardarProducto}>
        <label>Nombre del producto</label>
        <input
          type="text"
          value={nombre}
          onChange={evento => setNombre(evento.target.value)}
        />

        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={evento => setPrecio(evento.target.value)}
        />

        <label>Categoría</label>
        <select
          value={categoria}
          onChange={evento => setCategoria(evento.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Oficina">Oficina</option>
          <option value="Hogar">Hogar</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Otra">Otra</option>
        </select>

        <button type="submit">Guardar</button>
      </form>

      <div className="filtro">
        <label>Filtrar por categoría</label>

        <select
          value={filtro}
          onChange={evento => setFiltro(evento.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Oficina">Oficina</option>
          <option value="Hogar">Hogar</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Otra">Otra</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>{producto.categoria}</td>
              <td>
                <button
                  type="button"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Costo total del inventario: ${costoTotal.toFixed(2)}</h2>
      <footer>
        Integrantes: Dennis Soria y Emily Fernandez
      </footer>
    </div>
  );
}

export default App;
