import { useCarrito } from "../Context/CarritoContext";
import { Link } from "react-router-dom";
import "./Carrito.css";

function Carrito() {

  const {
    productos,
    cambiarCantidad,
    eliminarProducto
  } = useCarrito();

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
        <p>Revisa tus servicios antes de finalizar la compra.</p>
      </header>

      <div className="carrito-layout">
        <section className="productos">
          {productos.length === 0 ? (
            <div className="carrito-vacio">
              <h2>Tu carro está vacío</h2>
              <p>Agrega servicios para comenzar tu compra.</p>
              <Link to="/">Volver a la tienda</Link>
            </div>
          ) : (
            productos.map((producto) => (
              <article className="producto" key={producto.id}>
                <div className="producto-info">
                <h2>{producto.nombre}</h2>

                <div className="cantidad">

                  <button
                    onClick={() => cambiarCantidad(producto.id, -1)}
                  >
                    -
                  </button>

                  <span>
                    {producto.cantidad}
                  </span>

                  <button
                    onClick={() => cambiarCantidad(producto.id, 1)}
                  >
                    +
                  </button>

                </div>

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
            <span>Servicios</span>
            <span>
              {productos.reduce(
                (suma, producto) => suma + producto.cantidad,
                0
              )}
            </span>
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