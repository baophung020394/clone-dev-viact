// context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { UserInfor, UserModel } from '../models/UserModel'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getUserByToken } from '../apis/user'

interface UserContextType {
  user: UserInfor | null
  setUserContext: (user: UserModel) => void
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUserContext: () => {},
  logout: () => {}
})

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfor | null>(null)
  const { setItem } = useLocalStorage()

  const setUserContext = async (user: UserModel) => {
    const encodeAccessToken = btoa(user.accessToken || '')
    const encodeRefreshToken = btoa(user.refreshToken || '')

    const userInfo = {
      accessToken: encodeAccessToken,
      refreshToken: encodeRefreshToken
    }

    setUser(userInfo)
    setItem('userInfo', JSON.stringify(userInfo))
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }

  return <UserContext.Provider value={{ user, setUserContext, logout }}>{children}</UserContext.Provider>
}
