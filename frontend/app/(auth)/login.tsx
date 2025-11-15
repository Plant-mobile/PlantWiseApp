import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  useColorScheme,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { UserContext } from "../../services/auth/auth";
import { useTranslation } from "react-i18next";
import { translation } from "../../services/translateService";
import { Colors } from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "../../components/ThemedView";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ColorScheme = useColorScheme();
  const theme = Colors[ColorScheme] ?? Colors.light;
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (userCtx && email && password) {
      const data = await userCtx.login(email, password);

      if (data) {
        router.replace("/(dashboard)/main");
      }
      // تحقق إذا كان login ناجح
      // if (data) {
      //   router.replace("/(dashboard)/main"); // توجه للمين
      // } else {
      //   // عرض رسالة الخطأ من الباك باستخدام Toast
      //   ToastMessages.error(data?.message || "فشل تسجيل الدخول");
      // }
    }
  };

  const handleRegister = async () => {
    router.replace("/regester");
  };

  if (userCtx.user == null) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={styles.container}>
            <Text style={styles.welcome}>{translation("g.welcome")}</Text>
            <Text style={styles.subtitle}>
              {translation("login.login-form")}
            </Text>

            <ThemedView
              style={[styles.inputContainer, { marginTop: height * 0.02 }]}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackgroundColor,
                    color: theme.inputTextColor,
                  },
                ]}
                placeholder={isEmailFocused ? "" : translation("g.email")}
                placeholderTextColor={theme.inputTextColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                textAlign={isRTL ? "right" : "left"}
              />
              <Image
                source={require("../../assets/auth/loginCamera.png")}
                style={[
                  styles.icon,
                  { height: 17, tintColor: theme.inputImgColor },
                ]}
              />
            </ThemedView>

            <ThemedView
              style={[styles.inputContainer, { marginTop: height * 0.02 }]}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackgroundColor,
                    color: theme.inputTextColor,
                  },
                ]}
                placeholder={isPasswordFocused ? "" : translation("g.password")}
                placeholderTextColor={theme.inputTextColor}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                textAlign={isRTL ? "right" : "left"}
              />
              <Image
                source={require("../../assets/auth/lockLogin.png")}
                style={[
                  styles.icon,
                  { height: 18, tintColor: theme.inputImgColor },
                ]}
              />
            </ThemedView>

            <ThemedView style={{ width: "100%", alignItems: "flex-end" }}>
              <TouchableOpacity>
                <Text style={styles.forgetPassword}>
                  {translation("login.forget-password")}
                </Text>
              </TouchableOpacity>
            </ThemedView>

            <LinearGradient
              colors={[
                theme.linearGradientColorOne,
                theme.linearGradientColorTwo,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text onPress={handleLogin} style={styles.btnText}>
                {translation("login.login")}
              </Text>
            </LinearGradient>

            <ThemedView style={styles.orContainer}>
              <ThemedView style={styles.line} />
              <Text style={styles.orText}>{translation("g.continue")}</Text>
              <ThemedView style={styles.line} />
            </ThemedView>

            <ThemedView style={styles.socialContainer}>
              <Image source={require("../../assets/auth/Frame_9.png")} />
            </ThemedView>

            <Text style={styles.registerText}>
              {translation("login.no-account")}{" "}
              <Text onPress={handleRegister} style={styles.registerLink}>
                {translation("login.register-here")}
              </Text>
            </Text>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.05,
    minHeight: height - 60,
  },
  welcome: {
    fontFamily: Colors.primaryFontBold,
    fontSize: width * 0.16,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  subtitle: {
    fontSize: width * 0.045,
    color: Colors.primaryColor,
    textAlign: "center",
    marginBottom: height * 0.04,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.025,
  },
  input: {
    borderRadius: 50,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.12,
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  icon: {
    position: "absolute",
    left: 20,
    top: "30%",
    width: width * 0.05,
    height: width * 0.05,
  },
  forgetPassword: {
    color: Colors.primaryColor,
    fontWeight: "600",
    marginBottom: height * 0.03,
  },
  button: {
    width: "60%",
    borderRadius: 16,
    paddingVertical: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  btnText: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.03,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.primaryColor,
  },
  orText: {
    marginHorizontal: 10,
    color: Colors.primaryColor,
    fontWeight: "600",
  },
  socialContainer: {
    alignItems: "center",
  },
  registerText: {
    color: Colors.primaryColor,
    textAlign: "center",
    marginTop: height * 0.02,
  },
  registerLink: {
    fontWeight: "bold",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 1.25, height: 1 },
    shadowOpacity: 0.25,
    elevation: 4,
  },
});
