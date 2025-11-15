import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { translation } from "../services/translateService";
import { Colors } from "../constants/Colors";

export default function ConfirmModal({
  visible,
  message,
  onConfirm,
  onCancel,
}) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <BlurView intensity={50} tint={colorScheme} style={styles.blur}>
          <View style={[styles.container, {backgroundColor: theme.confirmBackgroundColor, outlineColor: theme.confirmOutLine}]}>
            <Text style={[styles.title, {color: theme.confirmTextColor}]}>{translation("g.please_wait")}</Text>
            <Text style={[styles.message, {color: theme.confirmTextColor}]}>{message}</Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={[styles.btn, {backgroundColor: theme.confirmButtonBackgroundColor, borderColor: theme.confirmBorderColor}]} onPress={onConfirm}>
                <Text style={[styles.text, {color:theme.confirmButtonTextColor}]}>{translation("g.yes")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn, {backgroundColor: theme.confirmButtonBackgroundColor, borderColor: theme.confirmBorderColor}]} onPress={onCancel}>
                <Text style={[styles.text, {color:theme.confirmButtonTextColor}]}>{translation("g.no")}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  },
  container: {
    width: "80%",
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    borderRadius: 24,
    outlineStyle: 'solid',
    outlineWidth: 4 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30
  },
  btn: {
    flex: 1,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1
  },
  text: {
    fontWeight: "bold",
  },

});
