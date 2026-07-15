import { useEffect, useState } from "react";
import "./App.css";

// Categorías disponibles para registrar y filtrar productos
const CATEGORIAS = [
  "Tecnología",
  "Oficina",
  "Hogar",
  "Alimentos",
  "Otra",
];

// Formulario reutilizable para registrar y editar productos
function FormularioProducto({productoEditando, onGuardar, onCancelar}) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState("");

  // Carga los datos cuando se selecciona un producto para editar
  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre);
      setPrecio(productoEditando.precio);
      setCategoria(productoEditando.categoria);
    } else {
      limpiarFormulario();
    }
  }, [productoEditando]);

  // Limpia todos los campos del formulario
  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setCategoria("");
    setError("");
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const precioNumero = Number(precio);

    // Validaciones obligatorias
    if (!nombre.trim()) {
      return setError("Ingrese el nombre del producto.");
    }

    if (precio === "") {
      return setError("Ingrese el precio del producto.");
    }

    if (Number.isNaN(precioNumero)) {
      return setError("El precio debe ser numérico.");
    }

    if (precioNumero <= 0) {
      return setError("El precio debe ser mayor que cero.");
    }

    if (!categoria) {
      return setError("Seleccione una categoría.");
    }

    // Envía el producto al componente principal
    onGuardar({
      id: productoEditando?.id,
      nombre: nombre.trim(),
      precio: precioNumero,
      categoria,
    });

    limpiarFormulario();
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    onCancelar();
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <h2>{productoEditando ? "Editar producto" : "Registrar producto"}</h2>

      <label>
        Nombre
        <input
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
        />
      </label>

      <label>
        Precio
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={precio}
          onChange={(evento) => setPrecio(evento.target.value)}
        />
      </label>

      <label>
        Categoría
        <select
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option value="">Seleccione una categoría</option>

          {CATEGORIAS.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="error">{error}</p>}

      <div className="botones-formulario">
        <button type="submit">
          {productoEditando ? "Actualizar" : "Guardar"}
        </button>

        {productoEditando && (
          <button
            type="button"
            className="boton-cancelar"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

// Tabla reutilizable para mostrar los productos
function TablaProductos({ productos, onEditar, onEliminar }) {
  return (
    <div className="contenedor-tabla">
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
          {productos.length === 0 ? (
            <tr>
              <td colSpan="4" className="sin-productos">
                No se encontraron productos.
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.categoria}</td>
                <td className="acciones">
                  <button
                    className="boton-editar"
                    onClick={() => onEditar(producto)}
                  >
                    Editar
                  </button>

                  <button
                    className="boton-eliminar"
                    onClick={() => onEliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  // Estado principal del inventario
  const [productos, setProductos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [productoEditando, setProductoEditando] = useState(null);

  // Registra un producto nuevo o actualiza uno existente
  const guardarProducto = (producto) => {
    if (producto.id) {
      setProductos((productosActuales) =>
        productosActuales.map((productoActual) =>
          productoActual.id === producto.id ? producto : productoActual,
        ),
      );
    } else {
      const nuevoProducto = {
        ...producto,
        id: Date.now(),
      };

      setProductos((productosActuales) => [
        ...productosActuales,
        nuevoProducto,
      ]);
    }

    setProductoEditando(null);
  };

  // Elimina un producto después de solicitar confirmación
  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este producto?",
    );

    if (!confirmar) return;

    setProductos((productosActuales) =>
      productosActuales.filter((producto) => producto.id !== id),
    );

    // Cancela la edición si se elimina el producto editado
    if (productoEditando?.id === id) {
      setProductoEditando(null);
    }
  };

  // Filtra los productos según la categoría seleccionada
  const productosFiltrados =
    categoriaFiltro === "Todos"
      ? productos
      : productos.filter(
          (producto) => producto.categoria === categoriaFiltro,
        );

  // Suma los precios de todos los productos, no solo los filtrados
  const costoTotal = productos.reduce(
    (total, producto) => total + producto.precio,
    0,
  );

  return (
  <main className="pagina">
    {/* Encabezado principal */}
    <header className="encabezado">
      <p className="encabezado-etiqueta">GESTIÓN DE INVENTARIO</p>
      <h1>Catálogo de productos</h1>
      <p className="encabezado-descripcion">
        Registra, consulta y administra los productos de la empresa.
      </p>
    </header>

    {/* Formulario y resumen */}
    <section className="panel-principal">
      <FormularioProducto
        productoEditando={productoEditando}
        onGuardar={guardarProducto}
        onCancelar={() => setProductoEditando(null)}
      />

      <aside className="panel-resumen">
        <div>
          <h2>Resumen</h2>
          <p className="texto-secundario">
            Información actual del inventario
          </p>
        </div>

        <div className="estadisticas">
          <div className="estadistica">
            <span>Productos registrados</span>
            <strong>{productos.length}</strong>
          </div>

          <div className="estadistica">
            <span>Costo total</span>
            <strong>${costoTotal.toFixed(2)}</strong>
          </div>
        </div>

        <label className="filtro">
          Filtrar por categoría

          <select
            value={categoriaFiltro}
            onChange={(evento) =>
              setCategoriaFiltro(evento.target.value)
            }
          >
            <option value="Todos">Todos</option>

            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>
      </aside>
    </section>

    {/* Tabla de productos */}
    <section className="seccion-productos">
      <div className="encabezado-tabla">
        <div>
          <h2>Productos registrados</h2>

          <p>
            Mostrando {productosFiltrados.length} de {productos.length} productos
          </p>
        </div>
      </div>

      <TablaProductos
        productos={productosFiltrados}
        onEditar={setProductoEditando}
        onEliminar={eliminarProducto}
      />
    </section>

    <footer className="pie-pagina">
      <p>Desarrollado por: Nombre 1, Nombre 2 y Nombre 3</p>
    </footer>
  </main>
);
}

export default App;