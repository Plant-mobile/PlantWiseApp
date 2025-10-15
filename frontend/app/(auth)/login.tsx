import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { UserContext } from '../../services/auth/auth';

export default function LoginScreen() {
  const router = useRouter();
  const userCtx = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    if (userCtx && email && password) {
      userCtx.login(email, password)

      router.replace('/(dashboard)/main'); 
    }
  };
if(userCtx.user == null){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="تسجيل الدخول" onPress={handleLogin} />
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});
