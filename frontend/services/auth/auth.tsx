import { createContext, useState, ReactNode, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, userName: string) => Promise<void>
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

//     const response = await fetch('http:localhost:5000/api/user/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ question: 'اشرح لي عن النباتات' }),
// });
    const fakeUser = { email }
    await AsyncStorage.setItem('user', JSON.stringify(fakeUser))
    setUser(fakeUser)
    console.log('✅ logged in')
  }

  async function register(email: string, password: string, userName) {
    console.log('register')
  }

  async function logout() {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('hasSeenIntro')
    await AsyncStorage.removeItem('dot')
    setUser(null)
    console.log('🚪 logged out')
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}
