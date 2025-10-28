import '../services/translateService'
import { Slot } from 'expo-router'
import { UserProvider } from '../services/auth/auth'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';



export default function RootLayout() {

    useEffect(() => {
    const setIntroSeen = async () => {
        await AsyncStorage.setItem('dot', 'one');
    };
    setIntroSeen();
  }, []);
  const [fontsLoaded] = useFonts({
    'PlayfairDisplay': require('../assets/font/PlayfairDisplay-VariableFont_wght.ttf'),
    'PlayfairDisplay-Italic': require('../assets/font/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
    'PlayfairDisplay-Bold': require('../assets/font/PlayfairDisplay-ExtraBold.ttf'),
  });

  return (
      <UserProvider>
        <Slot />
        <Toast />
      </UserProvider>
  )
}
