import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CarritoProvider } from './CarritoContext'
import { useCarrito } from './useCarrito'

const wrapper = ({ children }) => (
    <CarritoProvider>{children}</CarritoProvider>
)

const producto = {
    id: '1',
    nombre: 'Primera consulta nutricional',
    precio: 35000
}

const otroProducto = {
    id: '2',
    nombre: 'Control nutricional',
    precio: 25000
}

function renderCarrito() {
    return renderHook(() => useCarrito(), { wrapper })
}

describe('CarritoContext', () => {

    test('inicia con el carrito vacío', () => {

        const { result } = renderCarrito()

        expect(result.current.productos).toEqual([])
    })

    test('agrega un producto nuevo con cantidad 1', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        expect(result.current.productos).toEqual([
            { ...producto, cantidad: 1 }
        ])
    })

    test('incrementa la cantidad si el producto ya existe', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(producto)
        })

        expect(result.current.productos).toEqual([
            { ...producto, cantidad: 2 }
        ])
    })

    test('mantiene separados los productos distintos', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(otroProducto)
        })

        expect(result.current.productos).toHaveLength(2)
        expect(result.current.productos).toEqual([
            { ...producto, cantidad: 1 },
            { ...otroProducto, cantidad: 1 }
        ])
    })

    test('aumenta la cantidad de un producto', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        act(() => {
            result.current.cambiarCantidad(producto.id, 1)
        })

        expect(result.current.productos[0].cantidad).toBe(2)
    })

    test('disminuye la cantidad de un producto', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(producto)
        })

        act(() => {
            result.current.cambiarCantidad(producto.id, -1)
        })

        expect(result.current.productos[0].cantidad).toBe(1)
    })

    test('no permite que la cantidad baje de 1', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        act(() => {
            result.current.cambiarCantidad(producto.id, -1)
        })

        expect(result.current.productos[0].cantidad).toBe(1)
    })

    test('ignora un id inexistente al cambiar la cantidad', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        act(() => {
            result.current.cambiarCantidad('999', 1)
        })

        expect(result.current.productos).toEqual([
            { ...producto, cantidad: 1 }
        ])
    })

    test('elimina el producto indicado', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(otroProducto)
        })

        act(() => {
            result.current.eliminarProducto(producto.id)
        })

        expect(result.current.productos).toEqual([
            { ...otroProducto, cantidad: 1 }
        ])
    })

    test('ignora un id inexistente al eliminar', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        act(() => {
            result.current.eliminarProducto('999')
        })

        expect(result.current.productos).toEqual([
            { ...producto, cantidad: 1 }
        ])
    })
})
