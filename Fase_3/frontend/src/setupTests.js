import '@testing-library/jest-dom'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

const productosIniciales = [
    {
        id: 1,
        nombre: 'Primera consulta nutricional',
        descripcion: 'Evaluación nutricional inicial',
        precio: 35000,
        stock: 5
    },
    {
        id: 2,
        nombre: 'Control nutricional',
        descripcion: 'Seguimiento del progreso',
        precio: 25000,
        stock: 5
    },
    {
        id: 3,
        nombre: 'Teleconsulta nutricional',
        descripcion: 'Consulta realizada de manera online',
        precio: 20000,
        stock: 5
    }
]

let productos = []

function responder(data, status = 200) {
    return {
        ok: status >= 200 && status < 300,
        status,
        json: async () => data,
        text: async () =>
            typeof data === 'string' ? data : JSON.stringify(data)
    }
}

beforeEach(() => {
    localStorage.clear()
    productos = productosIniciales.map((producto) => ({ ...producto }))

    vi.stubGlobal('fetch', vi.fn(async (url, options = {}) => {
        const ruta = String(url)
        const metodo = options.method || 'GET'
        const cuerpo = options.body ? JSON.parse(options.body) : {}

        if (ruta.includes('/auth/login')) {
            return responder({
                id: 1,
                token: 'token-de-prueba',
                nombre: 'Cliente Prueba',
                rol: 'CLIENTE'
            })
        }

        if (ruta.includes('/auth/registro')) {
            return responder({ id: 9, ...cuerpo, rol: 'CLIENTE' })
        }

        if (ruta.includes('/boletas')) {
            return responder(
                metodo === 'POST' ? { id: 1, total: 35000 } : []
            )
        }

        if (ruta.includes('/productos/')) {
            const id = Number(ruta.split('/').pop())

            if (metodo === 'DELETE') {
                productos = productos.filter((producto) => producto.id !== id)
                return responder(null, 204)
            }

            if (metodo === 'PUT') {
                productos = productos.map((producto) =>
                    producto.id === id
                        ? { ...producto, ...cuerpo, id }
                        : producto
                )
                return responder(productos.find((producto) => producto.id === id))
            }

            const producto = productos.find((item) => item.id === id)
            return producto ? responder(producto) : responder({}, 404)
        }

        if (ruta.includes('/productos')) {
            if (metodo === 'POST') {
                const nuevo = { ...cuerpo, id: 99, stock: 5 }
                productos.push(nuevo)
                return responder(nuevo)
            }

            return responder(productos)
        }

        return responder({})
    }))
})

afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
})
