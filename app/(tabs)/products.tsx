import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ProductCard from "@/components/ProductCard";

const allProducts = [
  {
    id: "1",
    title: "Premium Leather Messenger Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400",
    price: "45.99",
    rating: "4.5",
    sold: "850",
    category: "Fashion",
  },
  {
    id: "2",
    title: "Mechanical Gaming Keyboard RGB",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400",
    price: "79.00",
    rating: "4.6",
    sold: "1.1k",
    category: "Electronics",
  },
  {
    id: "3",
    title: "Minimalist Ceramic Coffee Mug",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400",
    price: "12.50",
    rating: "4.3",
    sold: "3.2k",
    category: "Home",
  },
  {
    id: "4",
    title: "Ultra Slim 4K Portable Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400",
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
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
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
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
    price: "85.00",
    oldPrice: "150.00",
    discount: "-43%",
    rating: "4.9",
    sold: "5.6k",
    category: "Fashion",
  },
];

const categories = ["All", "Fashion", "Electronics", "Home", "Beauty"];

export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Products</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryTab,
                selectedCategory === cat && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
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
        renderItem={({ item }) => <ProductCard item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
  },
  categoryTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryTabActive: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  categoryText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  productRow: {
    paddingHorizontal: 9,
    justifyContent: "space-between",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
    marginTop: 10,
  },
});
