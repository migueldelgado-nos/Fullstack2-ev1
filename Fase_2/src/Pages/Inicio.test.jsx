import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Inicio from './Inicio'

describe('Página Inicio', () => {

    test('muestra las secciones principales', () => {

        render(<Inicio />)

        expect(
            screen.getByRole('heading', { name: 'Bienvenido a NutriVida' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Sobre NutriVida' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Contacto' })
        ).toBeInTheDocument()
    })

    test('muestra los datos de contacto', () => {

        render(<Inicio />)

        expect(
            screen.getByText('Clínica Nutricional NutriVida')
        ).toBeInTheDocument()

        expect(
            screen.getByText('Temuco, Región de La Araucanía')
        ).toBeInTheDocument()
    })
})
