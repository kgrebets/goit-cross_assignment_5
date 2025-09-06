import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../constants/colors";
import ScanScreen from "../screens/ScanScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BoxesStack from "./BoxesStack";
import { tabRoutes } from "./route";
import { TabsParamList } from "./types";

const Tab = createBottomTabNavigator<TabsParamList>();

export default function AppTabs() {
  const getTabBarIcon = (routeName: string, color: string, size: number) => {
    const iconName =
      routeName === tabRoutes.BOXES_TAB
        ? "cube-outline"
        : routeName === tabRoutes.SCAN_TAB
        ? "qr-code-outline"
        : routeName === tabRoutes.SETTINGS_TAB
        ? "settings-outline"
        : "ellipse";

    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.iconMuted,
      })}
      initialRouteName={tabRoutes.BOXES_TAB}
    >
      <Tab.Screen
        name={tabRoutes.BOXES_TAB}
        component={BoxesStack}
        options={{ headerShown: false, title: "My Boxes" }}
      />
      <Tab.Screen
        name={tabRoutes.SCAN_TAB}
        component={ScanScreen}
        options={{ title: "Scan" }}
      />
      <Tab.Screen
        name={tabRoutes.SETTINGS_TAB}
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}
