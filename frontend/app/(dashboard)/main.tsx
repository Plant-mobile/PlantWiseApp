import {
  StyleSheet,
  View,
  Image,
  useColorScheme,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  Text,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../services/auth/auth'
import { useRouter } from 'expo-router'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constants/Colors'
import ThemedView from '../../components/ThemedView'
import { translation } from '../../services/translateService'
const { width, height } = Dimensions.get('window');

const Main = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const insets = useSafeAreaInsets()
  const userCtx = useContext(UserContext)
  const router = useRouter()

  const screenHeight = Dimensions.get('window').height - 60

  const tips = [
    translation("g.tip_one"),
    translation("g.tip_two"),
    translation("g.tip_three"),
    translation("g.tip_four"),
    translation("g.tip_five"),
    translation("g.tip_six"),
    translation("g.tip_seven"),
    translation("g.tip_eight"),
  ]

  const [index, setIndex] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current

  const animateText = () => {
    Animated.timing(translateX, {
      toValue: 300,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIndex((prev) => (prev + 1) % tips.length)
      translateX.setValue(-300)
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    })
  }

  useEffect(() => {
    const interval = setInterval(animateText, 3000)
    return () => clearInterval(interval)
  }, [])


  const goToPlants = () => {
    router.replace('/(dashboard)/plants')
  }

  const goToFertilizers = () => {
    router.replace('/(dashboard)/fertilizers')
  }

  const goToAI = () => {
    router.replace('/(dashboard)/scan')
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}
    >       
    <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.secondaryBackgroundColor }]}
      >
      <ThemedView style={[styles.container, { height: screenHeight }]}>
        {/* <Spacer height={20} /> */}

        {/* صورة وزخرفة */}
        <View style={{ alignItems: 'center'}}>
          <Image
            source={require('../../assets/home/homePlant.jpg')}
            style={{ borderRadius: 28, height: 140, width: width - 50 }}
          />
          <Image
            source={require('../../assets/home/homeShadow.png')}
            style={{ position: 'absolute', height: 140, borderRadius: 28, width: width - 50 }}
          />
          <View style={styles.overlay}>
            <Animated.Text
              style={[
                {
                  transform: [{ translateX }],
                },
                styles.tipText,
              ]}
            >
              {tips[index]}
            </Animated.Text>
          </View>
        </View>

        <Spacer height={30} />

        {/* المحتوى */}
        <View style={styles.contentContainer}>
          <Pressable onPress={goToAI}>
            <Image
              source={require('../../assets/home/homeAI.png')}
              style={{ width: 175, height: 175 }}
            />
          </Pressable>

          <Pressable onPress={goToFertilizers}>
            <Image
              source={require('../../assets/home/homeFertilizers.png')}
              style={{ width: 175, height: 175 }}
            />
          </Pressable>

          <Spacer height={20} />

          <Pressable onPress={goToPlants}>
            <Image
              source={require('../../assets/home/homeGuide.png')}
              style={{ width: 175, height: 175 }}
            />
          </Pressable>

          <Pressable onPress={goToPlants}>
            <Image
              source={require('../../assets/home/homeHelp.png')}
              style={{ width: 175, height: 175 }}
            />
          </Pressable>
        </View>
      </ThemedView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.secondaryBackgroundColor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 46,
    width: '80%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tipText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontFamily: Colors.primaryFontBold,
    textAlign: 'center'
  },
    scrollContainer: {
    flexGrow: 1,
  },
})
