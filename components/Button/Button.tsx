import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

export type ButtonProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function Button({ label, icon, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.button}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={20}
          color={colors.onPrimary}
          style={styles.icon}
        />
      ) : null}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  icon: { marginTop: 1 },
  label: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});
