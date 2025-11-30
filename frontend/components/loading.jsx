import React from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";
import { Colors } from "../constants/Colors";

export default function Loading({ text, visible }) {



 

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <BlurView intensity={40} style={styles.blur}>
          
          <ActivityIndicator size="250" color="#1CA739" />

          <Text style={styles.text}>{text}</Text>

        </BlurView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  circleContainer: {
    width: 260,
    height: 260,
    position: "absolute",
  },

  dot: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 0 },
  },

  text: {
    position: "absolute",
    fontSize: 25,
    color: Colors.primaryColor,
    fontWeight: "600",
    letterSpacing: 2,
    fontFamily: Colors.primaryFontBold
  },
});
