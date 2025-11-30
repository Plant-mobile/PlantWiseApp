import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropList({ items, value, setValue, theme, Colors }) {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={() => {}}
      style={{
        backgroundColor: theme.inputBackgroundColor,
        borderColor: "transparent",
      }}
      dropDownContainerStyle={{
        backgroundColor: theme.inputBackgroundColor,
        borderColor: "transparent",
      }}
      labelStyle={{
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
      }}
      listMode="SCROLLVIEW"
      renderListItem={(props) => {
        const isLast = props.item.value === items[items.length - 1].value;

        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setValue(props.item.value);
              setOpen(false);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 14,
              paddingHorizontal: 12,
              backgroundColor: props.isSelected
                ? Colors.primaryColor
                : theme.inputBackgroundColor,
              borderBottomWidth: isLast ? 0 : 1,
              borderColor: "transparent",
              paddingLeft: 19,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: props.isSelected ? "white" : "black",
                fontWeight: props.isSelected ? "bold" : "400",
              }}
            >
              {props.label}
            </Text>

            {props.isSelected && (
              <Text
                style={{
                  fontSize: 18,
                  color: "#1a8f4c",
                  fontWeight: "bold",
                }}
              >
                ✔
              </Text>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
}
