import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function Intro() {
  const router = useRouter()

  const handleContinue = async () => {

    await AsyncStorage.setItem('hasSeenIntro', 'true')
    router.replace('/(auth)/login') 
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>مرحبًا بك في تطبيقي 🌟</Text>
      <Text style={{ marginBottom: 40 }}>هذا شرح بسيط عن التطبيق.</Text>
      <Button title="ابدأ الآن" onPress={handleContinue} />
    </View>
  )
}
