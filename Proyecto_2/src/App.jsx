import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './Context/CarritoContext'

import Navbar from './Components/Navbar'
import Inicio from './Pages/Inicio'
import Producto from './Pages/Producto'
import Login from './Pages/Login'
import DetalleProducto from './Pages/DetalleProducto'
import Registro from './Pages/Registro'
import Administracion from './Pages/Administracion'
import Carrito from './Pages/Carrito'



function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/productos"
          element={<Producto />}
        />

        <Route
          path="/producto/:id"
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
          element={<Administracion />}
        />

        <Route
          path="/carrito"
          element={<Carrito />}>

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App