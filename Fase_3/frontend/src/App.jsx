import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CarritoProvider } from './Context/CarritoContext'
import { tokenExpirado } from './utils/auth'

import Navbar from './Components/Navbar'
import Inicio from './Pages/Inicio'
import Producto from './Pages/Producto'
import Login from './Pages/Login'
import DetalleProducto from './Pages/DetalleProducto'
import Registro from './Pages/Registro'
import Administracion from './Pages/Administracion'
import Carrito from './Pages/Carrito'
import Pedidos from './Pages/Pedidos'

function RutaAdmin({ children }) {

  const token = localStorage.getItem('token')
  const rol = localStorage.getItem('rol')

  if (!token || tokenExpirado(token) || rol !== 'ADMIN') {
    return <Navigate to="/login" replace />
  }

  return children
}

function RutaPedidos({ children }) {

  const token = localStorage.getItem('token')
  const rol = localStorage.getItem('rol')

  if (
    !token ||
    tokenExpirado(token) ||
    (rol !== 'ADMIN' && rol !== 'VENDEDOR')
  ) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {

  return (
    <CarritoProvider>
      <BrowserRouter>

        <Navbar />

        <main>

          <Routes>

            <Route
              path="/"
              element={<Inicio />}
            />

            <Route
              path="/servicios"
              element={<Producto />}
            />

            <Route
              path="/servicio/:id"
              element={<DetalleProducto />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/registro"
              element={<Registro />}
            />

            <Route
              path="/administracion"
              element={
                <RutaAdmin>
                  <Administracion />
                </RutaAdmin>
              }
            />

            <Route
              path="/carrito"
              element={<Carrito />}
            />

            <Route
              path="/pedidos"
              element={
                <RutaPedidos>
                  <Pedidos />
                </RutaPedidos>
              }
            />

          </Routes>

        </main>

        <footer>
          <p>© 2026 Clínica Nutricional NutriVida</p>
        </footer>

      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App
