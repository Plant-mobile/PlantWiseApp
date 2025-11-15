import "../services/translateService";
import { Slot } from "expo-router";
import { UserProvider } from "../services/auth/auth";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Asset } from "expo-asset";

export const frames = [
  require("../assets/items/loading/frame1.png"),
  require("../assets/items/loading/frame2.png"),
  require("../assets/items/loading/frame3.png"),
  require("../assets/items/loading/frame4.png"),
  require("../assets/items/loading/frame5.png"),
  require("../assets/items/loading/frame6.png"),
  require("../assets/items/loading/frame7.png"),
  require("../assets/items/loading/frame8.png"),
  require("../assets/items/loading/frame9.png"),
  require("../assets/items/loading/frame10.png"),
  require("../assets/items/loading/frame11.png"),
  require("../assets/items/loading/frame12.png"),
];

export default function RootLayout() {
  useEffect(() => {
    const setIntroSeen = async () => {
      await AsyncStorage.setItem("dot", "one");
    };
    setIntroSeen();
  }, []);
  const [fontsLoaded] = useFonts({
    PlayfairDisplay: require("../assets/font/PlayfairDisplay-VariableFont_wght.ttf"),
    "PlayfairDisplay-Italic": require("../assets/font/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
    "PlayfairDisplay-Bold": require("../assets/font/PlayfairDisplay-ExtraBold.ttf"),
  });

  

  useEffect(() => {
    const preload = async () => {
      try {
        const promises = frames.map((src) =>
          Asset.fromModule(src).downloadAsync()
        );
        await Promise.all(promises);
      } catch (err) {}
    };
    preload();
  }, []);

  return (
    <UserProvider>
      <Slot />
      <Toast />
    </UserProvider>
  );
}
