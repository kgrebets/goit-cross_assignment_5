import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./navigation/AppTabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
