import { UserContext } from "../services/auth/auth";
import { useContext, useEffect, useState } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { View, ActivityIndicator, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartPhoto from "../components/startPhoto";
import { Colors } from "../constants/Colors";

export default function Index() {
  const ColorScheme = useColorScheme();
  const theme = Colors[ColorScheme] ?? Colors.light;
  const userCtx = useContext(UserContext);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (rootNavigationState?.key && userCtx) {
      setIsReady(true);
    }
  }, [rootNavigationState?.key, userCtx.user]);

  useEffect(() => {
    if (!isReady) return;

    const loadingPage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowSplash(false);

      const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");

      if (!hasSeenIntro) {
        router.replace("/(intro)/intro");
      } else {
        console.log(userCtx);
        if (userCtx.user && userCtx.token && userCtx.refreshToken) {
          router.replace("/(dashboard)/main");
        } else {
          router.replace("/(auth)/login");
        }
      }
    };

    loadingPage();
  }, [isReady, userCtx?.user]);

  if (showSplash) {
    return <StartPhoto />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
