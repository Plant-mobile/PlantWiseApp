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
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// const images = {
//   en: require("../assets/arrow_en.png"),
//   ar: require("../assets/arrow_en.png"),
// };

const images = {
  nitrogen: require("../assets/items/nitrogenFertilize.png"),
  phoshate: require("../assets/items/phoshateFertilizers.png"),
  potassium: require("../assets/items/potassiumFertilize.png"),
  micrinurent: require("../assets/items/micrinurentFertilize.png"),
  mushroom: require("../assets/items/mushroom.png"),
  shrubs: require("../assets/items/shrubs.png"),
  trees: require("../assets/items/trees.png"),
  herbs: require("../assets/items/herbs.png"),
};

const Items = ({ data, catagory, type, title }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      router.replace("/main");
      setSelectedCategory(null);
    }
  };


  if (selectedCategory) {
    if (selectedItem) {
      const subItem = data.find((item) => item.name === selectedItem);

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
          <TouchableOpacity
            onPress={handleBack}
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              alignSelf: "flex-start",
            }}
          >
            <Text style={[styles.back]}>
              <Image
                source={require("../assets/items/arrow_en.png")}
                style={styles.image}
              />
              {selectedItem}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.line,
              { backgroundColor: theme.lineBackgroundColor },
            ]}
          ></View>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{
              flex: 1,
              backgroundColor: theme.secondaryBackgroundColor,
              paddingTop: height * 0.03,
            }}
          >
            <View
              style={{
                display: "flex",
                gap: width * 0.13,
                flexDirection: "row",
                paddingLeft: width * 0.05,
                paddingRight: width * 0.03,
                paddingBottom: height * 0.02,
              }}
            >
              <View style={styles.detailsNameContainer}>
                  <Text
                    style={[
                      styles.detailsName,
                      { fontSize: width * 0.06, },
                    ]}
                  >
                    {subItem.name}
                  </Text>
                  <Text style={[styles.detailsName, { fontSize: width * 0.1 }]}>
                    {type === "fertilizer" && translation("items.fertilizers")}
                  </Text>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: width * 0.4,
                    height: height * 0.05,
                    marginTop: height * 0.03,
                    backgroundColor: theme.inputBackgroundColor,
                    borderRadius: 20,
                    left: 35,
                  }}
                >
                  <Text style={styles.age}>
                    {translation("items.age", { time: subItem.age })}
                  </Text>
                </View>
              </View>
              <Image
                source={{ uri: subItem.img }}
                style={styles.detailsImage}
                resizeMode="cover"
              />
            </View>
            <View
              style={[
                styles.line,
                { backgroundColor: theme.lineBackgroundColor },
              ]}
            ></View>
            <View
              style={{
                paddingLeft: width * 0.05,
                paddingRight: width * 0.05,
                paddingBottom: insets.bottom + 30,
              }}
            >
              <Text style={[styles.overViewName, { fontSize: width * 0.08 }]}>
                {subItem.name} {translation("items.overview")}:
              </Text>

              <View style={{ marginBottom: height * 0.01 }}>
                <Text style={styles.detailsLabel}>
                  {type === "fertilizer"
                    ? translation("items.chemical_formula")
                    : translation("items.climate")}
                </Text>
                <LinearGradient
                  colors={[
                    theme.inputBackgroundColor,
                    theme.primaryBackgroundColor,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.textColor },
                    ]}
                  >
                    {type === "fertilizer"
                      ? subItem.chemical_formula
                      : subItem.climate}
                  </Text>
                </LinearGradient>
              </View>
              <View style={{ marginBottom: height * 0.01 }}>
                <Text style={styles.detailsLabel}>
                  {type === "fertilizer"
                    ? translation("items.common_form")
                    : translation("items.substrate")}
                </Text>
                <LinearGradient
                  colors={[
                    theme.inputBackgroundColor,
                    theme.primaryBackgroundColor,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.textColor },
                    ]}
                  >
                    {type === "fertilizer"
                      ? subItem.common_form
                      : subItem.substrate}
                  </Text>
                </LinearGradient>
              </View>
              <View style={{ marginBottom: height * 0.01 }}>
                <Text style={styles.detailsLabel}>
                  {type === "fertilizer"
                    ? translation("items.approximate_proportions")
                    : translation("items.temperatures")}
                </Text>
                <LinearGradient
                  colors={[
                    theme.inputBackgroundColor,
                    theme.primaryBackgroundColor,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.textColor },
                    ]}
                  >
                    {type === "fertilizer"
                      ? subItem.approximate_proportions
                      : subItem.temperatures}
                  </Text>
                </LinearGradient>
              </View>
              <View style={{ marginBottom: height * 0.01 }}>
                {type === "fertilizer" && (
                  <>
                    <Text style={styles.detailsLabel}>
                      {translation("items.symptoms")}
                    </Text>

                    <LinearGradient
                      colors={[
                        theme.inputBackgroundColor,
                        theme.primaryBackgroundColor,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.detailsFeild}
                    >
                      <Text
                        style={[
                          styles.detailsButtonText,
                          { color: theme.textColor },
                        ]}
                      >
                        {subItem.symptoms}
                      </Text>
                    </LinearGradient>
                  </>
                )}
              </View>
              <View style={{ marginBottom: height * 0.01 }}>
                {type === "fertilizer" && subItem.solubility ? (
                  <>
                    <Text style={styles.detailsLabel}>
                      {translation("items.solubility")}
                    </Text>

                    <LinearGradient
                      colors={[
                        theme.inputBackgroundColor,
                        theme.primaryBackgroundColor,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.detailsFeild}
                    >
                      <Text
                        style={[
                          styles.detailsButtonText,
                          { color: theme.textColor },
                        ]}
                      >
                        {subItem.solubility}
                      </Text>
                    </LinearGradient>
                  </>
                ) : type !== "fertilizer" ? (
                  <>
                    <Text style={styles.detailsLabel}>
                      {translation("items.production_time")}
                    </Text>

                    <LinearGradient
                      colors={[
                        theme.inputBackgroundColor,
                        theme.primaryBackgroundColor,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.detailsFeild}
                    >
                      <Text
                        style={[
                          styles.detailsButtonText,
                          { color: theme.textColor },
                        ]}
                      >
                        {subItem.productionTime}
                      </Text>
                    </LinearGradient>
                  </>
                ) : null}
              </View>
              <View style={{ marginBottom: height * 0.01 }}>
                <Text style={styles.detailsLabel}>
                  {type === "fertilizer"
                    ? translation("items.indications")
                    : translation("items.humidity")}
                </Text>
                <LinearGradient
                  colors={[
                    theme.inputBackgroundColor,
                    theme.primaryBackgroundColor,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.textColor },
                    ]}
                  >
                    {type === "fertilizer"
                      ? subItem.indications
                      : subItem.humidity}
                  </Text>
                </LinearGradient>
              </View>
              <View style={{ marginBottom: height * 0.01 }}>
                <Text style={styles.detailsLabel}>
                  {type === "fertilizer"
                    ? translation("items.application")
                    : translation("items.profit")}
                </Text>
                <LinearGradient
                  colors={[
                    theme.inputBackgroundColor,
                    theme.primaryBackgroundColor,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.textColor },
                    ]}
                  >
                    {type === "fertilizer"
                      ? subItem.application
                      : subItem.profit}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

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
        <TouchableOpacity
          onPress={handleBack}
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignSelf: "flex-start",
          }}
        >
          <Text style={[styles.back]}>
            <Image
              source={require("../assets/items/arrow_en.png")}
              style={styles.image}
            />
            {type === "fertilizer"
              ? translation("items.fertilizers")
              : translation("items.plants")}
          </Text>
        </TouchableOpacity>
        <View
          style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
        ></View>
        <Text style={[styles.header]}>{selectedCategory}</Text>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{
            flex: 1,
            backgroundColor: theme.secondaryBackgroundColor,
            paddingLeft: width * 0.01,
            paddingRight: width * 0.01,
          }}
        >
          <View
            style={[styles.imgContainer, { paddingBottom: insets.bottom + 20 }]}
          >
            {data
              .filter((item) =>
                selectedCategory
                  ? translation(`items.${item.catagory}`) === selectedCategory
                  : true
              )
              .map((item, index) => (
                <View style={styles.dataContainer} key={index}>
                  <Image source={{ uri: item.img }} style={styles.mainImage} />
                  <View style={styles.overlay}>
                    <Image
                      source={require("../assets/items/wave_1.png")}
                      style={styles.wave1}
                    />
                    <Image
                      source={require("../assets/items/wave_2.png")}
                      style={styles.wave2}
                    />
                    <Text style={styles.title}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setSelectedItem(item.name)}
                    >
                      <Text style={styles.detailsText}>
                        {translation("g.details")}
                      </Text>
                      <Image
                        source={require("../assets/items/arrow_en_white.png")}
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
  }
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
      <TouchableOpacity
        onPress={handleBack}
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          alignSelf: "flex-start",
        }}
      >
        <Text style={[styles.back]}>
          <Image
            source={require("../assets/items/arrow_en.png")}
            style={styles.image}
          />
          {translation("g.home")}
        </Text>
      </TouchableOpacity>
      <View
        style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
      ></View>
      <Text style={[styles.header]}>{title}</Text>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          backgroundColor: theme.secondaryBackgroundColor,
          paddingLeft: width * 0.01,
          paddingRight: width * 0.01,
        }}
      >
        <View
          style={[styles.imgContainer, { paddingBottom: insets.bottom + 20 }]}
        >
          {catagory.map((item, index) => (
            <View style={styles.dataContainer} key={index}>
              <Image source={images[item.img]} style={styles.mainImage} />
              <View style={styles.overlay}>
                <Image
                  source={require("../assets/items/wave_1.png")}
                  style={styles.wave1}
                />
                <Image
                  source={require("../assets/items/wave_2.png")}
                  style={styles.wave2}
                />
                <Text style={styles.title}>
                  {translation(`items.${item.catagory}`)}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    setSelectedCategory(translation(`items.${item.catagory}`))
                  }
                >
                  <Text style={styles.detailsText}>
                    {translation("g.details")}
                  </Text>
                  <Image
                    source={require("../assets/items/arrow_en_white.png")}
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
    color: Colors.primaryColor,
    fontFamily: Colors.primaryFontBold,
    fontSize: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 38,
    textAlign: "center",
    fontFamily: Colors.primaryFontBold,
    color: Colors.primaryColor,
    marginBottom: width * 0.05,
  },
  line: {
    width: width,
    height: 3,
    // backgroundColor: "#DFF7E2",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.05,
  },
  dataContainer: {
    position: "relative",
    marginBottom: height * 0.1,
  },
  mainImage: {
    width: width * 0.4, // 35% من عرض الشاشة
    height: width * 0.45, // الحفاظ على نسبة العرض والطول متساوية
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
    fontSize: width * 0.35 * 0.1,
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    right: width * 0.35 * -0.1,
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
  detailsNameContainer: {
    maxWidth: width * 0.7,
  },
  detailsName: {
    color: Colors.primaryColor,
    fontFamily: Colors.primaryFontBold,
    textAlign: 'center',
    width: width * 0.5
  },
  detailsImage: {
    width: width * 0.3,
    height: width * 0.4,
    borderRadius: 30,
  },
  overViewName: {
    color: Colors.primaryColor,
    fontFamily: Colors.primaryFontBold,
    paddingBottom: height * 0.02,
  },
  detailsLabel: {
    color: Colors.primaryColor,
    fontSize: width * 0.04,
    fontFamily: Colors.primaryFontBold,
    marginBottom: height * 0.01,
  },
  detailsFeild: {
    minHeight: height * 0.06,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.04,
  },
  detailsButtonText: {
    fontSize: width * 0.07,
    fontFamily: Colors.primaryFont,
  },
  age: {
    fontFamily: Colors.primaryFontBold,
    color: Colors.primaryColor,
    fontSize: width * 0.04,
  },
});
