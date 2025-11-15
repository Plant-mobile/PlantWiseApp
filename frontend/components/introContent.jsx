import {
  Image,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Dimensions,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import Spacer from "./Spacer";
import i18n, { isAppRTL } from "../services/translateService";

const { width, height } = Dimensions.get("window");

const images = {
  flower: require("../assets/intro/flower.png"),
  camera: require("../assets/intro/camera.png"),
};

const IntroContent = ({
  title,
  secondTitle = null,
  about,
  img = null,
  hasImg = true,
  titleSize = width * 0.1,
  textSize = i18n.language == "ar" ? width * 0.05 : 18,
  lineHeight = 28,
  isTextLeft = false,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const isRTL = i18n.language == "ar";
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}
    >
      <View style={[styles.header]}>
        <Text style={[styles.title, { fontSize: titleSize, color: theme.headerTextColor }]}>{title}</Text>
      </View>

      <View
        style={[
          styles.container,
          { backgroundColor: theme.secondaryBackgroundColor },
        ]}
      >
        {hasImg && (
          <View
            style={[
              styles.circle,
              { backgroundColor: theme.cricleBackgroundColor, borderColor: theme.bordercricleColor },
            ]}
          >
            <Image source={images[img]} style={styles.image} />
          </View>
        )}

        {secondTitle && <Text style={[styles.secondTitle, {color: theme.headerTextColor}]}>{secondTitle}</Text>}

        <Spacer height={20} />

        <Text
  style={[
    styles.description,
    {
      color: theme.textColor,
      fontSize: textSize,
      textAlign: isTextLeft
        ? (isAppRTL ? 'right' : 'left') 
        : 'center', 
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: height,
    backgroundColor: "red",
  },
  title: {
    textAlign: "center",
    fontFamily: Colors.primaryFontBold,
  },
  secondTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontFamily: Colors.primaryFont,
    fontWeight: "800",
    // height: height * 3
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  circle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4
  },
});
