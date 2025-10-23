import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { translation } from '../../services/translateService'
import IntroContent from '../../components/introContent'
import { Colors } from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Intro() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const router = useRouter()
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const insets = useSafeAreaInsets()

  const [dot, setDot] = useState<string>('one')

  useEffect(() => {
    const checkDot = async () => {
      const storedDot = await AsyncStorage.getItem('dot')
      setDot(storedDot || 'one')
    }
    checkDot()
  }, [])

  const handleContinue = async () => {
    if (dot === 'one') {
      await AsyncStorage.setItem('dot', 'two')
      setDot('two')
    } else if (dot === 'two') {
      await AsyncStorage.setItem('dot', 'three')
      setDot('three')
    } else {
      await AsyncStorage.setItem('hasSeenIntro', 'true')
      router.replace('/(auth)/login')
    }
  }

  const renderView = () => {
    switch (dot) {
      case 'one':
        return (
          <IntroContent
            title={translation('g.title-one')}
            about={translation('g.about-one')}
            img="flower"
          />
        )
      case 'two':
        return (
          <IntroContent
            title={translation('g.title-two')}
            about={translation('g.about-two')}
            img="camera"
            isTextLeft={true}
          />
        )
      case 'three':
        return (
          <IntroContent
            title={translation('g.title-two')}
            about={translation('g.about-three')}
            secondTitle={translation('g.title-three')}
            hasImg={false}
            isTextLeft={true}
          />
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* المحتوى */}
      <View style={styles.content}>{renderView()}</View>

      {/* الأسفل */}
      <View style={[styles.footer, { paddingBottom: insets.bottom - 10 }]}>
  <View style={styles.dotsContainer}>
    {['one', 'two', 'three'].map((item, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          dot === item && {
            backgroundColor: Colors.primaryColor,
            borderColor: Colors.primaryColor,
          },
        ]}
      />
    ))}
  </View>

  <TouchableOpacity
    onPress={handleContinue}
    style={[styles.buttonWrapper, isRTL && { alignSelf: 'flex-start' }]}
  >
    <LinearGradient
      colors={[theme.inputBackgroundColor, theme.primaryBackgroundColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.button}
    >
      <Text style={styles.buttonText}>
        {dot === 'three' ? translation('g.start') : translation('g.next')}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.primaryBackgroundColor,
  },
  content: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.dotsBorderColor,
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
})
