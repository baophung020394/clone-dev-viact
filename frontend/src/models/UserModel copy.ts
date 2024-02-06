export interface UserModel {
  id: number
  username: string
  email: string
  accessToken?: string
  refreshToken?: string
  role?: string
  status: string
}