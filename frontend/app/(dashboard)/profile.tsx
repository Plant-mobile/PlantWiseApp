import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "../../services/auth/auth";
import { useTranslation } from "react-i18next";
import { translation } from "../../services/translateService";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import Spacer from "../../components/Spacer";
import { LinearGradient } from "expo-linear-gradient";
import ThemedText from "../../components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default function profile() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.tatalogOffBackgroundColor, "#4CAF50"],
  });

  const toggleHandler = () => setIsActive((prev) => !prev);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = () => {
    if (!username || !email) {
      alert("Please fill all required fields");
      return;
    }

    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        alert("Please enter your current password");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match");
        return;
      }

      if (newPassword.length < 6) {
        alert("New password must be at least 6 characters");
        return;
      }
    }

    console.log("Profile updated:", { username, email, newPassword });
    alert("Profile updated successfully!");
  };

  const handleLogout = async () => {
    userCtx.logout();
    router.replace("/login");
  };

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.primaryBackgroundColor },
        ]}
      >
        <Text style={[{ fontSize: 28 }, styles.title]}>
          {translation("g.edit_my_profile")}
        </Text>
        <Pressable onPress={handleLogout}>
          <Image
            source={require("../../assets/profile/logOut.png")}
            style={styles.logOutImage}
            resizeMode="cover"
          />
        </Pressable>
      </View>

      {/* Main Container */}
      <View
        style={[
          styles.container,
          { backgroundColor: theme.secondaryBackgroundColor },
        ]}
      >
        {/* صورة واسم المستخدم */}
        <View style={styles.profileWrapper}>
          <View style={styles.cricle}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../assets/profile/profilePhoto.png")
              }
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
              <Image source={require("../../assets/profile/Icon-Cam.png")} />
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.username}>
            {translation("g.user")}
          </ThemedText>
        </View>

        <ThemedText style={styles.sectionTitle}>
          {translation("g.account_settings")}
        </ThemedText>

        <Spacer height={30} />

        {/* Form Inputs */}
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>
            {translation("g.user-Name")}
          </ThemedText>
          <Spacer height={10} />
          <TextInput
            style={[
              styles.input,
              styles.boxShadow,
              { backgroundColor: theme.inputBackgroundColor },
            ]}
            value={username}
            onChangeText={setUsername}
            textAlign={isRTL ? "right" : "left"}
          />
          <Spacer height={10} />

          <ThemedText style={styles.label}>{translation("g.email")}</ThemedText>
          <Spacer height={10} />
          <TextInput
            style={[
              styles.input,
              styles.boxShadow,
              { backgroundColor: theme.inputBackgroundColor },
            ]}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            textAlign={isRTL ? "right" : "left"}
          />
          <Spacer height={10} />

          <ThemedText style={styles.label}>
            {translation("g.current_password")}
          </ThemedText>
          <Spacer height={10} />
          <TextInput
            style={[
              styles.input,
              styles.boxShadow,
              { backgroundColor: theme.inputBackgroundColor },
            ]}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            textAlign={isRTL ? "right" : "left"}
          />
          <Spacer height={10} />

          <ThemedText style={styles.label}>
            {translation("g.new_password")}
          </ThemedText>
          <Spacer height={10} />
          <TextInput
            style={[
              styles.input,
              styles.boxShadow,
              { backgroundColor: theme.inputBackgroundColor },
            ]}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            textAlign={isRTL ? "right" : "left"}
          />
          <Spacer height={10} />

          <ThemedText style={styles.label}>
            {translation("g.confirm_new_password")}
          </ThemedText>
          <Spacer height={10} />
          <TextInput
            style={[
              styles.input,
              styles.boxShadow,
              { backgroundColor: theme.inputBackgroundColor },
            ]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            textAlign={isRTL ? "right" : "left"}
          />

          <Spacer height={40} />

          {/* Toggle */}
          <View style={styles.toggleRow}>
            <ThemedText style={styles.toggleLabel}>
              {translation("g.dark_theme")}
            </ThemedText>
            <TouchableOpacity onPress={toggleHandler}>
              <Animated.View style={[styles.toggle, { backgroundColor }]}>
                <Animated.View
                  style={[styles.circle, { transform: [{ translateX }] }]}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

          <Spacer height={30} />

          {/* Button */}
          <View style={styles.button}>
            <LinearGradient
              colors={[
                theme.inputBackgroundColor,
                theme.primaryBackgroundColor,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.boxShadow, { borderRadius: 16 }]}
            >
              <Text onPress={handleUpdateProfile} style={styles.btn}>
                {translation("g.update_profile")}
              </Text>
            </LinearGradient>
          </View>

          {/* <Spacer height={20} /> */}
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontFamily: "PlayfairDisplay-Bold",
    bottom: 20,
  },
  profileWrapper: {
    alignItems: "center",
    marginTop: -70,
    marginBottom: 20,
  },
  username: {
    fontFamily: Colors.primaryFontBold,
    fontSize: 22,
    marginTop: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontFamily: Colors.primaryFontBold,
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  cricle: {
    width: 146,
    height: 146,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 91,
  },
  image: {
    width: 146,
    height: 146,
    borderRadius: 73,
    borderWidth: 2,
    borderColor: "white",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 6,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 1.25, height: 1 },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    height: 50,
    width: "90%",
    alignSelf: "center",
    fontSize: 16,
    color: Colors.primaryColor,
  },
  label: {
    textTransform: "lowercase",
    fontFamily: Colors.primaryFontBold,
    textAlign: "center",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  toggleLabel: {
    fontFamily: Colors.primaryFontBold,
  },
  toggle: {
    width: 31.5,
    height: 16.1,
    borderRadius: 15.75,
    padding: 2,
    justifyContent: "center",
  },
  circle: {
    width: 14.1,
    height: 14.1,
    borderRadius: 7.25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 3,
    bottom: 1,
  },
  btn: {
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  logOutImage: {
    width: 35,
    height: 30,
    borderRadius: 73,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    position: "absolute",
    top: height * -0.06,
    right: width * -0.47,
  },
});
