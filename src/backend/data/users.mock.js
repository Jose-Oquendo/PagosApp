export const MOCK_USERS = [
  {
    id: 'usr-001',
    username: 'admin',
    email: 'admin@pagos.com',
    password: 'admin123',
    name: 'Administrador General',
    role: 'admin',
    isActive: true,
    permissions: [
      'payments:view',
      'payments:create',
      'payments:cancel',
      'reports:export',
      'users:manage',
    ]
  },
  {
    id: 'usr-002',
    username: 'user',
    email: 'user@pagos.com',
    password: 'caja123',
    name: 'Juan Medina',
    role: 'user',
    isActive: true,
    permissions: ['payments:view', 'payments:create']
  },
  {
    id: 'usr-003',
    username: 'user2',
    email: 'user2@pagos.com',
    password: 'bloq123',
    name: 'Carlos Suspendido',
    role: 'user',
    isActive: false,
    permissions: []
  }
]

export function findUserByIdentifier(identifier) {
  if (!identifier) return null
  const query = identifier.trim().toLowerCase()
  return (
    MOCK_USERS.find(
      (user) => user.email.toLowerCase() === query || user.username.toLowerCase() === query,
    ) || null
  )
}

export function findUserById(id) {
  if (!id) return null
  return MOCK_USERS.find((user) => user.id === id) || null
}

export function sanitizeUser(user) {
  if (!user) return null
  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}
