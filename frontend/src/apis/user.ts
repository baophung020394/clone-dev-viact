import axiosClient from './axiosClient'

export const getUserByToken = async (accessToken: string) => {
  try {
    const response = await axiosClient.post('/auth/verify', { accessToken: accessToken })
    return response.data
  } catch (error) {
    // throw new Error('Registration failed')
  }
}
