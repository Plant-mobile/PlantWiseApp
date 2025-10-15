import { Slot } from 'expo-router'
import { UserProvider } from '../services/auth/auth'

export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  )
}
