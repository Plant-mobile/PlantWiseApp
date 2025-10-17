import { Slot } from 'expo-router'
import { UserProvider } from '../services/auth/auth'
import '../services/translateService'
import Toast from 'react-native-toast-message'


export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
      <Toast />
    </UserProvider>
  )
}
