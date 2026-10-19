import { useState } from "react";
import { Link } from "react-router-dom";
import "./Carrito.css";

const productosIniciales = [
  {
    id: 1,
    nombre: "Audífonos inalámbricos",
    precio: 49990,
    cantidad: 1,
    imagen: "https://placehold.co/100x100?text=Audifonos",
  },
  {
    id: 2,
    nombre: "Smartwatch",
    precio: 79990,
    cantidad: 2,
    imagen: "https://placehold.co/100x100?text=Smartwatch",
  },
  {
    id: 3,
    nombre: "Mochila urbana",
    precio: 29990,
    cantidad: 1,
    imagen: "https://placehold.co/100x100?text=Mochila",
  },
];

function Carrito() {
  const [productos, setProductos] = useState(productosIniciales);

  const cambiarCantidad = (id, cambio) => {
    setProductos((actuales) =>
      actuales.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: Math.max(1, producto.cantidad + cambio),
            }
          : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((actuales) =>
      actuales.filter((producto) => producto.id !== id)
    );
  };

  const total = productos.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );

  const formatoPrecio = (precio) =>
    precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

  return (
    <main className="carrito">
      <header className="carrito-header">
        <h1>Carro de compras</h1>
        <p>Revisa tus productos antes de finalizar la compra.</p>
      </header>

      <div className="carrito-layout">
        <section className="productos">
          {productos.length === 0 ? (
            <div className="carrito-vacio">
              <h2>Tu carro está vacío</h2>
              <p>Agrega productos para comenzar tu compra.</p>
              <Link to="/">Volver a la tienda</Link>
            </div>
          ) : (
            productos.map((producto) => (
              <article className="producto" key={producto.id}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                />

                <div className="producto-info">
                  <h2>{producto.nombre}</h2>
                  <p>{formatoPrecio(producto.precio)}</p>
                </div>

                <div className="cantidad">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => cambiarCantidad(producto.id, -1)}
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>

                  <span>{producto.cantidad}</span>

                  <button
                    className="btn btn-success"
                    onClick={() => cambiarCantidad(producto.id, 1)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <strong className="subtotal">
                  {formatoPrecio(
                    producto.precio * producto.cantidad
                  )}
                </strong>

                <button
                  className="eliminar"
                  onClick={() => eliminarProducto(producto.id)}
                  aria-label={`Eliminar ${producto.nombre}`}
                >
                  Eliminar
                </button>
              </article>
            ))
          )}
        </section>

        <aside className="resumen">
          <h2>Resumen del pedido</h2>

          <div className="resumen-linea">
            <span>Productos</span>
            <span>
              {productos.reduce(
                (suma, producto) => suma + producto.cantidad,
                0
              )}
            </span>
          </div>

          <div className="resumen-linea">
            <span>Envío</span>
            <span>Gratis</span>
          </div>

          <hr />

          <div className="resumen-total">
            <span>Total</span>
            <strong>{formatoPrecio(total)}</strong>
          </div>

          <button
            className="finalizar"
            disabled={productos.length === 0}
            onClick={() => alert("Continuar al proceso de compra")}
          >
            Finalizar compra
          </button>

          <Link to="/" className="seguir-comprando">
            Seguir comprando
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Carrito;