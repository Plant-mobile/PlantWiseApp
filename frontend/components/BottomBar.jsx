import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Image } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets(); // ✅ Safe area support

  const homeLift = useRef(new Animated.Value(0)).current;
  const scanLift = useRef(new Animated.Value(0)).current;
  const saveLift = useRef(new Animated.Value(0)).current;
  const profileLift = useRef(new Animated.Value(0)).current;

  const animateIcon = (animatedValue, isActive) => {
    Animated.spring(animatedValue, {
      toValue: isActive ? -35 : 0,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  useEffect(() => {
    animateIcon(homeLift, pathname === '/main');
    animateIcon(scanLift, pathname === '/scan');
    animateIcon(saveLift, pathname === '/plants');
    animateIcon(profileLift, pathname === '/profile');
  }, [pathname]);

  const handleHomePress = () => {
    if (pathname !== '/main') router.push('/(dashboard)/main');
  };
  const handleScanPress = () => {
    if (pathname !== '/scan') router.push('/(dashboard)/scan');
  };
  const handlePlantsPress = () => {
    if (pathname !== '/plants') router.push('/(dashboard)/plants');
  };
  const handleProfilePress = () => {
    if (pathname !== '/profile') router.push('/(dashboard)/profile');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Pressable onPress={handleHomePress} style={styles.iconContainer}>
        {pathname === '/main' && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require('../assets/homeIcon.png')}
          style={[
            styles.icon,
            { width: 36, height: 34, transform: [{ translateY: homeLift }] },
          ]}
        />
      </Pressable>

      <Pressable onPress={handleScanPress} style={styles.iconContainer}>
        {pathname === '/scan' && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require('../assets/scanIcon.png')}
          style={[
            styles.icon,
            { width: 31, height: 31, transform: [{ translateY: scanLift }] },
          ]}
        />
      </Pressable>

      <Pressable onPress={handlePlantsPress} style={styles.iconContainer}>
        {pathname === '/plants' && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require('../assets/saveIcon.png')}
          style={[
            styles.icon,
            { width: 28, height: 33, transform: [{ translateY: saveLift }] },
          ]}
        />
      </Pressable>

      <Pressable onPress={handleProfilePress} style={styles.iconContainer}>
        {pathname === '/profile' && <View style={styles.activeCircle} />}
        <Animated.Image
          source={require('../assets/profileIcon.png')}
          style={[
            styles.icon,
            { width: 28, height: 33, transform: [{ translateY: profileLift }] },
          ]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
  activeCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    bottom: 0,
    zIndex: -1,
  },
});

export default BottomBar;
