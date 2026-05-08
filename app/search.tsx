import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
} from "react-native";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";

const allProducts = [
  { id: "1", title: "Premium Leather Messenger Bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400", price: "45.99", rating: "4.5", sold: "850", category: "Fashion" },
  { id: "2", title: "Mechanical Gaming Keyboard RGB", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400", price: "79.00", rating: "4.6", sold: "1.1k", category: "Electronics" },
  { id: "3", title: "Minimalist Ceramic Coffee Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400", price: "12.50", rating: "4.3", sold: "3.2k", category: "Home" },
  { id: "4", title: "Ultra Slim 4K Portable Monitor", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400", price: "159.00", rating: "4.8", sold: "420", category: "Electronics" },
  { id: "f1", title: "Wireless Noise Cancelling Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400", price: "129.00", rating: "4.8", sold: "2.4k", category: "Electronics" },
];

export default function SearchScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((q as string) || "");
  const [results, setResults] = useState(allProducts);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = allProducts.filter(p => 
      p.title.toLowerCase().includes(text.toLowerCase()) || 
      p.category.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.textMuted} />
            <TextInput
              placeholder="Search products..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
            <TouchableOpacity style={[styles.filterChip, styles.activeFilter]}>
              <Text style={styles.activeFilterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>Fashion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>Electronics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>Home</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.filterIcon}>
            <Ionicons name="options-outline" size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={results}
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
        ListHeaderComponent={
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>
              {searchQuery ? `Results for "${searchQuery}"` : "Trending Products"}
            </Text>
            <Text style={styles.resultCount}>{results.length} items found</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={80} color={Colors.border} />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptySubtitle}>We couldn't find any products matching your search.</Text>
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
    backgroundColor: Colors.white,
    ...Shadows.sm,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 15,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.secondary,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
  filterChips: {
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilter: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  activeFilterText: {
    color: Colors.white,
  },
  filterIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
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
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.secondary,
    flex: 1,
  },
  resultCount: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.secondary,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    paddingHorizontal: 50,
  },
});
