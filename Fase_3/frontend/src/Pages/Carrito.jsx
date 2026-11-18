import { useCarrito } from '../Context/CarritoContext'
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

  const finalizarCompra = async () => {

    const token = localStorage.getItem('token')
    const usuarioId = localStorage.getItem('usuarioId')

    if (!token || !usuarioId) {
      alert('Debes iniciar sesión para finalizar la compra')
      return
    }

    const boleta = {
      usuarioId: Number(usuarioId),

      detalles: productos.map((producto) => ({
        productoId: Number(producto.id),
        cantidad: producto.cantidad || 1
      }))
    }

    try {

      const response = await fetch(
        '/api/v1/boletas',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(boleta)
        }
      )

      if (!response.ok) {
        alert('No se pudo generar la boleta')
        return
      }

      const data = await response.json()

      alert(
        `Compra realizada correctamente. Total: ${formatoPrecio(data.total)}`
      )

    } catch (error) {

      alert('No se pudo conectar con el servidor')

    }
  }

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
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    aria-label={`Eliminar ${producto.nombre}`}
                    onClick={() => eliminarProducto(producto.id)}
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
            onClick={finalizarCompra}
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
