import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Registro from './Registro'

describe('Componente Registro', () => {

    test('muestra error si el nombre esta vacio', async () => {

        const user = userEvent.setup()

        render(<Registro />)

        await user.click(
            screen.getByRole('button', {
                name: 'Registrarse'
            })
        )

        expect(
            screen.getByText('Debe ingresar su nombre')
        ).toBeInTheDocument()
    })

    test('muestra error si el correo no es valido', async () => {

        const user = userEvent.setup()

        render(<Registro />)

        await user.type(
            screen.getByLabelText('Nombre'),
            'Miguel'
        )

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'correoincorrecto'
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Registrarse'
            })
        )

        expect(
            screen.getByText('El correo electrónico no es válido')
        ).toBeInTheDocument()
    })

    test('muestra error si la contraseña es muy corta', async () => {

        const user = userEvent.setup()

        render(<Registro />)

        await user.type(
            screen.getByLabelText('Nombre'),
            'Miguel'
        )

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'miguel@correo.cl'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '123'
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Registrarse'
            })
        )

        expect(
            screen.getByText(
                'La contraseña debe tener al menos 4 caracteres'
            )
        ).toBeInTheDocument()
    })

})