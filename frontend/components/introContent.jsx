import { Image, Text, View, StyleSheet, useColorScheme} from 'react-native'
import { Colors } from '../constants/Colors';
import Spacer from './Spacer';


const images = {
  flower: require('../assets/flower.png'),
  camera: require('../assets/camera.png'),
};


const IntroContent  = ({ title, secondTitle = null, about, img = null, hasImg = true, titleSize = null, textSize = null, lineHeight = null, isTextLeft = false}) => {
  
  const ColorScheme = useColorScheme()
  const theme = Colors[ColorScheme] ?? Colors.light

  return (
  <>
    <View style={[styles.header, {backgroundColor: theme.primaryBackgroundColor}]}>
      <Text style={[titleSize && {fontSize : titleSize}, styles.title]}>{title}</Text>
    </View>

    <View style={[styles.container, {backgroundColor: theme.secondaryBackgroundColor}]}>
      { hasImg &&
        <View style = {[styles.cricle, {backgroundColor: theme.cricleBackgroundColor, borderRadius: 125}]}>
          <Image source={images[img]} style={styles.image} />
        </View>
      }
      { secondTitle &&
        <Text style = {{fontSize: 36, color: Colors.primaryColor, fontWeight: 'bold'}}>
          {secondTitle}
        </Text>
      }
      <Spacer height={30} />
      <Text style={[styles.description, {color: Colors.primaryColor}, textSize && {fontSize: textSize}, lineHeight && {lineHeight: lineHeight}, isTextLeft && {textAlign: 'left'}]}>
        {about}
      </Text>
    </View>
  </>
  )
}

export default IntroContent; 


const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    position: "relative"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  title: {
    color: 'white', 
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Bold'
  },
  description: {
    textAlign: 'center',
    fontFamily: Colors.primaryFont,
    fontWeight: 800
  },
  image: {
    resizeMode: 'cover',
  },
  cricle: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
