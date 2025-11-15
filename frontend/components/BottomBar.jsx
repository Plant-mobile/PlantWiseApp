import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  useColorScheme,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../services/auth/auth";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const { user } = useContext(UserContext);

  const homeLift = useRef(new Animated.Value(0)).current;
  const scanLift = useRef(new Animated.Value(0)).current;
  const saveLift = useRef(new Animated.Value(0)).current;
  const addLift = useRef(new Animated.Value(0)).current;
  const profileLift = useRef(new Animated.Value(0)).current;

  const animateIcon = (animatedValue, isActive) => {
    Animated.spring(animatedValue, {
      toValue: isActive ? -35 : 0,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  useEffect(() => {
    animateIcon(homeLift, pathname === "/main");
    animateIcon(scanLift, pathname === "/scan");
    animateIcon(saveLift, pathname === "/plants");
    animateIcon(addLift, pathname === "/add");
    animateIcon(profileLift, pathname === "/profile");
  }, [pathname]);

  const handleHomePress = () => {
    if (pathname !== "/main") router.push("/(dashboard)/main");
  };
  const handleScanPress = () => {
    if (pathname !== "/scan") router.push("/(dashboard)/scan");
  };
  const handleAddPress = () => {
    if (pathname !== "/add") router.push("/(dashboard)/add");
  };
  const handlePlantsPress = () => {
    if (pathname !== "/plants") router.push("/(dashboard)/plants");
  };
  const handleProfilePress = () => {
    if (pathname !== "/profile") router.push("/(dashboard)/profile");
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          borderTopColor: "transparent",
        },
      ]}
    >
      <Pressable onPress={handleHomePress} style={styles.iconContainer}>
        {pathname === "/main" && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require("../assets/home/homeIcon.png")}
          style={[
            styles.icon,
            {
              width: 36,
              height: 34,
              transform: [{ translateY: homeLift }],
              tintColor: theme.iconBar,
            },
          ]}
        />
      </Pressable>

      <Pressable onPress={handleScanPress} style={styles.iconContainer}>
        {pathname === "/scan" && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require("../assets/home/scanIcon.png")}
          style={[
            styles.icon,
            {
              width: 31,
              height: 31,
              transform: [{ translateY: scanLift }],
              tintColor: theme.iconBar,
            },
          ]}
        />
      </Pressable>
      {user.isAdmin && (
        <Pressable onPress={handleAddPress} style={styles.iconContainer}>
          {pathname === "/add" && <View style={styles.activeCircle} />}
          <Animated.Image
            source={require("../assets/home/addIcon.png")}
            style={[
              styles.icon,
              {
                width: 31,
                height: 31,
                transform: [{ translateY: addLift }],
                tintColor: theme.iconBar,
              },
            ]}
          />
        </Pressable>
      )}

      <Pressable onPress={handlePlantsPress} style={styles.iconContainer}>
        {pathname === "/plants" && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require("../assets/home/saveIcon.png")}
          style={[
            styles.icon,
            {
              width: 28,
              height: 33,
              transform: [{ translateY: saveLift }],
              tintColor: theme.iconBar,
            },
          ]}
        />
      </Pressable>

      <Pressable onPress={handleProfilePress} style={styles.iconContainer}>
        {pathname === "/profile" && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require("../assets/home/profileIcon.png")}
          style={[
            styles.icon,
            {
              width: 28,
              height: 33,
              transform: [{ translateY: profileLift }],
              tintColor: theme.iconBar,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    borderTopWidth: 1,
    elevation: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    resizeMode: "contain",
  },
  activeCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    bottom: 0,
    zIndex: -1,
  },
});

export default BottomBar;
