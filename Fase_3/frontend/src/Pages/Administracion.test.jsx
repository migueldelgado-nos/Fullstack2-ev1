import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import Administracion from './Administracion'

describe('Componente Administracion', () => {

    test('muestra los servicios que vienen de la API', async () => {

        render(<Administracion />)

        expect(
            await screen.findByText('Primera consulta nutricional')
        ).toBeInTheDocument()

        expect(
            screen.getByText('Control nutricional')
        ).toBeInTheDocument()

        expect(
            screen.getByText('Teleconsulta nutricional')
        ).toBeInTheDocument()
    })

    test('no agrega servicios si el formulario está vacío', async () => {

        const user = userEvent.setup()
        render(<Administracion />)

        await screen.findByText('Primera consulta nutricional')
        const filasIniciales = screen.getAllByRole('row').length

        await user.click(
            screen.getByRole('button', { name: 'Agregar servicio' })
        )

        expect(screen.getAllByRole('row')).toHaveLength(filasIniciales)
    })

    test('permite agregar un nuevo servicio', async () => {

        const user = userEvent.setup()
        render(<Administracion />)

        await screen.findByText('Primera consulta nutricional')

        await user.type(
            screen.getByLabelText('Nombre del servicio'),
            'Consulta vegetariana'
        )
        await user.type(
            screen.getByLabelText('Descripción'),
            'Acompañamiento nutricional'
        )
        await user.type(screen.getByLabelText('Precio'), '30000')
        await user.click(
            screen.getByRole('button', { name: 'Agregar servicio' })
        )

        expect(
            await screen.findByText('Consulta vegetariana')
        ).toBeInTheDocument()

        expect(screen.getByText('$30.000')).toBeInTheDocument()
    })

    test('limpia los campos después de agregar un servicio', async () => {

        const user = userEvent.setup()
        render(<Administracion />)

        await screen.findByText('Primera consulta nutricional')

        await user.type(
            screen.getByLabelText('Nombre del servicio'),
            'Consulta vegetariana'
        )
        await user.type(
            screen.getByLabelText('Descripción'),
            'Acompañamiento nutricional'
        )
        await user.type(screen.getByLabelText('Precio'), '30000')
        await user.click(
            screen.getByRole('button', { name: 'Agregar servicio' })
        )

        await waitFor(() => {
            expect(
                screen.getByLabelText('Nombre del servicio')
            ).toHaveValue('')
        })

        expect(screen.getByLabelText('Precio')).toHaveValue(null)
    })

    test('permite eliminar un servicio', async () => {

        const user = userEvent.setup()
        render(<Administracion />)

        await screen.findByText('Primera consulta nutricional')

        await user.click(
            screen.getAllByRole('button', { name: 'Eliminar' })[0]
        )

        await waitFor(() => {
            expect(
                screen.queryByText('Primera consulta nutricional')
            ).not.toBeInTheDocument()
        })
    })
})
