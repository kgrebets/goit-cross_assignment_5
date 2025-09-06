import React from "react";
import BoxListScreen from "../screens/Boxes/BoxListScreen";
import BoxDetailsScreen from "../screens/Boxes/BoxDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { boxesStackRoutes } from "./route";
import { BoxesStackParamList } from "./types";

const Stack = createStackNavigator<BoxesStackParamList>();

export default function BoxesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={boxesStackRoutes.BOXES_LIST}
        component={BoxListScreen}
        options={{ title: "My boxes" }}
      />
      <Stack.Screen
        name={boxesStackRoutes.BOX_DETAILS}
        component={BoxDetailsScreen}
        options={{ title: "Box details" }}
      />
    </Stack.Navigator>
  );
}
