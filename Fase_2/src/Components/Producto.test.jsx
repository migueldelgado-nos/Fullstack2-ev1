import { render, screen } from '@testing-library/react'
import { describe, test, expect,beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProductoComp from './ProductoComp'
import { CarritoProvider } from '../Context/CarritoContext'

beforeEach(() => {
    localStorage.clear()
})

describe('Componente Producto', () => {

    test('muestra el nombre del producto', () => {

        render(
            <CarritoProvider>
                <MemoryRouter>
                    <ProductoComp
                        id="1"
                        nombre="Primera consulta nutricional"
                        precio={35000}
                        descripcion="Evaluación nutricional"
                    />
                </MemoryRouter>
            </CarritoProvider>
        )
        expect(
            screen.getByText('Primera consulta nutricional')
        ).toBeInTheDocument()
    })
})

test('muestra el precio del producto', () => {
    render(
        <CarritoProvider>
            <MemoryRouter>
                <ProductoComp
                    id="1"
                    nombre="Primera consulta nutricional"
                    precio={35000}
                    descripcion="Evaluación nutricional"
                />
            </MemoryRouter>
        </CarritoProvider>
    )
    expect(
        screen.getByText('$35.000')
    ).toBeInTheDocument()
})

test('muestra la descripcion del producto', () => {

    render(
        <CarritoProvider>
            <MemoryRouter>
                <ProductoComp
                    id="1"
                    nombre="Primera consulta nutricional"
                    precio={35000}
                    descripcion="Evaluación nutricional"
                />
            </MemoryRouter>
        </CarritoProvider>
    )

    expect(
        screen.getByText('Evaluación nutricional')
    ).toBeInTheDocument()
})

test('muestra el boton agregar al carrito', () => {

    render(
        <CarritoProvider>
            <MemoryRouter>
                <ProductoComp
                    id="1"
                    nombre="Primera consulta nutricional"
                    precio={35000}
                    descripcion="Evaluación nutricional"
                />
            </MemoryRouter>
        </CarritoProvider>
    )

    expect(
        screen.getByRole('button', {
            name: 'Agregar al carrito'
        })
    ).toBeInTheDocument()
})