import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    

    const handleSubmit = async (event) => {

        event.preventDefault()

        if (!email.includes('@')) {
            setError('El correo electrónico no es válido')
            return
        }

        if (password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres')
            return
        }

        setError('')

        try {

            const response = await fetch(
                '/api/v1/auth/login',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            )

            if (!response.ok) {
                setError('Correo o contraseña incorrectos')
                return
            }

            const data = await response.json()

            localStorage.setItem('token', data.token)
            localStorage.setItem('nombre', data.nombre)
            localStorage.setItem('rol', data.rol)
            localStorage.setItem('usuarioId', data.id)

            console.log('Login correcto')
            console.log('Usuario:', data.nombre)
            console.log('Rol:', data.rol)

            navigate('/')

        } catch (error) {

            setError('No se pudo conectar con el servidor')
        }
    }

    return (
        <section className="pagina-registro">

            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label
                        className="form-label"
                        htmlFor="loginEmail"
                    >
                        Correo electrónico
                    </label>

                    <input
                        id="loginEmail"
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label
                        className="form-label"
                        htmlFor="loginPassword"
                    >
                        Contraseña
                    </label>

                    <input
                        id="loginPassword"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Ingresar
                </button>

            </form>

        </section>
    )
}

export default Login
