import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {frames} from "../app/_layout"


export default function LoadingProgressBar({ progress }) {

  const frameIndex = Math.min(
    frames.length - 1,
    Math.floor(progress * frames.length)
  );

  return (
    <View style={styles.container}>
      <Image
        source={frames[frameIndex]}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 40,
  },
});
