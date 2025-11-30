import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { frames } from "../app/_layout";

export default function LoadingProgressBar() {
  const [frameIndex, setFrameIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <Image source={frames[frameIndex]} style={styles.image} />
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
