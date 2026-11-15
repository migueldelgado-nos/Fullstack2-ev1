import { useCarrito } from "../Context/useCarrito";
import { Link } from "react-router-dom";
import "./Carrito.css";

function Carrito() {

  const {
    productos,
    eliminarProducto
  } = useCarrito();

  const total = productos.reduce(
    (suma, producto) => suma + producto.precio,
    0
  );

  const formatoPrecio = (precio) =>
    precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

  return (
    <section className="carrito">
      <div className="carrito-header">
        <h2>Carro de compras</h2>
        <p>Revisa tus servicios antes de finalizar la compra.</p>
      </div>

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
                <div className="producto-nombre">
                  <h2>{producto.nombre}</h2>
                </div>

                <div className="producto-descripcion">
                  {producto.descripcion && (
                    <p>{producto.descripcion}</p>
                  )}
                </div>

                <div className="producto-acciones">
                  <strong className="subtotal">
                    {formatoPrecio(producto.precio)}
                  </strong>

                  <button
                    className="eliminar"
                    onClick={() => eliminarProducto(producto.id)}
                    aria-label={`Eliminar ${producto.nombre}`}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="resumen">
          <h2>Resumen del pedido</h2>

          <div className="resumen-linea">
            <span>Servicios</span>
            <span>{productos.length}</span>
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
    </section>
  );
}

export default Carrito;
