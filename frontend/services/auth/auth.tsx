// import { createContext, useState, ReactNode, useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// interface UserContextType {
//   user: any
//   login: (email: string, password: string) => Promise<void>
//   register: (email: string, password: string, userName: string) => Promise<void>
//   logout: () => Promise<void>
// }

// export const UserContext = createContext<UserContextType | null>(null)

// export function UserProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<any>(null)

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedUser = await AsyncStorage.getItem('user')
//       if (storedUser) setUser(JSON.parse(storedUser))
//     }
//     loadUser()
//   }, [])

//   async function login(email: string, password: string) {

//     const response = await fetch('http://192.168.1.121:5000/api/users/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
// });
//     const fakeUser = { email }
//     await AsyncStorage.setItem('user', JSON.stringify(fakeUser))
//     setUser(fakeUser)
//     console.log('✅ logged in')
//   }

//   async function register(email: string, password: string, userName) {
//     console.log('register')
//   }

//   async function logout() {
//     await AsyncStorage.removeItem('user')
//     await AsyncStorage.removeItem('dot')
//     await AsyncStorage.removeItem('fertilizers_cache')
//     await AsyncStorage.removeItem('fertilizers_last_updated')
//     await AsyncStorage.removeItem('plants_last_updated')
//     await AsyncStorage.removeItem('plants_cache')
//     setUser(null)
//     console.log('🚪 logged out')
//   }

//   return (
//     <UserContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser, logoutUser } from "./userService";

interface UserContextType {
  user: any;
  token: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    userName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token")
      if (storedUser) setUser(JSON.parse(storedUser));
      if (token) setToken(token);
    };
    loadUser();
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);
    if(!data){
      return false;
    }
    if(data.user) {
      setUser(data.user);
      setToken(data.accessToken)
    };
    return data.success ;
  }

  async function register(email: string, password: string, userName: string) {
    const data = await registerUser(email, password, userName);
      setUser(data.user);
  }

  async function logout() {
    await logoutUser();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
