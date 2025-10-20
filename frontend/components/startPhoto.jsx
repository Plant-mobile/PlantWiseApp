import { Image, StyleSheet, View, Dimensions, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react';


const startPhoto = () => {

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start(() => {
        dot1.setValue(0);
        dot2.setValue(0);
        dot3.setValue(0);
        animateDots(); 
      });
    };

    animateDots(); 
  }, [dot1, dot2, dot3]);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <Image source={require('../assets/Sense.png')} style={styles.image} />
          <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, { opacity: dot1 }]} />
            <Animated.View style={[styles.dot, { opacity: dot2 }]} />
            <Animated.View style={[styles.dot, { opacity: dot3 }]} />
          </View>
        </View>
      </View>
  )
}

export default startPhoto

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 120,
  },
  dot: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    opacity: 0.3,
  },
});
