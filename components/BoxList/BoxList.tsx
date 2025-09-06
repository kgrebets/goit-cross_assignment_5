import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "../../models/Box";
import { colors } from "../../constants/colors";

type BoxListProps = {
  data: Box[];
  onPressBox?: (box: Box) => void;
};

export default function BoxList({ data, onPressBox }: BoxListProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const numColumns = isLandscape ? 2 : 1;

  return (
    <FlatList
      data={data}
      key={numColumns} // Force FlatList to re-layout when columns count changes (rotation)
      numColumns={numColumns}
      keyExtractor={(b) => b.id}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrap : undefined}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressBox?.(item)}
          style={({ pressed }) => [
            styles.card,
            pressed && { opacity: 0.6 },
          ]}
        >
          <View style={styles.leftThumb}>
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.thumbImage}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="image-outline" size={28} color={colors.primary} />
            )}
          </View>

          <View style={styles.centerText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.items.length} {item.items.length === 1 ? "item" : "items"}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="rgba(17,24,39,0.5)"
          />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  columnWrap: {
    gap: 12,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.cardBackground,

    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  leftThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  centerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.onBackground,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "rgba(17,24,39,0.65)",
  },
});
