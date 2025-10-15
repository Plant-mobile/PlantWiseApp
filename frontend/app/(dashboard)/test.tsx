import { StyleSheet, Text, View, Button } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import React, { useContext } from 'react'
import { UserContext } from '../../services/auth/auth';
import { useRouter } from 'expo-router';


const test = () => {
  const insets = useSafeAreaInsets();
  const userCtx = useContext(UserContext)
    const router = useRouter();

    const handleLogout = async () => {
    // console.log(userCtx);
    // هنا تعمل تحقق من بيانات المستخدم (API أو أي شيء)
    // if (userCtx && email && password) {
      userCtx.logout()
      // await AsyncStorage.setItem('userToken', '12345'); // خزن رمز دخول بسيط
      router.replace('/login'); // انقل المستخدم عالصفحة الرئيسية
    // }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems:"center", paddingTop: insets.top, paddingBottom: insets.bottom  }}>
      <Button title="تسجيل الدخول" onPress={handleLogout} />
    </View>
  )
}

export default test

const styles = StyleSheet.create({})