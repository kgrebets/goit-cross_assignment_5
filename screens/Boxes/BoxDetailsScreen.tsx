import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { boxesStackRoutes } from "../../navigation/route";
import { BoxesStackParamList } from "../../navigation/types";
import { getBox } from "../../api/api";
import { colors } from "../../constants/colors";
import { Box } from "../../models/Box";

type BoxDetailsRouteProp = RouteProp<
  BoxesStackParamList,
  typeof boxesStackRoutes.BOX_DETAILS
>;

export default function BoxDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<BoxDetailsRouteProp>();
  //const { boxId } = route.params!;
  const boxId = "17" ;

  const [box, setBox] = useState<Box | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBox = async () => {
      setLoading(true);
      try {
        const data = await getBox(boxId);
        setBox(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBox();
  }, [boxId]);

  useLayoutEffect(() => {
    if (box?.title) {
      navigation.setOptions({ title: box.title });
    }
  }, [navigation, box?.title]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!box) {
    return (
      <View style={styles.center}>
        <Text>Box not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Box Details</Text>
      <Text>Box ID: {box.id}</Text>
      <Text>Box title: {box.title}</Text>
      <Text>Items: {box.items.length ? box.items.join(", ") : "No items"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
});
