import { useContext } from 'react'
import { useCarrito } from '../Context/CarritoContext'

export function useCarrito() {
    return useContext(CarritoContext)
}
