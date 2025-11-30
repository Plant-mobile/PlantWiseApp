import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "../../services/auth/auth";
import { useTranslation } from "react-i18next";
import { translation } from "../../services/translateService";
import ThemedText from "../../components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ThemedView from "../../components/ThemedView";
import { ToastMessages } from "../../services/ToastService";
import Loading from "../../components/loading";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen() {
  const ColorScheme = useColorScheme();
  const theme = Colors[ColorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [userName, setUserName] = useState("");
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordAgainFocused, setIsPasswordAgainFocused] = useState(false);
    const [loading, setLoading] = useState(false);

  const handleLogin = () => router.replace("/login");
  const handleRegister =  async () => {
    if (userCtx && email && password && passwordAgain && userName) {
      if (password != passwordAgain) {
        ToastMessages.error(translation("register.password_not_match"));
        return;
      }
      setLoading(true);
      const data =  await userCtx.register(email, password, userName);
      if(!data) {
        setLoading(false);
        return;
      }
      setLoading(false);
      router.replace("/(dashboard)/main");
    }else {
      ToastMessages.info(translation("register.missing_data"));
    }
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <ThemedView style={styles.container}>
          <Text
            style={[
              styles.welcome,
              {
                color: Colors.primaryColor,
                marginTop: height * 0.01,
              },
            ]}
          >
            {translation("register.register")}
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: Colors.primaryColor, marginTop: height * 0.005 },
            ]}
          >
            {translation("register.register-form")}
          </Text>

          <ThemedView
            style={[styles.inputContainer, { marginTop: height * 0.005 }]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.inputTextColor,
                },
              ]}
              placeholder={isUserNameFocused ? "" : translation("g.user-Name")}
              placeholderTextColor={theme.inputTextColor}
              value={userName}
              onChangeText={setUserName}
              onFocus={() => setIsUserNameFocused(true)}
              onBlur={() => setIsUserNameFocused(false)}
              textAlign={isRTL ? "right" : "left"}
            />
            <Image
              source={require("../../assets/auth/userName.png")}
              style={[
                styles.icon,
                { height: 18, width: 14, tintColor: theme.inputImgColor },
              ]}
            />
          </ThemedView>

          <ThemedView
            style={[styles.inputContainer, { marginTop: height * 0.005 }]}
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
              source={require("../../assets/auth/email.png")}
              style={[
                styles.icon,
                { height: 17, tintColor: theme.inputImgColor },
              ]}
            />
          </ThemedView>

          <ThemedView
            style={[styles.inputContainer, { marginTop: height * 0.005 }]}
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

          <ThemedView
            style={[styles.inputContainer, { marginTop: height * 0.005 }]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.inputTextColor,
                },
              ]}
              placeholder={translation("g.password-again")}
              placeholderTextColor={theme.inputTextColor}
              secureTextEntry
              value={passwordAgain}
              onChangeText={setPasswordAgain}
              onFocus={() => setIsPasswordAgainFocused(true)}
              onBlur={() => setIsPasswordAgainFocused(false)}
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

          <LinearGradient
            colors={[
              theme.linearGradientColorOne,
              theme.linearGradientColorTwo,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <TouchableOpacity
              onPress={handleRegister}
              style={{ width: "100%", alignItems: "center" }}
            >
              <Text style={styles.btnText}>
                {translation("register.register")}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <ThemedView style={styles.orContainer}>
            <ThemedView style={styles.line} />
            <Text style={styles.orText}>{translation("g.continue")}</Text>
            <ThemedView style={styles.line} />
          </ThemedView>

          <ThemedView
            style={[styles.socialContainer, { marginTop: height * 0.005 }]}
          >
            <Image source={require("../../assets/auth/Frame_9.png")} />
          </ThemedView>

          <ThemedView style={{ marginTop: height * 0.005 }}>
            <ThemedText
              style={{
                textAlign: "center",
                color: Colors.primaryColor,
                fontWeight: 500,
              }}
            >
              {translation("register.have-account")}
              <ThemedText
                onPress={handleLogin}
                style={{ fontWeight: "bold", marginBottom: insets.bottom }}
              >
                {translation("register.login-here")}
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
      <Loading text={"GreenSight"} visible={loading} />
    </SafeAreaView>
  );
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
    color: Colors.primaryColor,
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

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     minHeight: height - 60,
//   },
//     container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: width * 0.08,
//     paddingVertical: height * 0.05,
//     minHeight: height - 60,
//   },
//   title: {
//     fontSize: 60,
//     fontFamily: Colors.primaryFontBold,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   inputContainer: {
//     width: '100%',
//     position: 'relative',
//     justifyContent: 'center',
//   },
//   input: {
//     borderRadius: 50,
//     paddingVertical: height * 0.018,
//     paddingHorizontal: width * 0.12,
//     fontSize: width * 0.045,
//     color: Colors.primaryColor,
//     fontWeight: '600',
//   },
//   icon: {
//     position: 'absolute',
//     left: 20,
//     width: 19,
//   },
//   btn: {
//     color: 'white',
//     textAlign: 'center',
//     paddingVertical: 12,
//     fontSize: 20,
//     borderRadius: 12,
//     fontWeight: 'bold',
//   },
//   button: {
//     width: '60%',
//     borderRadius: 16,
//     paddingVertical: height * 0.02,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 2 },
//     shadowOpacity: 0.25,
//     elevation: 4,
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dividerText: {
//     marginHorizontal: 10,
//     color: Colors.primaryColor,
//     fontWeight: 'bold',
//   },
//   socialContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//     btnText: {
//     width: '100%',
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: width * 0.045,
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: Colors.primaryColor,
//   },
//   orText: {
//     marginHorizontal: 10,
//     color: Colors.primaryColor,
//     fontWeight: '600',
//   },
//     orContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: height * 0.03,
//   },
// });
