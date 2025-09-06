import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button/Button";
import { boxesStackRoutes, tabRoutes } from "../navigation/route";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../navigation/types";

type ScanNavigationProp = BottomTabNavigationProp<
  TabsParamList,
  typeof tabRoutes.SCAN_TAB
>;

export default function ScanScreen() {
  const navigation = useNavigation<ScanNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image to scan QR code and navigate to Box 2</Text>
      <Button
        label="Navigate to Box 2"
        onPress={() =>
          navigation.navigate(tabRoutes.BOXES_TAB, {
            screen: boxesStackRoutes.BOX_DETAILS,
            params: { boxId: "2" },
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});
