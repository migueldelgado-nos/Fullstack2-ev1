import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Administracion from './Administracion'

describe('Componente Administracion', () => {

    test('muestra los servicios iniciales', () => {

        render(<Administracion />)

        expect(
            screen.getByText('Primera consulta nutricional')
        ).toBeInTheDocument()

        expect(
            screen.getByText('Control nutricional')
        ).toBeInTheDocument()
    })

    test('permite agregar un nuevo servicio', async () => {

        const user = userEvent.setup()

        render(<Administracion />)

        await user.type(
            screen.getByLabelText('Nombre del servicio'),
            'Consulta vegetariana'
        )

        await user.type(
            screen.getByLabelText('Precio'),
            '30000'
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Agregar servicio'
            })
        )

        expect(
            screen.getByText('Consulta vegetariana')
        ).toBeInTheDocument()
    })

    test('permite eliminar un servicio', async () => {

        const user = userEvent.setup()

        render(<Administracion />)

        const botonesEliminar = screen.getAllByRole('button', {
            name: 'Eliminar'
        })

        await user.click(botonesEliminar[0])

        expect(
            screen.queryByText('Primera consulta nutricional')
        ).not.toBeInTheDocument()
    })

})