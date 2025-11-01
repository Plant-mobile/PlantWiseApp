import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import Items from "../../components/Items";
import { translation } from "../../services/translateService";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      setError(translation("g.server_error"));
      setLoading(false);
    }, 5000);

    const getData = async () => {
      try {
        const res = await fetch("http://192.168.1.87:5000/items/getFertilizers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          throw new Error("استجابة غير صالحة من السيرفر");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(translation("g.server_error"));
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const handleBack = () => {
    router.replace("/main");
  };
  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={{
            alignSelf: "flex-start",
          }}
        >
          <Text style={[styles.back]}>
            <Image source={require("../../assets/items/arrow_en.png")} />
            {translation("g.home")}
          </Text>
        </TouchableOpacity>
        <View
          style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
        ></View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#00A86B" />
          <Text style={{ marginTop: 10, fontSize: 16, color: "#555" }}>
            {translation("g.loading")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
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
            <Image source={require("../../assets/items/arrow_en.png")} />
            {translation("g.home")}
          </Text>
        </TouchableOpacity>
        <View
          style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
        ></View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Items
        data={data}
        catagory={[
          { catagory: "nitrogen_fertilizers", img: "nitrogen" },
          { catagory: "micrinurent_fertilizers", img: "micrinurent" },
          { catagory: "nitrogen_fertilizers", img: "potassium" },
          { catagory: "nitrogen_fertilizers", img: "phoshate" },
        ]}
        type={"fertilizer"}
        title={translation("items.fertilizers_type")}
      />
    </View>
  );
}

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
