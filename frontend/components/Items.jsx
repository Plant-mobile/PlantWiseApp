import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
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
import ConfirmModal from "./ConfirmModal";
import { UserContext } from "../services/auth/auth";

const { width, height } = Dimensions.get("window");

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
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
      setSelectedIds([]);
    } else {
      router.replace("/main");
      setSelectedCategory(null);
    }
  };

  const handlePress = (id) => {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id) // إذا كان موجود وشلت الضغط → يشطب
          : [...prev, id] // إذا مش موجود → ينضاف
    );
  };

  if (selectedCategory) {
    if (selectedItem) {
      const subItem = data.find((item) => item.name === selectedItem);

      return (
        <>
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
                gap: width * 0.01,
                flexDirection: "row",
                paddingLeft: width * 0.05,
                paddingRight: width * 0.03,
                paddingBottom: height * 0.01,
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={[styles.detailsNameContainer, { width: width * 0.6 }]}
              >
                <Text style={[styles.detailsName, { fontSize: width * 0.08 }]}>
                  {subItem.name}
                </Text>
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

              {type == "plants" && (
                <View style={{ marginBottom: height * 0.01 }}>
                  <Text style={styles.detailsLabel}>
                    {translation("items.age")}
                  </Text>
                  <LinearGradient
                    colors={[
                      theme.linearGradientColorOne,
                      theme.linearGradientColorTwo,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.detailsFeild}
                  >
                    <Text
                      style={[
                        styles.detailsButtonText,
                        { color: theme.valueTextColor },
                      ]}
                    >
                      {subItem.age}
                    </Text>
                  </LinearGradient>
                </View>
              )}
              <View style={{ marginBottom: height * 0.01 }}>
                <Text style={styles.detailsLabel}>
                  {type === "fertilizer"
                    ? translation("items.chemical_formula")
                    : translation("items.climate")}
                </Text>
                <LinearGradient
                  colors={[
                    theme.linearGradientColorOne,
                    theme.linearGradientColorTwo,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.valueTextColor },
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
                    theme.linearGradientColorOne,
                    theme.linearGradientColorTwo,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.valueTextColor },
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
                    theme.linearGradientColorOne,
                    theme.linearGradientColorTwo,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.valueTextColor },
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
                        theme.linearGradientColorOne,
                        theme.linearGradientColorTwo,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.detailsFeild}
                    >
                      <Text
                        style={[
                          styles.detailsButtonText,
                          { color: theme.valueTextColor },
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
                        theme.linearGradientColorOne,
                        theme.linearGradientColorTwo,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.detailsFeild}
                    >
                      <Text
                        style={[
                          styles.detailsButtonText,
                          { color: theme.valueTextColor },
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
                        theme.linearGradientColorOne,
                        theme.linearGradientColorTwo,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.detailsFeild}
                    >
                      <Text
                        style={[
                          styles.detailsButtonText,
                          { color: theme.valueTextColor },
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
                    theme.linearGradientColorOne,
                    theme.linearGradientColorTwo,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.valueTextColor },
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
                    theme.linearGradientColorOne,
                    theme.linearGradientColorTwo,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.detailsFeild}
                >
                  <Text
                    style={[
                      styles.detailsButtonText,
                      { color: theme.valueTextColor },
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
        </>
      );
    }

    return (
      <>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handleBack}
            style={{
              // flexDirection: isRTL ? "row-reverse" : "row",
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
          <TouchableOpacity
            disabled={selectedIds.length === 0}
            onPress={() => {
              if (selectedIds.length) setShowModal(true);
            }}
          >
            <Image
              source={require("../assets/items/deleteIcon.png")}
              style={[styles.deleteIcon, selectedIds.length && styles.delete]}
            />
          </TouchableOpacity>
        </View>
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
                  {user?.isAdmin && (
                    <TouchableOpacity
                      style={styles.deleteCornerWrapper}
                      onPress={() => {
                        handlePress(item.id);
                      }}
                    >
                      <View
                        style={[
                          styles.deleteCornerSquare,
                          selectedIds.includes(item.id) && { opacity: 1 },
                        ]}
                      >
                        <Image
                          source={require("../assets/items/deleteIcon.png")}
                          style={[
                            styles.deleteIconImage,
                            selectedIds.includes(item.id) &&
                              styles.selectedItem,
                          ]}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  <View style={styles.overlay}>
                    <Image
                      source={require("../assets/items/wave_1.png")}
                      style={styles.wave1}
                    />
                    <Image
                      source={require("../assets/items/wave_2.png")}
                      style={styles.wave2}
                    />
                    <Text style={[styles.title, { color: theme.nameText }]}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setSelectedItem(item.name)}
                    >
                      <Text
                        style={[styles.detailsText, { color: theme.nameText }]}
                      >
                        {translation("g.details")}
                      </Text>
                      <Image
                        source={require("../assets/items/arrow_en_white.png")}
                        style={[styles.arrowIcon, { tintColor: theme.arrow }]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
          <ConfirmModal
            visible={showModal}
            message={translation("g.sure", {
              Action: "delete",
            })}
            onCancel={() => setShowModal(false)}
            onConfirm={() => {
              setShowModal(false);
              console.log(selectedIds);
            }}
          />
        </ScrollView>
      </>
    );
  }
  return (
    <>
      <TouchableOpacity
        onPress={handleBack}
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          alignSelf: "flex-start",
        }}
      >
        <Text style={[styles.back]}>
          <Image source={require("../assets/items/arrow_en.png")} />
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
                <Text style={[styles.title, { color: theme.nameText }]}>
                  {translation(`items.${item.catagory}`)}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    setSelectedCategory(translation(`items.${item.catagory}`))
                  }
                >
                  <Text style={[styles.detailsText, { color: theme.nameText }]}>
                    {translation("g.details")}
                  </Text>
                  <Image
                    source={require("../assets/items/arrow_en_white.png")}
                    style={[styles.arrowIcon, { tintColor: theme.arrow }]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
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
    width: width * 0.4,
    height: width * 0.45,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: -60,
    width: "100%",
  },
  wave1: {
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
    width: "100%",
  },
  wave2: {
    borderRadius: 10,
    width: "100%",
  },
  title: {
    position: "absolute",
    fontFamily: Colors.primaryFontBold,
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
    fontFamily: Colors.primaryFontBold,
  },
  arrowIcon: {
    position: "absolute",
    right: 15,
    bottom: -4,
  },
  detailsNameContainer: {
    justifyContent: "center",
  },
  detailsName: {
    color: Colors.primaryColor,
    fontFamily: Colors.primaryFontBold,
    textAlign: "center",
    width: "100%",
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
  deleteCornerWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 90,
    height: 90,
    overflow: "hidden",
    borderTopRightRadius: 10,
  },
  deleteCornerSquare: {
    backgroundColor: Colors.deleteIconBackgroundColor,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    top: -45,
    right: -45,
    opacity: 0.8,
  },
  deleteIcon: {
    width: 30,
    height: 30,
    right: width * 0.05,
    tintColor: Colors.primaryColor,
    opacity: 0.5,
  },
  delete: {
    tintColor: "red",
    opacity: 1,
  },
  deleteIconImage: {
    width: 20,
    height: 20,
    tintColor: "black",
    transform: [{ rotate: "-45deg" }],
    top: "70%",
    left: "40%",
    position: "absolute",
  },
  selectedItem: {
    tintColor: Colors.deleteIconColor,
  },
});
