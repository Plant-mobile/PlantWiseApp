import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Image,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { translation } from "../services/translateService";
import { Colors } from "../constants/Colors";
const { width, height } = Dimensions.get("window");

export default function ErrorModal({ visible, onConfirm }) {
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
        <BlurView intensity={50} style={styles.blur}>
          <View
            style={[
              styles.modelContainer,
              {
                backgroundColor: theme.confirmBackgroundColor,
                outlineColor: theme.confirmOutLine,
              },
            ]}
          >
            <View
              style={[
                styles.doneCricle,
                {
                  backgroundColor: Colors.primaryColor,
                  borderColor: theme.bordercricleColor,
                },
              ]}
            >
              <Image
                source={require("../assets/items/error/error.png")}
                style={{ width: 100 }}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.message, { color: theme.confirmTextColor }]}>
              {translation("errors.LOGOUT_REQUIRED")}
            </Text>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: theme.confirmButtonBackgroundColor,
                    borderColor: theme.confirmBorderColor,
                  },
                ]}
                onPress={onConfirm}
              >
                <Text
                  style={[styles.text, { color: theme.confirmButtonTextColor }]}
                >
                  {translation("g.ok")}
                </Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    width: width * 0.7,
    fontFamily: Colors.primaryFontBold,
  },
  modelContainer: {
    width: "80%",
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    borderRadius: 24,
    outlineStyle: "solid",
    outlineWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  doneCricle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    position: "absolute",
    top: -60,
    left: "50%",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    width: 100,
  },
  btn: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontFamily: Colors.primaryFontBold,
  },
});
