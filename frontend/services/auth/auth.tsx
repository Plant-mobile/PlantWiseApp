import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser, logoutUser } from "./userService";
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
  ) => Promise<void>;
  logout: () => Promise<void>;
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
    setUser(data.user);
  }

  async function logout() {
    await logoutUser();
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  }

  return (
    <UserContext.Provider
      value={{ user, token, refreshToken, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}
