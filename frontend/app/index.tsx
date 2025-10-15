import { UserContext } from '../services/auth/auth';
import { useContext, useEffect, useState } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const userCtx = useContext(UserContext);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false)



  useEffect(() => {
  if (rootNavigationState?.key && userCtx) {
    setIsReady(true)
  }
}, [rootNavigationState?.key, userCtx.user])


useEffect(() => {
  if (!isReady) return
  const loadingPage = async () =>{

      const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro')

      const timeout = setTimeout(() => {
      if(!hasSeenIntro){
        router.replace('/(intro)/intro')
      }else {
        if (userCtx.user) {
          router.replace('/(dashboard)/main')
        } else {
          router.replace('/(auth)/login')
        }
      }
      }, 0);
    
      return () => clearTimeout(timeout);
  }

  loadingPage()
}, [isReady, userCtx?.user])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
