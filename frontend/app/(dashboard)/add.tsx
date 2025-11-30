import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { translation } from "../../services/translateService";
import { router } from "expo-router";
import Spacer from "../../components/Spacer";
import DropList from "../../components/dropList";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const add = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const [fertilizersName, setFertilizersName] = useState("");
  const [isFertilizersNameFocused, setIsFertilizersNameFocused] =
    useState(false);
  const [chemicalFormula, setchemiCalFormula] = useState("");
  const [isChemicalFormulaFocused, setIsChemicalFormulaFocused] =
    useState(false);
  const [approximateProportions, setApproximateProportions] = useState("");
  const [isApproximateProportionsFocused, setIsApproximateProportionsFocused] =
    useState(false);
  const [solubility, setSolubility] = useState("");
  const [isSolubilityFocused, setIsSolubilityFocused] = useState(false);
  const [
    symptomsOfNitrogenDeficiencyAndTreatment,
    setSymptomsOfNitrogenDeficiencyAndTreatment,
  ] = useState("");
  const [
    isSymptomsOfNitrogenDeficiencyAndTreatmentFocused,
    setIsSymptomsOfNitrogenDeficiencyAndTreatmentFocused,
  ] = useState(false);
  const [indications, setIndications] = useState("");
  const [isIndicationsFocused, setIsIndicationsFocused] = useState(false);
  const [application, setApplication] = useState("");
  const [isApplicationFocused, setIsApplicationFocused] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false);

  const [kind, setKind] = useState([
    { label: "Fertilizer", value: "fertilizer" },
    { label: "Plant", value: "plant" },
  ]);
  const [fertilizerCatagory, setFertilizerCatagory] = useState([
    { label: "Nitrogen Fertilizers", value: "nitrogen_fertilizers" },
    { label: "Micrinurent Fertilizers", value: "micrinurent_fertilizers" },
    { label: "Potassium Fertilizers", value: "potassium_fertilizers" },
    { label: "Phoshate Fertilizers", value: "phoshate_fertilizers" },
  ]);
  const [plantCatagory, setPlantCatagory] = useState([
    { label: "Fungi", value: "fungi" },
    { label: "Herbaceous", value: "herbaceous" },
    { label: "Trees", value: "trees" },
    { label: "Shrubs", value: "shrubs" },
  ]);

  const [kindValue, setKindValue] = useState(kind[0].value);
  const [fertilizerCatagoryValue, setFertilizerCatagoryValue] = useState(
    fertilizerCatagory[0].value
  );
  const [plantCatagoryValue, setPlantCatagoryValue] = useState(
    plantCatagory[0].value
  );

  const handleBack = () => {
    router.replace("/main");
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(translation("g.permission_needed") || "Permission needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // ✅ استخدم string مباشرة 'Images' أو 'Videos'
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

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
          backgroundColor: theme.secondaryBackgroundColor,
        },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        {kindValue == "fertilizer" ? (
          <Image
            source={require("../../assets/add/fertilizer.png")}
            style={{ borderRadius: 28, height: 140, width: width - 50 }}
          />
        ) : (
          <Image
            source={require("../../assets/add/plant.png")}
            style={{ borderRadius: 28, height: 140, width: width - 50 }}
          />
        )}
      </View>
      <Spacer height={20} />
      <View
        style={[styles.line, { backgroundColor: theme.lineBackgroundColor }]}
      ></View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        <View style={{ padding: 20, alignItems: "center" }}>
          <View style={{ zIndex: 1000, width: 300 }}>
            <DropList
              items={kind}
              value={kindValue}
              setValue={setKindValue}
              theme={theme}
              Colors={Colors}
            />
          </View>
          <Spacer height={20} />
          {kindValue == "fertilizer" ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: width,
              }}
            >
              <Text
                style={{
                  fontSize: width * 0.09,
                  color: Colors.primaryColor,
                  fontFamily: Colors.primaryFontBold,
                }}
              >
                {translation("add.new_fertilizer")}
              </Text>
              <Spacer height={10} />
              <View style={{ width: "75%" }}>
                <Text
                  style={{
                    fontSize: width * 0.04,
                    color: Colors.primaryColor,
                    fontFamily: Colors.primaryFontBold,
                    marginBottom: height * 0.01,
                  }}
                >
                  {translation("add.fertilizers_essentials")}
                </Text>
                <View style={{ zIndex: 1000 }}>
                  <DropList
                    items={fertilizerCatagory}
                    value={fertilizerCatagoryValue}
                    setValue={setFertilizerCatagoryValue}
                    theme={theme}
                    Colors={Colors}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isFertilizersNameFocused
                      ? ""
                      : translation("add.fertilizers_name")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={fertilizersName}
                  onChangeText={setFertilizersName}
                  multiline={true}
                  onFocus={() => setIsFertilizersNameFocused(true)}
                  onBlur={() => setIsFertilizersNameFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isChemicalFormulaFocused
                      ? ""
                      : translation("add.chemical_formula")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={chemicalFormula}
                  onChangeText={setchemiCalFormula}
                  multiline={true}
                  onFocus={() => setIsChemicalFormulaFocused(true)}
                  onBlur={() => setIsChemicalFormulaFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isApproximateProportionsFocused
                      ? ""
                      : translation("add.approximate_proportions")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={approximateProportions}
                  onChangeText={setApproximateProportions}
                  multiline={true}
                  onFocus={() => setIsApproximateProportionsFocused(true)}
                  onBlur={() => setIsApproximateProportionsFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isSolubilityFocused ? "" : translation("add.solubility")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={solubility}
                  onChangeText={setSolubility}
                  multiline={true}
                  onFocus={() => setIsSolubilityFocused(true)}
                  onBlur={() => setIsSolubilityFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isSymptomsOfNitrogenDeficiencyAndTreatmentFocused
                      ? ""
                      : translation(
                          "add.symptoms_of_nitrogen_deficiency_and_treatment"
                        )
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={symptomsOfNitrogenDeficiencyAndTreatment}
                  onChangeText={setSymptomsOfNitrogenDeficiencyAndTreatment}
                  multiline={true}
                  onFocus={() =>
                    setIsSymptomsOfNitrogenDeficiencyAndTreatmentFocused(true)
                  }
                  onBlur={() =>
                    setIsSymptomsOfNitrogenDeficiencyAndTreatmentFocused(false)
                  }
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isIndicationsFocused ? "" : translation("add.indications")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={indications}
                  onChangeText={setIndications}
                  multiline={true}
                  onFocus={() => setIsIndicationsFocused(true)}
                  onBlur={() => setIsIndicationsFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isApplicationFocused ? "" : translation("add.application")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={application}
                  onChangeText={setApplication}
                  multiline={true}
                  onFocus={() => setIsApplicationFocused(true)}
                  onBlur={() => setIsApplicationFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
              </View>
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: width * 0.08,
                  color: Colors.primaryColor,
                  fontFamily: Colors.primaryFontBold,
                }}
              >
                {translation("add.new_plant")}
              </Text>
              <Spacer height={10} />
              <View style={{ width: "75%" }}>
                <Text
                  style={{
                    fontSize: width * 0.04,
                    color: Colors.primaryColor,
                    fontFamily: Colors.primaryFontBold,
                    marginBottom: height * 0.01,
                  }}
                >
                  {translation("add.fertilizers_essentials")}
                </Text>
                <View style={{ zIndex: 1000 }}>
                  <DropList
                    items={plantCatagory}
                    value={plantCatagoryValue}
                    setValue={setPlantCatagoryValue}
                    theme={theme}
                    Colors={Colors}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isFertilizersNameFocused
                      ? ""
                      : translation("add.fertilizers_name")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={fertilizersName}
                  onChangeText={setFertilizersName}
                  multiline={true}
                  onFocus={() => setIsFertilizersNameFocused(true)}
                  onBlur={() => setIsFertilizersNameFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isChemicalFormulaFocused
                      ? ""
                      : translation("add.chemical_formula")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={chemicalFormula}
                  onChangeText={setchemiCalFormula}
                  multiline={true}
                  onFocus={() => setIsChemicalFormulaFocused(true)}
                  onBlur={() => setIsChemicalFormulaFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isApproximateProportionsFocused
                      ? ""
                      : translation("add.approximate_proportions")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={approximateProportions}
                  onChangeText={setApproximateProportions}
                  multiline={true}
                  onFocus={() => setIsApproximateProportionsFocused(true)}
                  onBlur={() => setIsApproximateProportionsFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isSolubilityFocused ? "" : translation("add.solubility")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={solubility}
                  onChangeText={setSolubility}
                  multiline={true}
                  onFocus={() => setIsSolubilityFocused(true)}
                  onBlur={() => setIsSolubilityFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isSymptomsOfNitrogenDeficiencyAndTreatmentFocused
                      ? ""
                      : translation(
                          "add.symptoms_of_nitrogen_deficiency_and_treatment"
                        )
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={symptomsOfNitrogenDeficiencyAndTreatment}
                  onChangeText={setSymptomsOfNitrogenDeficiencyAndTreatment}
                  multiline={true}
                  onFocus={() =>
                    setIsSymptomsOfNitrogenDeficiencyAndTreatmentFocused(true)
                  }
                  onBlur={() =>
                    setIsSymptomsOfNitrogenDeficiencyAndTreatmentFocused(false)
                  }
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isIndicationsFocused ? "" : translation("add.indications")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={indications}
                  onChangeText={setIndications}
                  multiline={true}
                  onFocus={() => setIsIndicationsFocused(true)}
                  onBlur={() => setIsIndicationsFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.inputBackgroundColor,
                      color: theme.inputTextColor,
                    },
                  ]}
                  placeholder={
                    isApplicationFocused ? "" : translation("add.application")
                  }
                  placeholderTextColor={theme.inputTextColor}
                  value={application}
                  onChangeText={setApplication}
                  multiline={true}
                  onFocus={() => setIsApplicationFocused(true)}
                  onBlur={() => setIsApplicationFocused(false)}
                  // textAlign={isRTL ? "right" : "left"}
                />
              </View>
            </View>
          )}
          <View
            style={{
              alignSelf: "flex-start",
              paddingLeft: width * 0.1,
              paddingTop: height * 0.04,
              width: width - width * 0.16,
              marginBottom: height * 0.1,
            }}
          >
            <Text
              style={{
                color: Colors.primaryColor,
                fontFamily: Colors.primaryFontBold,
                fontSize: width * 0.05,
                paddingBottom: height * 0.01,
              }}
            >
              {translation("add.media")}
            </Text>
            <View style={styles.image}>
              <Image
                source={
                  image ? { uri: image } : require("../../assets/add/img.png")
                }
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
              />
            </View>
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
                onPress={pickImage}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Text style={styles.btnText}>
                  {translation("add.upload_image")}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
              onPress={pickImage}
              style={{ width: "100%", alignItems: "center" }}
            >
              <Text style={styles.btnText}>
                {kindValue == "fertilizer"
                  ? translation("add.add_fertilizer")
                  : translation("add.add_plant")}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default add;

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
  dropList: {
    // borderRadius: 50,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.045,
    fontWeight: "600",
    borderColor: "transparent",
  },
  dropListItems: {
    textAlign: "center",
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.045,
    fontWeight: "600",
    borderColor: "transparent",
  },
  input: {
    borderRadius: 10,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.045,
    fontWeight: "600",
    marginTop: 10,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: height * 0.2,
    marginBottom: height * 0.1,
    paddingTop: height * 0.1,
  },
  button: {
    width: "100%",
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
});
