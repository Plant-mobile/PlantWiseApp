import { createContext, useState, ReactNode, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user')
      if (storedUser) setUser(JSON.parse(storedUser))
    }
    loadUser()
  }, [])

  async function login(email: string, password: string) {
    // محاكاة تسجيل دخول
    const fakeUser = { email }
    await AsyncStorage.setItem('user', JSON.stringify(fakeUser))
    setUser(fakeUser)
    console.log('✅ logged in')
  }

  async function register(email: string, password: string) {
    console.log('register')
  }

  async function logout() {
    await AsyncStorage.removeItem('user')
    // await AsyncStorage.removeItem('hasSeenIntro')
    setUser(null)
    console.log('🚪 logged out')
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}
