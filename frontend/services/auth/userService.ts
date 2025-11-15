import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessages} from "../ToastService"

const API_URL = 'http://192.168.1.121:5000/api/users/auth';

/**
 * تسجيل الدخول - Login
 */
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  // console.log(data);
  if (!data.success) {
    ToastMessages.error(data.message) 
    return false; 
  }

  // // خزن المستخدم محليًا
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  await AsyncStorage.setItem('token', data.accessToken);
  // setUser(fakeUser)
  ToastMessages.success('logged in');
  // console.log('✅ logged in')
  return data;
}

/**
 * تسجيل مستخدم جديد - Register
 */
export async function registerUser(email: string, password: string, userName: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, userName }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'فشل إنشاء الحساب');

  return data;
}

/**
 * تسجيل الخروج - Logout
 */
export async function logoutUser() {
  await AsyncStorage.multiRemove([
    'user',
    'token',
    'dot',
    'fertilizers_cache',
    'fertilizers_last_updated',
    'plants_last_updated',
    'plants_cache',
    'hasSeenIntro'
  ]);
}
