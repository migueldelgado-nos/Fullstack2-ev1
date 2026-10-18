import { useState } from 'react'

function Registro() {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {

        event.preventDefault()

        if (nombre.trim() === '') {
            setError('Debe ingresar su nombre')
            setMensaje('')
            return
        }

        if (!email.includes('@')) {
            setError('El correo electrónico no es válido')
            setMensaje('')
            return
        }

        if (password.length < 4) {
            setError('La contraseña debe tener al menos 4 caracteres')
            setMensaje('')
            return
        }

        setError('')
        setMensaje('Usuario registrado correctamente')

        setNombre('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="container mt-4">

            <h1>Registro de Usuario</h1>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label className="form-label">
                        Nombre
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Contraseña
                    </label>

                    <input
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

                {mensaje && (
                    <div className="alert alert-success">
                        {mensaje}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Registrarse
                </button>

            </form>

        </div>
    )
}

export default Registro