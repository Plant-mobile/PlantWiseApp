import { use, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
  Modal,
} from "react-native";
import Items from "../../components/Items";
import { translation } from "../../services/translateService";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingProgressBar from "../../components/LoadingProgressBar";
import { UserContext } from "../../services/auth/auth";
import LoginScreen from "../(auth)/login";
import Loading from "../../components/loading";
const { width, height } = Dimensions.get("window");
const FERTILIZERS_KEY = "fertilizers_cache";
const UPDATED_KEY = "fertilizers_last_updated";
import { getAllFertilizers } from "../../services/items/itemsService";
import { BlurView } from "expo-blur";
import ErrorModal from "../../components/errorModal";

export default function ProductList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();
  const { refreshToken, token, logout, user } = useContext(UserContext);
  const [modelShow, setModelShow] = useState(false);
  // const userCtx: any = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const getData = async () => {
      try {
        // جلب البيانات المخزنة مسبقًا
        const cached = await AsyncStorage.getItem(FERTILIZERS_KEY);
        const lastUpdated = await AsyncStorage.getItem(UPDATED_KEY);
        if (cached) {
          setFertilizers(JSON.parse(cached));
          setLoading(false);
        }

        // جلب البيانات الجديدة من السيرفر
        const data = await getAllFertilizers(
          token,
          refreshToken,
          cached,
          lastUpdated
        );

        // حالة LOGOUT_REQUIRED
        if (!data.success && data.error === "LOGOUT_REQUIRED") {
          setModelShow(true);
          setLoading(false);
          return;
        }

        // أي خطأ آخر
        if (!data.success) {
          setError(true);
          return;
        }

        // تحديث الـ state والـ AsyncStorage
        setFertilizers(data.fertilizers);
      } catch (err) {
        console.log("ERROR →", err);

        // جلب البيانات المخزنة إذا موجودة
        const cached = await AsyncStorage.getItem(FERTILIZERS_KEY);
        if (cached) setFertilizers(JSON.parse(cached));

        // التعامل مع timeout أو network error
        setError(true);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    getData();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [token, refreshToken, user]);

  const handleBack = () => {
    router.replace("/main");
  };

  const handleLogout = async () => {
    setModelShow(false);
    setLoading(true);
    // router.replace("/login");
    await logout(token, refreshToken);
    setLoading(false);
    return;
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      {error && (
        <>
          <TouchableOpacity
            onPress={handleBack}
            style={{ alignSelf: "flex-start" }}
          >
            <Text style={[styles.back]}>
              <Image source={require("../../assets/items/arrow_en.png")} />
              {translation("g.home")}
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.line,
              { backgroundColor: theme.lineBackgroundColor },
            ]}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {error === "TIMEOUT" ? ( */}
            {/* <Image source={require("../../assets/items/error/504.png")} /> */}
            {/* ) : ( */}
            <Image source={require("../../assets/items/error/502.png")} />
            {/* )} */}
          </View>
        </>
      )}
      {!error && (
        <View style={{ flex: 1 }}>
          <Items
            data={fertilizers}
            catagory={[
              { catagory: "nitrogen_fertilizers", img: "nitrogen" },
              { catagory: "micrinurent_fertilizers", img: "micrinurent" },
              { catagory: "potassium_fertilizers", img: "potassium" },
              { catagory: "phoshate_fertilizers", img: "phoshate" },
            ]}
            type={"fertilizer"}
            title={translation("items.fertilizers_type")}
          />
        </View>
      )}
      <Loading text={"GreenSight"} visible={loading} />
      <ErrorModal visible={modelShow} onConfirm={handleLogout} />
    </SafeAreaView>
  );

  // if (loading) {
  //   return (
  //     <SafeAreaView
  //       style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
  //     >

  //     </SafeAreaView>
  //   );
  // }
  // if (error) {
  //   return (
  //     <SafeAreaView
  //       style={[
  //         styles.safeArea,
  //         {
  //           paddingTop: insets.top,
  //           paddingBottom: insets.bottom,
  //           backgroundColor: theme.secondaryBackgroundColor,
  //         },
  //       ]}
  //     >
  //       <TouchableOpacity
  //         onPress={handleBack}
  //         style={{ alignSelf: "flex-start" }}
  //       >
  //         <Text style={[styles.back]}>
  //           <Image source={require("../../assets/items/arrow_en.png")} />
  //           {translation("g.home")}
  //         </Text>
  //       </TouchableOpacity>

  //       <View
  //         style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
  //       />

  //       <View
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         {error === "TIMEOUT" ? (
  //           <Image source={require("../../assets/items/error/504.png")} />
  //         ) : (
  //           <Image source={require("../../assets/items/error/502.png")} />
  //         )}
  //       </View>
  //     </SafeAreaView>
  //   );
  // } else {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Items
  //         data={fertilizers}
  //         catagory={[
  //           { catagory: "nitrogen_fertilizers", img: "nitrogen" },
  //           { catagory: "micrinurent_fertilizers", img: "micrinurent" },
  //           { catagory: "potassium_fertilizers", img: "potassium" },
  //           { catagory: "phoshate_fertilizers", img: "phoshate" },
  //         ]}
  //         type={"fertilizer"}
  //         title={translation("items.fertilizers_type")}
  //       />
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
  loadFont: {
    fontSize: width * 0.1,
    fontFamily: Colors.primaryFontBold,
  },
  loadDetails: {
    fontSize: width * 0.04,
    fontFamily: Colors.primaryFontBold,
    textAlign: "center",
    width: 300,
  },
});
