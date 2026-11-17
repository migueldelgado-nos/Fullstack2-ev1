export function tokenExpirado(token) {

    if (!token) {
        return true
    }

    try {

        const payload = JSON.parse(
            atob(token.split('.')[1])
        )

        const ahora = Date.now() / 1000

        return payload.exp < ahora

    } catch (error) {

        return true
    }
}