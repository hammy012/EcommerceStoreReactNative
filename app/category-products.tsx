import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";

const allProducts = [
  {
    id: "1",
    title: "Premium Leather Messenger Bag",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400",
    price: "45.99",
    rating: "4.5",
    sold: "850",
    category: "Fashion",
  },
  {
    id: "2",
    title: "Mechanical Gaming Keyboard RGB",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400",
    price: "79.00",
    rating: "4.6",
    sold: "1.1k",
    category: "Electronics",
  },
  {
    id: "3",
    title: "Minimalist Ceramic Coffee Mug",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400",
    price: "12.50",
    rating: "4.3",
    sold: "3.2k",
    category: "Home",
  },
  {
    id: "4",
    title: "Ultra Slim 4K Portable Monitor",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400",
    price: "159.00",
    oldPrice: "199.00",
    discount: "-20%",
    rating: "4.8",
    sold: "420",
    category: "Electronics",
  },
  {
    id: "5",
    title: "Wireless Noise Cancelling Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
    price: "129.00",
    oldPrice: "249.00",
    discount: "-48%",
    rating: "4.8",
    sold: "2.4k",
    category: "Electronics",
  },
  {
    id: "6",
    title: "Nike Air Max 270",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
    price: "85.00",
    oldPrice: "150.00",
    discount: "-43%",
    rating: "4.9",
    sold: "5.6k",
    category: "Fashion",
  },
];

const categories = ["All", "Fashion", "Electronics", "Home", "Beauty", "Sports", "Groceries"];

export default function CategoryProductsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState((params.category as string) || "All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category as string);
    }
  }, [params.category]);

  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedCategory} Collections</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={18}
              color={Colors.textMuted}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search in this category..."
              placeholderTextColor={Colors.textMuted}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.tab,
                selectedCategory === cat && styles.tabActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === cat && styles.tabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <ProductCard item={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="search-outline" size={40} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or category filters</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
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
  searchWrapper: {
    ...Shadows.sm,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 15,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  tabsWrapper: {
    marginTop: 10,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  tabTextActive: {
    color: Colors.white,
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 30,
  },
  productRow: {
    justifyContent: "space-between",
  },
  gridItem: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    ...Shadows.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.secondary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});
