import { Image, Text, View, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import Spacer from './Spacer';

const { width, height } = Dimensions.get('window');

const images = {
  flower: require('../assets/flower.png'),
  camera: require('../assets/camera.png'),
};

const IntroContent = ({
  title,
  secondTitle = null,
  about,
  img = null,
  hasImg = true,
  titleSize = 32,
  textSize = 18,
  lineHeight = 28,
  isTextLeft = false,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.primaryBackgroundColor}]}>
      <View style={[styles.header]}>
        <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
      </View>

      <View style={[styles.container, { backgroundColor: theme.secondaryBackgroundColor }]}>
        {hasImg && (
          <View style={[styles.circle, { backgroundColor: theme.cricleBackgroundColor }]}>
            <Image source={images[img]} style={styles.image} />
          </View>
        )}

        {secondTitle && (
          <Text style={styles.secondTitle}>{secondTitle}</Text>
        )}

        <Spacer height={20} />

        <Text
          style={[
            styles.description,
            {
              color: Colors.primaryColor,
              fontSize: textSize,
              lineHeight: lineHeight,
              textAlign: isTextLeft ? 'left' : 'center',
            },
          ]}
        >
          {about}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default IntroContent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: height * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: height
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  secondTitle: {
    fontSize: 28,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontFamily: Colors.primaryFont,
    fontWeight: '800',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  circle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
