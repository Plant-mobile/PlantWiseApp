import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Dimensions,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { translation } from "../services/translateService";

const { width, height } = Dimensions.get("window");

// const images = {
//   en: require("../assets/arrow_en.png"),
//   ar: require("../assets/arrow_en.png"),
// };

const images = {
  nitrogen: require("../assets/nitrogen.png"),
};

const Items = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (selectedItem) {
      // كنت داخل عنصر فرعي → ارجع لقائمة العناصر الفرعية
      setSelectedItem(null);
    } else if (selectedCategory) {
      // كنت داخل كاتيجوري → ارجع لقائمة الكاتيجوريز
      setSelectedCategory(null);
    } else {
      router.replace("/main");
    }
  };

  // لو محدد كاتيجوري → اعرض عناصرها
  if (selectedCategory) {
    const subItems =
      data.find((d) => d.id === selectedCategory)?.subItems || [];

    if (selectedItem) {
      // صفحة التفاصيل للعنصر الداخلي
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleBack}
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <Text style={[styles.back]}>
              <Image
                source={require("../assets/arrow_en.png")}
                style={styles.image}
              />
              Back
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>تفاصيل: {selectedItem}</Text>
        </View>
      );
    }

    // صفحة العناصر الداخلية
    return (
      <View style={styles.container}>
        <Text style={styles.title}>العناصر في {selectedCategory}</Text>
        <FlatList
          data={subItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setSelectedItem(item.title)}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // الصفحة الرئيسية (العناصر الخارجية)
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.secondaryBackgroundColor,
          paddingTop: insets.top,
        },
      ]}
    >
            <View style={styles.line}></View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: theme.secondaryBackgroundColor, paddingLeft: width * 0.05, paddingRight: width * 0.05}}
      >
        <Text style={[styles.header]}>Fertilizers Type</Text>
        <View
          style={[styles.imgContainer, { paddingBottom: insets.bottom + 20 }]}
        >
          {data.map((item, index) => (
            <View style={styles.container1} key={index}>
              <Image source={images[item.img]} style={styles.mainImage} />
              <View style={styles.overlay}>
                <Image
                  source={require("../assets/wave_1.png")}
                  style={styles.wave1}
                />
                <Image
                  source={require("../assets/wave_2.png")}
                  style={styles.wave2}
                />
                <Text style={styles.title}>{translation('items.nitrogen_fertilizers')}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.detailsText}>{translation('g.details')}</Text>
                  <Image
                    source={require("../assets/arrow_en_white.png")}
                    style={styles.arrowIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: { 
    color: "blue", 
    marginBottom: 10 
  },
  header: {
    fontSize: 38,
    fontFamily: Colors.primaryFontBold,
    color: Colors.primaryColor,
    marginBottom: width * 0.1,
    paddingLeft: width * 0.05,
  },
  line: {
    width: width,
    height: 3,
    backgroundColor: "#DFF7E2",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.05,
  },
  container1: {
    position: "relative",
    marginBottom: height * 0.07,
  },
  mainImage: {
    width: width * 0.35, // 35% من عرض الشاشة
    height: width * 0.35, // الحفاظ على نسبة العرض والطول متساوية
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: -60,
    width: "100%", // استخدم العرض الكامل للصورة
  },
  wave1: {
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
    width: "100%", // نفس عرض الصورة
  },
  wave2: {
    borderRadius: 10,
    width: "100%", // نفس عرض الصورة
  },
  title: {
    position: "absolute",
    fontFamily: Colors.primaryFontBold,
    color: "white",
    textAlign: "center",
    top: 30,
    fontSize: (width * 0.35) * .1 ,
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    right: (width * 0.35) * -0.1,
    width: "100%",
    textAlign: "right",
  },
  detailsText: {
    width: "100%",
    textAlign: "right",
    paddingRight: width * 0.1,
    color: "white",
    fontFamily: Colors.primaryFontBold,
  },
  arrowIcon: {
    position: "absolute",
    right: 15,
    bottom: -4,
  },
});
