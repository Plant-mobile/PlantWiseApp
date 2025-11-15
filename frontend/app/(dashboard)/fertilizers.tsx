import { useEffect, useState } from "react";
import {
  View,
  Text,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingProgressBar from "../../components/LoadingProgressBar";
const { width, height } = Dimensions.get("window");
const FERTILIZERS_KEY = "fertilizers_cache";
const UPDATED_KEY = "fertilizers_last_updated";

export default function ProductList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 0.1;
      setProgress(current);
      if (current >= 1) clearInterval(interval);
    }, 500);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const getData = async () => {
      try {
        const cached = await AsyncStorage.getItem(FERTILIZERS_KEY);
        const lastUpdated = await AsyncStorage.getItem(UPDATED_KEY);
        if (cached) {
          setFertilizers(JSON.parse(cached));
          setLoading(false);
        }
        const res = await fetch(
          `http://192.168.1.871:5000/items/fertilizers${
            lastUpdated ? `?since=${lastUpdated}` : ""
          }`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
          }
        );

        clearTimeout(timeout);

        if (!res.ok) {
          throw new Error("استجابة غير صالحة من السيرفر");
        }
        const json = await res.json();

        const current = JSON.parse(cached || "[]");

        const newFertilizers = mergeFertilizers(current, json.fertilizers);

        await AsyncStorage.setItem(
          FERTILIZERS_KEY,
          JSON.stringify(newFertilizers)
        );
        await AsyncStorage.setItem(UPDATED_KEY, json.last_updated);

        setFertilizers(newFertilizers);
      } catch (err) {
        const cached = await AsyncStorage.getItem(FERTILIZERS_KEY);
        if (!cached) {
          setError(translation("g.server_error"));
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
    const mergeFertilizers = (oldList, newList) => {
      const map = new Map();
      [...oldList, ...newList].forEach((item) => {
        if (item.isDeleted) {
          map.delete(item.id);
        } else {
          map.set(item.id, item);
        }
      });
      return Array.from(map.values());
    };

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
      <View
        style={[
          styles.container,
          { backgroundColor: theme.secondaryBackgroundColor },
        ]}
      >
        <View style={{width: '100%', marginLeft: width * 0.34}}>
          <Image
            source={require("../../assets/items/loading/loading_man.png")}
          />
        </View>
        <Text style={[styles.loadFont, { color: theme.primaryColor }]}>
          {translation("g.loading")}
        </Text>
        <View style={{ width: "100%", height: 100 }}>
          <LoadingProgressBar progress={progress} />
        </View>
         <Text style={[styles.loadDetails, { color: theme.primaryColor }]}>
          {translation("g.wait")}
         </Text>
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: theme.secondaryBackgroundColor,
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/items/error/504.png")}
            // style={styles.detailsImage}
            resizeMode="cover"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
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
  );
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
    textAlign: 'center',
    width :300
  },
});
