import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CarritoProvider } from '../Context/CarritoContext'

export function renderConCarrito(ui, { route = '/' } = {}) {
  return render(
    <CarritoProvider>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </CarritoProvider>
  )
}

export function renderConRuta(ui, { route = '/', path = '*' } = {}) {
  return render(
    <CarritoProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    </CarritoProvider>
  )
}
