import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";

const initialWishlist = [
  {
    id: "w1",
    title: "Premium Wireless Noise Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
    price: "299.00",
    rating: "4.8",
    sold: "1.2k",
    category: "Electronics",
  },
  {
    id: "w2",
    title: "Minimalist Ceramic Coffee Mug",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400",
    price: "24.50",
    rating: "4.3",
    sold: "850",
    category: "Home",
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [items, setItems] = useState(initialWishlist);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{items.length}</Text>
        </View>
      </SafeAreaView>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <ProductCard item={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="heart-outline" size={60} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySubtitle}>Tap the heart icon on any product to save it for later.</Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => router.push("/(tabs)/index")}
            >
              <Text style={styles.exploreBtnText}>Explore Products</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.secondary,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
  listContent: {
    padding: 15,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  itemWrapper: {
    width: "48%",
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 50,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    ...Shadows.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: BorderRadius.md,
  },
  exploreBtnText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 15,
  },
});
