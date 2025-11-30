// import React, { useContext, useEffect, useRef, useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   useColorScheme,
//   Image,
//   ScrollView,
//   useWindowDimensions,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
//   Pressable,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { UserContext } from "../../services/auth/auth";
// import { useTranslation } from "react-i18next";
// import { translation } from "../../services/translateService";
// import * as ImagePicker from "expo-image-picker";
// import { Colors } from "../../constants/Colors";
// import Spacer from "../../components/Spacer";
// import { LinearGradient } from "expo-linear-gradient";
// import ThemedText from "../../components/ThemedText";
// import { SafeAreaView } from "react-native-safe-area-context";
// const { width, height } = Dimensions.get("window");

// export default function profile() {
//   const colorScheme = useColorScheme();
//   const theme = Colors[colorScheme] ?? Colors.light;
//   const router = useRouter();
//   const userCtx = useContext(UserContext);
//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

//   const [image, setImage] = useState<string | null>(null);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   const animation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(animation, {
//       toValue: isActive ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [isActive]);

//   const translateX = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 16],
//   });

//   const backgroundColor = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [Colors.tatalogOffBackgroundColor, "#4CAF50"],
//   });

//   const toggleHandler = () => setIsActive((prev) => !prev);

//   const pickImage = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permissionResult.granted) return;

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleUpdateProfile = () => {
//     if (!username || !email) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (newPassword || confirmPassword) {
//       if (!currentPassword) {
//         alert("Please enter your current password");
//         return;
//       }

//       if (newPassword !== confirmPassword) {
//         alert("New passwords do not match");
//         return;
//       }

//       if (newPassword.length < 6) {
//         alert("New password must be at least 6 characters");
//         return;
//       }
//     }

//     console.log("Profile updated:", { username, email, newPassword });
//     alert("Profile updated successfully!");
//   };

//   const handleLogout = async () => {
//     userCtx.logout();
//     router.replace("/login");
//   };

//   return (
//     // <SafeAreaView style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}>
//     <ScrollView
//       contentContainerStyle={{ paddingBottom: 100 }}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//       style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}
//     >
//       <View
//         style={[
//           styles.header,
//           { backgroundColor: theme.primaryBackgroundColor },
//         ]}
//       >
//         <Text style={[{ fontSize: 28 }, styles.title]}>
//           {translation("g.edit_my_profile")}
//         </Text>
//         <Pressable onPress={handleLogout}>
//           <Image
//             source={require("../../assets/profile/logOut.png")}
//             style={styles.logOutImage}
//             resizeMode="cover"
//           />
//         </Pressable>
//       </View>
//       <View
//         style={[
//           styles.container,
//           { backgroundColor: theme.secondaryBackgroundColor },
//         ]}
//       >
//         <View style={styles.profileWrapper}>
//           <View style={styles.cricle}>
//             <Image
//               source={
//                 image
//                   ? { uri: image }
//                   : require("../../assets/profile/profilePhoto.png")
//               }
//               style={styles.image}
//               resizeMode="cover"
//             />
//             <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
//               <Image source={require("../../assets/profile/Icon-Cam.png")} />
//             </TouchableOpacity>
//           </View>
//           <ThemedText style={styles.username}>
//             {translation("g.user")}
//           </ThemedText>
//         </View>

//         <ThemedText style={styles.sectionTitle}>
//           {translation("g.account_settings")}
//         </ThemedText>

//         <Spacer height={30} />
//         <View style={styles.inputContainer}>
//           <ThemedText style={styles.label}>
//             {translation("g.user-Name")}
//           </ThemedText>
//           <Spacer height={10} />
//           <TextInput
//             style={[
//               styles.input,
//               styles.boxShadow,
//               { backgroundColor: theme.inputBackgroundColor },
//             ]}
//             value={username}
//             onChangeText={setUsername}
//             textAlign={isRTL ? "right" : "left"}
//           />
//           <Spacer height={10} />

//           <ThemedText style={styles.label}>{translation("g.email")}</ThemedText>
//           <Spacer height={10} />
//           <TextInput
//             style={[
//               styles.input,
//               styles.boxShadow,
//               { backgroundColor: theme.inputBackgroundColor },
//             ]}
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//             textAlign={isRTL ? "right" : "left"}
//           />
//           <Spacer height={10} />

//           <ThemedText style={styles.label}>
//             {translation("g.current_password")}
//           </ThemedText>
//           <Spacer height={10} />
//           <TextInput
//             style={[
//               styles.input,
//               styles.boxShadow,
//               { backgroundColor: theme.inputBackgroundColor },
//             ]}
//             value={currentPassword}
//             onChangeText={setCurrentPassword}
//             secureTextEntry
//             textAlign={isRTL ? "right" : "left"}
//           />
//           <Spacer height={10} />

//           <ThemedText style={styles.label}>
//             {translation("g.new_password")}
//           </ThemedText>
//           <Spacer height={10} />
//           <TextInput
//             style={[
//               styles.input,
//               styles.boxShadow,
//               { backgroundColor: theme.inputBackgroundColor },
//             ]}
//             value={newPassword}
//             onChangeText={setNewPassword}
//             secureTextEntry
//             textAlign={isRTL ? "right" : "left"}
//           />
//           <Spacer height={10} />

//           <ThemedText style={styles.label}>
//             {translation("g.confirm_new_password")}
//           </ThemedText>
//           <Spacer height={10} />
//           <TextInput
//             style={[
//               styles.input,
//               styles.boxShadow,
//               { backgroundColor: theme.inputBackgroundColor },
//             ]}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry
//             textAlign={isRTL ? "right" : "left"}
//           />

//           <Spacer height={40} />

//           <View style={styles.toggleRow}>
//             <ThemedText style={styles.toggleLabel}>
//               {translation("g.dark_theme")}
//             </ThemedText>
//             <TouchableOpacity onPress={toggleHandler}>
//               <Animated.View style={[styles.toggle, { backgroundColor }]}>
//                 <Animated.View
//                   style={[styles.circle, { transform: [{ translateX }] }]}
//                 />
//               </Animated.View>
//             </TouchableOpacity>
//           </View>

//           <Spacer height={30} />

//           <View style={styles.button}>
//             <LinearGradient
//               colors={[
//                 theme.inputBackgroundColor,
//                 theme.primaryBackgroundColor,
//               ]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={[styles.boxShadow, { borderRadius: 16 }]}
//             >
//               <Text onPress={handleUpdateProfile} style={styles.btn}>
//                 {translation("g.update_profile")}
//               </Text>
//             </LinearGradient>
//           </View>

//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: 160,
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 20,
//     borderTopRightRadius: 70,
//     borderTopLeftRadius: 70,
//   },
//   title: {
//     color: "white",
//     textAlign: "center",
//     fontFamily: "PlayfairDisplay-Bold",
//     bottom: 20,
//   },
//   profileWrapper: {
//     alignItems: "center",
//     marginTop: -70,
//     marginBottom: 20,
//   },
//   username: {
//     fontFamily: Colors.primaryFontBold,
//     fontSize: 22,
//     marginTop: 10,
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontFamily: Colors.primaryFontBold,
//     fontSize: 20,
//     marginTop: 10,
//     textAlign: "center",
//   },
//   cricle: {
//     width: 146,
//     height: 146,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 91,
//   },
//   image: {
//     width: 146,
//     height: 146,
//     borderRadius: 73,
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   cameraButton: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     padding: 6,
//   },
//   inputContainer: {
//     width: "100%",
//     justifyContent: "center",
//   },
//   boxShadow: {
//     shadowColor: "#000",
//     shadowOffset: { width: 1.25, height: 1 },
//     shadowOpacity: 0.25,
//     elevation: 4,
//   },
//   input: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 25,
//     height: 50,
//     width: "90%",
//     alignSelf: "center",
//     fontSize: 16,
//     color: Colors.primaryColor,
//   },
//   label: {
//     textTransform: "lowercase",
//     fontFamily: Colors.primaryFontBold,
//     textAlign: "center",
//   },
//   toggleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     alignItems: "center",
//   },
//   toggleLabel: {
//     fontFamily: Colors.primaryFontBold,
//   },
//   toggle: {
//     width: 31.5,
//     height: 16.1,
//     borderRadius: 15.75,
//     padding: 2,
//     justifyContent: "center",
//   },
//   circle: {
//     width: 14.1,
//     height: 14.1,
//     borderRadius: 7.25,
//     backgroundColor: "white",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.25,
//     shadowRadius: 1.5,
//     elevation: 3,
//     bottom: 1,
//   },
//   btn: {
//     color: "white",
//     textAlign: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//     fontWeight: "bold",
//   },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logOutImage: {
//     width: 35,
//     height: 30,
//     borderRadius: 73,
//     borderWidth: 2,
//     borderColor: "white",
//     backgroundColor: "white",
//     position: "absolute",
//     top: height * -0.06,
//     right: width * -0.47,
//   },
// });

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "../../components/ConfirmModal";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../components/loading";

const { width, height } = Dimensions.get("window");

export default function Profile() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();
  const userCtx: any = useContext(UserContext);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // الحقول المحلية
  const [image, setImage] = useState<string | null>(null); // uri للصورة (محلي أو remote)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const { user } = useContext(UserContext);
  // const { token } = useContext(UserContext);

  // console.log(user);
  // console.log(token);

  //  let a= async ()=>{
  // console.log(await AsyncStorage.getItem('user'))
  //   }

  // لتتبّع هل المستخدم غيّر الصورة (حتى نرفعها فقط عند اللازم)
  const [imageChanged, setImageChanged] = useState(false);

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

  // --- هنا نملأ الحقول عند تحميل الصفحة من الـ UserContext ---
  useEffect(() => {
    if (userCtx?.user) {
      const u = userCtx.user;
      setUsername(u.username ?? u.name ?? "");
      setEmail(u.email ?? "");
      // إذا الـ user يحتوي على avatarUrl أو photo
      if (u.avatarUrl) setImage(u.avatarUrl);
      else if (u.photo) setImage(u.photo);
      // مثال: تفعيل الثيم الداكن لو كان مخزّن داخل user settings
      if (u.settings?.darkMode) setIsActive(Boolean(u.settings.darkMode));
    }
  }, [userCtx?.user]);

  // --- اختيار صورة من المعرض ---
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(translation("g.permission_needed") || "Permission needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      console.log(image);
      setImageChanged(true);
    }
  };

  // --- دالة تحديث الملف الشخصي (تتواصل مع الباكند) ---
  const handleUpdateProfile = async () => {
    // console.log('call');

    // تحقق سريع على الفورنت
    if (!username || !email) {
      Alert.alert(
        translation("g.fill_required") || "Please fill required fields"
      );
      return;
    }

    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        Alert.alert(
          translation("g.enter_current_password") || "Enter current password"
        );
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert(
          translation("g.passwords_not_match") || "Passwords do not match"
        );
        return;
      }
      if (newPassword.length < 6) {
        Alert.alert(
          translation("g.password_length") ||
            "Password must be at least 6 chars"
        );
        return;
      }
    }

    setSaving(true);

    try {
      // إذا عندك endpoint لرفع ملف بصيغة form-data
      // سنبني FormData ونرفقه
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);

      // أضف تغييرات ثيم (مثال) — عدّل حسب احتياجاتك
      formData.append("settings", JSON.stringify({ darkMode: isActive }));

      // معالجة تغيير الباسوورد (مرره فقط إن يوجد)
      if (newPassword && currentPassword) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }

      // إذا غيّر المستخدم الصورة، نضيفها للـ formData
      if (imageChanged && image) {
        // استخراج اسم الملف والامتداد من URI
        const uriParts = image.split("/");
        const fileName = uriParts[uriParts.length - 1];
        // حاول تحديد mime type بسيط
        const match = /\.(\w+)$/.exec(fileName);
        const ext = match ? match[1].toLowerCase() : "jpg";
        const mimeType = ext === "png" ? "image/png" : "image/jpeg";

        // @ts-ignore: FormData file
        formData.append("avatar", {
          uri: image,
          name: fileName,
          type: mimeType,
        });
      }

      // مثال request - عدّل URL و headers حسب الباكند (auth token)
      // إذا عندك توكن في userCtx.token أو شغلة مشابهة استخدمها
      const token = userCtx?.token ?? null;

      const res = await fetch("https://your-backend.example.com/api/users/me", {
        method: "PUT",
        headers: {
          // ملاحظة: لا تضيف 'Content-Type' هنا عند استخدام FormData في RN؛ الترويسة تترك للبروكسي.
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `HTTP ${res.status}`);
      }

      const updatedUser = await res.json();

      // حدث الـ context لكي ينعكس التغيير في التطبيق كله
      if (userCtx?.setUser) {
        userCtx.setUser(updatedUser);
      }

      Alert.alert(
        translation("g.profile_updated") || "Profile updated successfully"
      );
      // بعد النجاح نعيد ضبط حقول الباسوورد
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setImageChanged(false);
    } catch (error: any) {
      console.error("Update profile error:", error);
      Alert.alert(
        translation("g.update_failed") || "Update failed",
        error.message || ""
      );
    } finally {
      setSaving(false);
    }

    setShowModal(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    router.replace("/login");
    await userCtx.logout(userCtx.token, userCtx.refreshToken);
    setLoading(false);
    return;
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: theme.primaryBackgroundColor }}
      >
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
              style={[
                styles.logOutImage,
                {
                  backgroundColor: theme.logOutBackground,
                  borderColor: theme.logOutBackground,
                  tintColor: theme.logOutIcon,
                },
              ]}
              resizeMode="cover"
            />
          </Pressable>
        </View>

        <View
          style={[
            styles.container,
            { backgroundColor: theme.secondaryBackgroundColor },
          ]}
        >
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
                {colorScheme == "dark" ? (
                  <Image
                    source={require("../../assets/profile/Icon-CamDark.png")}
                  />
                ) : (
                  <Image
                    source={require("../../assets/profile/Icon-Cam.png")}
                  />
                )}
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.username}>
              {username || translation("g.user")}
            </ThemedText>
          </View>

          <ThemedText style={styles.sectionTitle}>
            {translation("g.account_settings")}
          </ThemedText>

          <Spacer height={30} />

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>
              {translation("g.user-Name")}
            </ThemedText>
            <Spacer height={10} />
            <TextInput
              style={[
                styles.input,
                styles.boxShadow,
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.nameText,
                },
              ]}
              value={username}
              onChangeText={setUsername}
              textAlign={isRTL ? "right" : "left"}
              placeholder={translation("g.enter_name")}
            />

            <Spacer height={10} />
            <ThemedText style={styles.label}>
              {translation("g.email")}
            </ThemedText>
            <Spacer height={10} />
            <TextInput
              style={[
                styles.input,
                styles.boxShadow,
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.nameText,
                },
              ]}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              textAlign={isRTL ? "right" : "left"}
              placeholder={translation("g.enter_email")}
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
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.nameText,
                },
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
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.nameText,
                },
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
                {
                  backgroundColor: theme.inputBackgroundColor,
                  color: theme.nameText,
                },
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textAlign={isRTL ? "right" : "left"}
            />

            <Spacer height={40} />

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

            <View style={styles.button}>
              <LinearGradient
                colors={[
                  theme.linearGradientColorOne,
                  theme.linearGradientColorTwo,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.boxShadow, { borderRadius: 16 }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(true);
                  }}
                  disabled={saving}
                >
                  <Text style={styles.btn}>
                    {saving ? (
                      <>{translation("g.saving") || "Saving..."} </>
                    ) : (
                      translation("g.update_profile")
                    )}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <ConfirmModal
              visible={showModal}
              message={translation("g.sure", {
                Action: "update your setting profile",
              })}
              onCancel={() => setShowModal(false)}
              onConfirm={handleUpdateProfile}
            />

            {saving && <ActivityIndicator style={{ marginTop: 12 }} />}
          </View>
        </View>
      </ScrollView>
      <Loading text={"GreenSight"} visible={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
    position: "absolute",
    top: height * -0.06,
    right: width * -0.47,
  },
});
