import { render, screen } from '@testing-library/react'
import { describe, test, expect,beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProductoComp from './ProductoComp'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
localStorage.clear()
})

describe('Componente Producto', () => {
    test('muestra el nombre del producto', () => {
        renderProducto(
            <MemoryRouter>
                <Producto
                    id="1"
                    nombre="Primera consulta nutricional"
                    precio={35000}
                />
            </MemoryRouter>
        )
        expect(
            screen.getByText('Primera consulta nutricional')
        ).toBeInTheDocument()
    })
})

test('muestra el precio del producto', () => {
    renderProducto(
        <MemoryRouter>
            <Producto
                id="1"
                nombre="Primera consulta nutricional"
                precio={35000}
            />
        </MemoryRouter>
    )
    expect(
        screen.getByText('Precio: $35.000')
    ).toBeInTheDocument()
})