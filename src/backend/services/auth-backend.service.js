import {
  findUserByIdentifier,
  findUserById,
  sanitizeUser,
} from '../data/users.mock'
import { createApiResponse } from '../utils/response'

export class AuthBackendService {
  #generateMockJwt(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
      JSON.stringify({
        sub: user.id,
        role: user.role,
        email: user.email,
        exp: Date.now() + 1000 * 60 * 60 * 8,
      }),
    )
    const signature = btoa('mock-signature-pagosapp')
    return `${header}.${payload}.${signature}`
  }

  #decodeTokenPayload(token) {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null
      return JSON.parse(atob(parts[1]))
    } catch {
      return null
    }
  }

  login(identifier, password) {
    if (!identifier || !password) {
      return createApiResponse.error(
        'El usuario/correo y la contraseña son requeridos',
        422,
      )
    }
    const user = findUserByIdentifier(identifier)
    if (!user) {
      return createApiResponse.error(
        'Credenciales incorrectas. Verifique su usuario y contraseña.',
        401,
      )
    }
    if (user.password !== password) {
      return createApiResponse.error(
        'Credenciales incorrectas. Verifique su usuario y contraseña.',
        401,
      )
    }
    if (!user.isActive) {
      return createApiResponse.error(
        'Esta cuenta se encuentra suspendida o inactiva. Contacte al administrador.',
        403,
      )
    }
    const token = this.#generateMockJwt(user)
    const safeUser = sanitizeUser(user)

    return createApiResponse.success(
      {
        token,
        tokenType: 'Bearer',
        expiresIn: '8h',
        user: safeUser,
      },
      'Inicio de sesión exitoso',
      200,
    )
  }

  verifyToken(token) {
    if (!token) {
      return createApiResponse.error('Token de autenticación no proporcionado', 401)
    }

    const payload = this.#decodeTokenPayload(token)
    if (!payload || !payload.sub) {
      return createApiResponse.error('Token inválido o expirado', 401)
    }

    if (payload.exp && Date.now() > payload.exp) {
      return createApiResponse.error('El token de sesión ha expirado', 401)
    }

    const user = findUserById(payload.sub)
    if (!user || !user.isActive) {
      return createApiResponse.error('El usuario asociado al token no está disponible', 401)
    }

    return createApiResponse.success(
      {
        user: sanitizeUser(user),
      },
      'Sesión válida',
      200,
    )
  }

  logout(token) {
    if (!token) {
      return createApiResponse.success(null, 'Sesión finalizada localmente', 200)
    }
    return createApiResponse.success(null, 'Sesión cerrada exitosamente', 200)
  }
}

export const authBackendService = new AuthBackendService()
