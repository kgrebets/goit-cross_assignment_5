import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

type SearchBarProps = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={18} color={colors.iconMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.input}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
  },
  input: {
    flex: 1,
    color: colors.onBackground,
    fontSize: 16,
    paddingVertical: 0,
  },
});
