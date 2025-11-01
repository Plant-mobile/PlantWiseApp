import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

import React from "react";
import { Colors } from "../../constants/Colors";
import { translation } from "../../services/translateService";
import { router } from "expo-router";

const scan = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const handleBack = () => {
    router.replace("/main");
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <TouchableOpacity
        onPress={handleBack}
        style={{
          alignSelf: "flex-start",
        }}
      >
        <Text style={[styles.back]}>
          <Image
            source={require("../../assets/items/arrow_en.png")}
          />
          {translation("g.home")}
        </Text>
      </TouchableOpacity>
      <View
        style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
      ></View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, marginLeft: 20}}
      >
        <Text>scan</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default scan;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.secondaryBackgroundColor,
  },
  back: {
    color: Colors.primaryColor,
    fontFamily: Colors.primaryFontBold,
    fontSize: 20,
    marginBottom: 10,
  },
  line: {
    width: width,
    height: 3,
  },
});
