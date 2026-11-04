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

    test('agrega un servicio nuevo', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        expect(result.current.productos).toEqual([producto])
    })

    test('no duplica un servicio que ya está en el carrito', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(producto)
        })

        expect(result.current.productos).toEqual([producto])
    })

    test('mantiene separados los servicios distintos', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(otroProducto)
        })

        expect(result.current.productos).toEqual([
            producto,
            otroProducto
        ])
    })

    test('elimina el servicio indicado', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
            result.current.agregarProducto(otroProducto)
        })

        act(() => {
            result.current.eliminarProducto(producto.id)
        })

        expect(result.current.productos).toEqual([otroProducto])
    })

    test('ignora un id inexistente al eliminar', () => {

        const { result } = renderCarrito()

        act(() => {
            result.current.agregarProducto(producto)
        })

        act(() => {
            result.current.eliminarProducto('999')
        })

        expect(result.current.productos).toEqual([producto])
    })
})
