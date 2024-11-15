export type AuthResponse = Session

export type Session = {
  accessToken: string
  id: string
  refreshToken: string
  createdAt: string
  updatedAt: string
  userId: string
  user: User
}

export type User = {
  id: string
  createdAt: string
  updatedAt: string
  experience: number
  username: string
  avatar: string
}

export type SigningPayload = {
  username: string
  password: string
}

export type SignUpPayload = {
  username: string
  avatar: string
  password: string
}
