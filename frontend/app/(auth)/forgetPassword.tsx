import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { translation } from "../../services/translateService";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Spacer from "../../components/Spacer";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { UserContext } from "../../services/auth/auth";
import { BlurView } from "expo-blur";
import { ToastMessages } from "../../services/ToastService";
import LoadingProgressBar from "../../components/LoadingProgressBar";
import Loading from "../../components/loading";

const { width, height } = Dimensions.get("window");
const CELL_COUNT = 6;
let passwordToken = "";

function forgetPassword() {
  const router = useRouter();
  const { sendEmail, verifyResetCode, resetPassword } = useContext(UserContext);
  const ColorScheme = useColorScheme();
  const theme = Colors[ColorScheme] ?? Colors.light;
  const [situation, setSituation] = useState("emailSituation");
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [modelShow, setModelShow] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isComplete, setIsComplete] = useState(false);

  const borderAnims = useRef(
    Array.from({ length: CELL_COUNT }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      setIsComplete(true);
      const animations = borderAnims.map((anim, index) =>
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(anim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
          }),
        ])
      );

      Animated.stagger(200, animations).start(() => {
        if (!isValid) {
          resetCodeField();
        }
      });
    } else {
      setIsComplete(false);
      borderAnims.forEach((anim) => anim.setValue(0));
    }
  }, [value, isValid]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 0.1;
      setProgress(current);
      if (current >= 1) clearInterval(interval);
    }, 500);
  }, [progress]);

  const resetCodeField = () => {
    setTimeout(() => {
      setValue("");
      borderAnims.forEach((anim) => anim.setValue(0));
    }, 500);
  };

  const handleBack = async () => {
    if (situation == "codeSituation") {
      setValue("");
      setIsValid(true);
      setSituation("emailSituation");
    } else if (situation == "emailSituation") {
      router.replace("/login");
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      ToastMessages.info("Pleace enter email");
      return;
    }
    setLoading(true);
    const data = await sendEmail(email);
    if (!data) {
      setLoading(false);
      return;
    }
    setSituation("codeSituation");
    setLoading(false);
  };

  const handleSendNewPassword = async () => {
    if (!password || !confirmpassword) {
      ToastMessages.info(translation("forgetPassword.passwordSituationText"));
      return;
    }
    if (password != confirmpassword) {
      ToastMessages.error(translation("forgetPassword.password_not_match"));
      return;
    }
    setLoading(true);
    const data = await resetPassword(passwordToken, password);
    setLoading(false);
    if (!data) {
      router.replace("/login");
      return;
    }
    setModelShow(true);
    setTimeout(() => {
      setModelShow(false);
      router.replace("/login");
    }, 2000);
  };

  const handleResetCode = async () => {
    setLoading(true);
    const data = await sendEmail(email);
    if (!data) {
      setLoading(false);
      return;
    }
    setLoading(false);
    ToastMessages.success("Code sent");
  };

  const handleSubmitCode = async (code) => {
    const data = await verifyResetCode(email, code);
    if (!data.success) {
      setIsValid(false);
      return;
    }
    setIsValid(true);

    setTimeout(() => {
      setSituation("passwordSituation");
      passwordToken = data.resetToken;
    }, 2000);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      {situation != "passwordSituation" && (
        <TouchableOpacity
          onPress={handleBack}
          style={{
            // flexDirection: isRTL ? "row-reverse" : "row",
            alignSelf: "flex-start",
          }}
        >
          <Text style={[styles.back]}>
            {situation != "passwordSituation" && (
              <Image
                source={require("../../assets/auth/forgetPassword/arrow_en.png")}
              />
            )}
            {situation == "emailSituation" &&
              translation("forgetPassword.forget_password")}
            {situation == "codeSituation" &&
              translation("forgetPassword.verify_email")}
          </Text>
        </TouchableOpacity>
      )}
      {situation == "passwordSituation" && (
        <Text
          style={[
            styles.back,
            {
              textAlign: "center",
              justifyContent: "center",
              width: width,
            },
          ]}
        >
          {translation("forgetPassword.create_new_password")}
        </Text>
      )}
      <View
        style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
      ></View>
      <View>
        {situation == "emailSituation" && (
          <View style={styles.situationContainer}>
            <View
              style={[
                styles.cricle,
                {
                  backgroundColor: theme.cricleBackgroundColor,
                  borderColor: theme.bordercricleColor,
                },
              ]}
            >
              <Image
                source={require("../../assets/auth/forgetPassword/forgetPasswordEmailSituation.png")}
                style={{ position: "absolute", top: 50, right: 50 }}
                resizeMode="contain"
              />
            </View>
            <Spacer height={height * 0.05} />
            <Text style={[styles.text, { color: theme.textColor }]}>
              {translation("forgetPassword.emailSituationText")}
            </Text>
            <Spacer height={height * 0.05} />
            <View style={[styles.inputContainer, { marginTop: height * 0.02 }]}>
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
                // textAlign={isRTL ? "right" : "left"}
              />
              <Image
                source={require("../../assets/auth/email.png")}
                style={[
                  styles.icon,
                  { height: 17, tintColor: theme.inputImgColor },
                ]}
              />
            </View>
            <Spacer height={height * 0.1} />
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
                onPress={handleSendEmail}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Text style={styles.btnText}>
                  {/* {loading && } */}
                  {!loading && translation("forgetPassword.send")}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
        {situation == "codeSituation" && (
          <View style={styles.situationContainer}>
            <View
              style={[
                styles.cricle,
                {
                  backgroundColor: theme.cricleBackgroundColor,
                  borderColor: theme.bordercricleColor,
                },
              ]}
            >
              <Image
                source={require("../../assets/auth/forgetPassword/forgetPasswordCodeSituation.png")}
                style={{ position: "absolute", top: 70, right: 50 }}
                resizeMode="contain"
              />
            </View>
            <Spacer height={height * 0.05} />
            <Text style={[styles.text, { color: theme.textColor }]}>
              {translation("forgetPassword.codeSituationText")}
            </Text>
            <Spacer height={height * 0.05} />
            <View style={styles.container}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={(text) => {
                  const onlyNumbers = text.replace(/[^0-9]/g, "");
                  setValue(onlyNumbers);
                  if (onlyNumbers.length === CELL_COUNT) {
                    setIsComplete(true);
                    handleSubmitCode(onlyNumbers);
                  } else {
                    setIsComplete(false);
                  }
                }}
                cellCount={CELL_COUNT}
                rootStyle={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => {
                  const anim = borderAnims[index];

                  const borderRight = anim.interpolate({
                    inputRange: [0.75, 1],
                    outputRange: [0, 3],
                  });
                  const borderTop = anim.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [0, 3],
                  });
                  const borderLeft = anim.interpolate({
                    inputRange: [0.25, 1],
                    outputRange: [0, 3],
                  });

                  return (
                    <Animated.View
                      key={index}
                      style={[
                        {
                          width: 40,
                          height: 40,
                          margin: 5,
                          justifyContent: "center",
                          alignItems: "center",
                          borderBottomWidth: 3,
                          borderRightWidth: borderRight,
                          borderTopWidth: borderTop,
                          borderLeftWidth: borderLeft,
                          borderColor: isValid ? "#27ae60" : "#e74c3c",
                        },
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          textAlign: "center",
                          color: theme.inputTextColor,
                        }}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </Animated.View>
                  );
                }}
              />
            </View>
            <Spacer height={height * 0.1} />
            <TouchableOpacity onPress={handleResetCode}>
              <Text
                style={{
                  color: "#F0C419",
                  fontSize: 25,
                  fontFamily: Colors.primaryFont,
                }}
              >
                {translation("forgetPassword.resend_code")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {situation == "passwordSituation" && (
          <View style={styles.situationContainer}>
            <View
              style={[
                styles.cricle,
                {
                  backgroundColor: theme.cricleBackgroundColor,
                  borderColor: theme.bordercricleColor,
                },
              ]}
            >
              <Image
                source={require("../../assets/auth/forgetPassword/forgetPasswordPasswordSituation.png")}
                style={{ position: "absolute", top: 50, right: 50 }}
                resizeMode="contain"
              />
            </View>
            <Spacer height={height * 0.05} />
            <Text style={[styles.text, { color: theme.textColor }]}>
              {translation("forgetPassword.passwordSituationText")}
            </Text>
            <Spacer height={height * 0.05} />
            <View
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
                placeholder={
                  isPasswordFocused ? "" : translation("g.new_password")
                }
                placeholderTextColor={theme.inputTextColor}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                // textAlign={isRTL ? "right" : "left"}
              />
              <Image
                source={require("../../assets/auth/lockLogin.png")}
                style={[
                  styles.icon,
                  { height: 18, tintColor: theme.inputImgColor },
                ]}
              />
            </View>

            <View
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
                placeholder={translation("g.confirm_new_password")}
                placeholderTextColor={theme.inputTextColor}
                secureTextEntry
                value={confirmpassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                // textAlign={isRTL ? "right" : "left"}
              />
              <Image
                source={require("../../assets/auth/lockLogin.png")}
                style={[
                  styles.icon,
                  { height: 18, tintColor: theme.inputImgColor },
                ]}
              />
            </View>
            <Spacer height={height * 0.1} />
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
                onPress={handleSendNewPassword}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Text style={styles.btnText}>
                  {translation("forgetPassword.send")}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={modelShow}
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
                    backgroundColor: theme.cricleBackgroundColor,
                    borderColor: theme.bordercricleColor,
                  },
                ]}
              >
                <Image
                  source={require("../../assets/auth/forgetPassword/done.png")}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.title, { color: theme.confirmTextColor }]}>
                {translation("forgetPassword.passwordChanged")}
              </Text>
              <Text style={[styles.message, { color: theme.confirmTextColor }]}>
                {translation("forgetPassword.passwordChangeSuccessfully")}
              </Text>
            </View>
          </BlurView>
        </View>
      </Modal>
      <Loading text={"GreenSight"} visible={loading} />
    </SafeAreaView>
  );
}

export default forgetPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  situationContainer: {
    height: height - 69,
    justifyContent: "center",
    alignItems: "center",
  },
  cricle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 4,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: Colors.primaryFontBold,
    width: width * 0.95,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.025,
    alignItems: "center",
  },
  input: {
    borderRadius: 50,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.12,
    fontSize: width * 0.045,
    fontWeight: "600",
    width: width * 0.8,
  },
  icon: {
    position: "absolute",
    left: 60,
    top: "40%",
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
  back: {
    color: Colors.primaryColor,
    fontFamily: Colors.primaryFontBold,
    fontSize: 20,
    marginBottom: 10,
  },

  container: {
    marginTop: 40,
    alignItems: "center",
  },

  codeFieldRoot: {
    width: 350,
    justifyContent: "space-between",
  },

  cellText: {
    fontSize: 24,
    color: "#2a9d55",
    textAlign: "center",
  },

  focusCell: {
    borderColor: "#0c7c3c",
  },
  animatedBox: {
    padding: 10,
    borderRadius: 10,
  },
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
});
