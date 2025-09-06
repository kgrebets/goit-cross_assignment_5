import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import BoxList from "../../components/BoxList/BoxList";
import { Box } from "../../models/Box";
import { colors } from "../../constants/colors";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { boxesStackRoutes } from "../../navigation/route";
import { BoxesStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { createBox, getBoxes } from "../../api/api";

type BoxListNavProp = StackNavigationProp<
  BoxesStackParamList,
  typeof boxesStackRoutes.BOXES_LIST
>;

export default function BoxListScreen() {
  const navigation = useNavigation<BoxListNavProp>();
  const [query, setQuery] = useState("");
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);

  //initial load
  useEffect(() => {
    const fetchBoxes = async () => {
      setLoading(true);
      try {
        const data = await getBoxes();
        setBoxes(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxes();
  }, []);

  // search filter
  const filteredBoxes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return boxes;
    return boxes.filter((b) => {
      const inTitle = b.title.toLowerCase().includes(q);
      const inItems = b.items?.some((it) => it.toLowerCase().includes(q));
      return inTitle || inItems;
    });
  }, [boxes, query]);

  // add new box
  const handleAdd = useCallback(async () => {
    const n = (boxes?.length || 0) + 1;
    const newPayload = {
      title: `New box #${n}`,
      createdAt: new Date().toISOString(),
      imageUrl: "https://picsum.photos/seed/newbox/200",
      items: [],
    };
    try {
      const created = await createBox(newPayload);
      setBoxes((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Failed to create box", err);
    }
  }, [boxes.length]);

  const handleOpen = (box: Box) => {
    navigation.navigate(boxesStackRoutes.BOX_DETAILS, { boxId: box.id });
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.root, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <BoxList data={filteredBoxes} onPressBox={handleOpen} />

      <View style={styles.addContainer}>
        <Button label="Add box" icon="add" onPress={handleAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  addContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
