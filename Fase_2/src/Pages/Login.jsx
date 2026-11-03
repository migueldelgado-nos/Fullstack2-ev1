import { useState } from 'react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {

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

        console.log('Email:', email)
        console.log('Password:', password)
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
