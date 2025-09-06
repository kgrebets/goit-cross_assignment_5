import { NavigatorScreenParams } from "@react-navigation/native";
import { boxesStackRoutes, tabRoutes } from "./route";

export type BoxesStackParamList = {
    [boxesStackRoutes.BOXES_LIST]: undefined;
    [boxesStackRoutes.BOX_DETAILS]: { boxId: string };
};

export type TabsParamList = {
    [tabRoutes.BOXES_TAB]: NavigatorScreenParams<BoxesStackParamList>;
    [tabRoutes.SCAN_TAB]: undefined;
    [tabRoutes.SETTINGS_TAB]: undefined;
};