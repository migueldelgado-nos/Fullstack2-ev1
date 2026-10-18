import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Inicio from './Pages/Inicio'
import Producto from './Pages/Producto'
import Login from './Pages/Login'
import DetalleProducto from './Pages/DetalleProducto'
import Registro from './Pages/Registro'
import Administracion from './Pages/Administracion'

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

      </Routes>

    </BrowserRouter>
  )
}

export default App