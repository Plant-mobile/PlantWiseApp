import { createContext, ReactNode, useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginUser,
  registerUser,
  logoutUser,
  sendEmailUser,
  verifyResetCodeUser,
  resetPasswordUser,
} from "./userService";
import { ToastMessages } from "../ToastService";

interface UserContextType {
  user: any;
  token: any;
  refreshToken: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    userName: string
  ) => Promise<boolean>;
  sendEmail: (email: string) => Promise<boolean>;
  verifyResetCode: (email: string, code: string) => Promise<any>;
  resetPassword: (token: string, newPassord: string) => Promise<boolean>;
  logout: (token: string, refreshToken: string) => Promise<string>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [refreshToken, setRefreshToken] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (storedUser) setUser(JSON.parse(storedUser));
      if (token) setToken(token);
      if (refreshToken) setRefreshToken(refreshToken);
    };
    loadUser();
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUser(email, password);
    if (!data.success || !data.user) {
      ToastMessages.error(data.message);
      return data.success;
    }
    setUser(data.user);
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);
    ToastMessages.success("Logged in!");
    return data.success;
  }

  async function register(email: string, password: string, userName: string) {
    const data = await registerUser(email, password, userName);
    if (!data.success) {
      ToastMessages.error(data.message);
      return data.success;
    }
    setUser(data.user);
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);
    ToastMessages.success("User Created!");
    return data.success;
  }

  async function sendEmail(email: string) {
    const data = await sendEmailUser(email);
    if (!data.success) {
      ToastMessages.error(data.message);
      return data.success;
    }
    return data.success;
  }

  async function verifyResetCode(email: string, code: string) {
    const data = await verifyResetCodeUser(email, code);
    if (!data.success) {
      ToastMessages.error(data.message);
      return data;
    }
    return data;
  }

  async function resetPassword(token: string, newPassord: string) {
    const data = await resetPasswordUser(token, newPassord);
    if (!data.success) {
      ToastMessages.error(data.message);
      return data.success;
    }
    return data.success;
  }

  async function logout(token: string, refreshToken: string) {
    router.replace("/login");
    const data = await logoutUser(token, refreshToken);
    if (!data.success) {
      ToastMessages.error(data.message);
      return data;
    }
    ToastMessages.success(data.message);
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    await AsyncStorage.multiRemove([
      "user",
      "token",
      "refreshToken",
      "dot",
      "fertilizers_cache",
      "fertilizers_last_updated",
      "plants_last_updated",
      "plants_cache",
    ]);
    return true;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        refreshToken,
        login,
        register,
        sendEmail,
        verifyResetCode,
        resetPassword,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
