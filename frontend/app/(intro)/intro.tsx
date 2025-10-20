import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import {useTranslation} from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { translation } from '../../services/translateService'
import IntroContent from '../../components/introContent'
import { Colors } from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';


export default function Intro() {
  const ColorScheme = useColorScheme()
  const theme = Colors[ColorScheme] ?? Colors.light
  const router = useRouter()
  const {i18n} = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [dot, setDot] = useState<string | null>(null);

    useEffect(() => {
    const setIntroSeen = async () => {
      const dot =  await AsyncStorage.getItem('dot');
      setDot(dot);
    };
    setIntroSeen();
  }, []);

  const handleContinue = async () => {
    if(dot == 'one') {
      await AsyncStorage.setItem('dot', 'two')
      setDot('two');

    }else if (dot == 'two') {
      await AsyncStorage.setItem('dot', 'three')
      setDot('three');
    }else {
      await AsyncStorage.setItem('hasSeenIntro', 'true')
      router.replace('/(auth)/login')
    }
  }

  const renderView = () => {
  switch(dot) {
    case 'one':
      return <IntroContent  
      title = {translation('g.title-one')} 
      about = {translation('g.about-one')} 
      img = {'flower'}
      titleSize={60}
      textSize={32}
      lineHeight={55}
      />;
    case 'two':
      return <IntroContent  
      title = {translation('g.title-two')} 
      about = {translation('g.about-two')} 
      img = {'camera'}
      titleSize={46}
      textSize={26}
      lineHeight={33}
      isTextLeft = {true}
      />;
    case 'three':
      return <IntroContent  
      title = {translation('g.title-two')} 
      about = {translation('g.about-three')} 
      secondTitle = {translation('g.title-three')}
      hasImg = {false}
      titleSize={46}
      textSize={26}
      lineHeight={30}
      isTextLeft = {true}
      />;
    default:
      return null;
  }
};

 const arrowAnim = useRef(new Animated.Value(0)).current;



  return (
  <View style={[styles.body, {backgroundColor: theme.primaryBackgroundColor}]}>

    {renderView()}




    <View>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, {borderColor: Colors.dotsBorderColor}, dot =='one' && {backgroundColor: Colors.primaryColor, borderColor: Colors.primaryColor}]} />
          <View style={[styles.dot, {borderColor: Colors.dotsBorderColor}, dot =='two' && {backgroundColor: Colors.primaryColor, borderColor: Colors.primaryColor}]} />
          <View style={[styles.dot, {borderColor: Colors.dotsBorderColor}, dot =='three' && {backgroundColor: Colors.primaryColor, borderColor: Colors.primaryColor}]} />
        </View>
        <TouchableOpacity style={[ isRTL && { left: 20, right: null }, ]} onPress={handleContinue}>
          <LinearGradient
            colors={[theme.inputBackgroundColor, theme.primaryBackgroundColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {dot =='three' ?  translation('g.start'): translation('g.next')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
    </View>
  </View>
  );
}



const styles = StyleSheet.create({
  body: {
    height :'100%',
  },
  button: {
    position: "absolute",
    bottom:30,
    right: 20,
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius:12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
    textRow: {
      top: 2,
      color: '#fff',
      fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
    marginTop : 20,
    zIndex :99,
    position: 'absolute',
    bottom : 70,
    right: 145
  },
  dot: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
  },

});