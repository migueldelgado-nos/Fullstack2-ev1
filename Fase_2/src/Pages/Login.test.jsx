import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Login from './Login'

describe('Componente Login', () => {

    test('muestra el formulario de inicio de sesión', () => {

        render(<Login />)

        expect(
            screen.getByRole('heading', { name: 'Iniciar Sesión' })
        ).toBeInTheDocument()

        expect(
            screen.getByLabelText('Correo electrónico')
        ).toBeInTheDocument()

        expect(
            screen.getByLabelText('Contraseña')
        ).toBeInTheDocument()
    })

    test('muestra error si el correo no es válido', async () => {

        const user = userEvent.setup()

        render(<Login />)

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'correoincorrecto'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '1234'
        )

        await user.click(
            screen.getByRole('button', { name: 'Ingresar' })
        )

        expect(
            screen.getByText('El correo electrónico no es válido')
        ).toBeInTheDocument()
    })

    test('muestra error si la contraseña es muy corta', async () => {

        const user = userEvent.setup()

        render(<Login />)

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'miguel@correo.cl'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '123'
        )

        await user.click(
            screen.getByRole('button', { name: 'Ingresar' })
        )

        expect(
            screen.getByText(
                'La contraseña debe tener al menos 4 caracteres'
            )
        ).toBeInTheDocument()
    })

    test('ingresa con credenciales válidas y registra los datos', async () => {

        const user = userEvent.setup()

        const log = vi.spyOn(console, 'log').mockImplementation(() => {})

        render(<Login />)

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'miguel@correo.cl'
        )

        await user.type(
            screen.getByLabelText('Contraseña'),
            '1234'
        )

        await user.click(
            screen.getByRole('button', { name: 'Ingresar' })
        )

        expect(
            screen.queryByText('El correo electrónico no es válido')
        ).not.toBeInTheDocument()

        expect(log).toHaveBeenCalledWith('Email:', 'miguel@correo.cl')
        expect(log).toHaveBeenCalledWith('Password:', '1234')
    })
})
