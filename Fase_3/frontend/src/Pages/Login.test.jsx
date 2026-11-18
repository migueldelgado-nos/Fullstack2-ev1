import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Login from './Login'

function renderLogin() {
    return render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
}

describe('Componente Login', () => {

    test('muestra el formulario de inicio de sesión', () => {

        renderLogin()

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
        renderLogin()

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'correoincorrecto'
        )
        await user.type(screen.getByLabelText('Contraseña'), '1234')
        await user.click(screen.getByRole('button', { name: 'Ingresar' }))

        expect(
            screen.getByText('El correo electrónico no es válido')
        ).toBeInTheDocument()
    })

    test('muestra error si la contraseña es muy corta', async () => {

        const user = userEvent.setup()
        renderLogin()

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'cliente@nutrivida.cl'
        )
        await user.type(screen.getByLabelText('Contraseña'), '123')
        await user.click(screen.getByRole('button', { name: 'Ingresar' }))

        expect(
            screen.getByText(
                'La contraseña debe tener al menos 4 caracteres'
            )
        ).toBeInTheDocument()
    })

    test('guarda la sesión en localStorage al ingresar', async () => {

        const user = userEvent.setup()
        renderLogin()

        await user.type(
            screen.getByLabelText('Correo electrónico'),
            'cliente@nutrivida.cl'
        )
        await user.type(screen.getByLabelText('Contraseña'), '1234')
        await user.click(screen.getByRole('button', { name: 'Ingresar' }))

        expect(localStorage.getItem('token')).toBe('token-de-prueba')
        expect(localStorage.getItem('rol')).toBe('CLIENTE')
        expect(localStorage.getItem('nombre')).toBe('Cliente Prueba')
    })
})
