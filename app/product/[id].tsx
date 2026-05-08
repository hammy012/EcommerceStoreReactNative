import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";

const { width } = Dimensions.get("window");
const ITEM_HEIGHT = 450;

const mockProduct = {
  id: "1",
  title: "Premium Wireless Noise Cancelling Headphones - Studio Edition",
  price: 299.99,
  oldPrice: 449.99,
  discount: "33% OFF",
  rating: 4.8,
  reviews: 1250,
  sold: "5k+",
  description: "Experience world-class noise cancellation and high-fidelity audio with our Studio Edition headphones. Designed for comfort and durability, these headphones feature up to 40 hours of battery life and intuitive touch controls.",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800",
  ],
  variations: {
    colors: [
      { name: "Matte Black", code: "#1A1A1A" },
      { name: "Silver", code: "#E5E7EB" },
      { name: "Navy Blue", code: "#1E3A8A" },
      { name: "Rose Gold", code: "#FDA4AF" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  specs: [
    { label: "Battery Life", value: "40 Hours" },
    { label: "Bluetooth", value: "5.2" },
    { label: "Weight", value: "250g" },
    { label: "Warranty", value: "1 Year" },
  ]
};

const similarProducts = [
  {
    id: "s1",
    title: "Gaming Headset RGB",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400",
    price: "89.00",
    rating: "4.5",
    sold: "1.2k",
    category: "Gaming",
  },
  {
    id: "s2",
    title: "In-Ear Wireless Buds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400",
    price: "120.00",
    rating: "4.7",
    sold: "3.5k",
    category: "Electronics",
  },
  {
    id: "s3",
    title: "Portable Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?q=80&w=400",
    price: "45.00",
    rating: "4.3",
    sold: "2.1k",
    category: "Home",
  },
];

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.variations.colors[0]);
  const [selectedSize, setSelectedSize] = useState(mockProduct.variations.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderImageItem = ({ item }: { item: string }) => (
    <Image
      source={{ uri: item }}
      style={styles.productImage}
      contentFit="cover"
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Custom Header */}
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-social-outline" size={20} color={Colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? Colors.error : Colors.secondary} 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <FlatList
            data={mockProduct.images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderImageItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
          />
          <View style={styles.pagination}>
            {mockProduct.images.map((_, i) => {
              const widthAnim = scrollX.interpolate({
                inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                outputRange: [8, 24, 8],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.paginationDot,
                    { width: widthAnim, backgroundColor: i === activeImageIndex ? Colors.primary : Colors.border },
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Product Info */}
          <View style={styles.badgeRow}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{mockProduct.discount}</Text>
            </View>
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>In Stock</Text>
            </View>
          </View>

          <Text style={styles.productTitle}>{mockProduct.title}</Text>

          <View style={styles.priceRow}>
            <View style={styles.priceGroup}>
              <Text style={styles.priceText}>${mockProduct.price}</Text>
              <Text style={styles.oldPriceText}>${mockProduct.oldPrice}</Text>
            </View>
            <View style={styles.ratingBox}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color={Colors.warning} />
                <Text style={styles.ratingText}>{mockProduct.rating}</Text>
              </View>
              <Text style={styles.reviewsText}>{mockProduct.reviews} reviews</Text>
            </View>
          </View>

          {/* Color Variation */}
          <View style={styles.variationSection}>
            <Text style={styles.variationTitle}>Select Color: <Text style={styles.variationValue}>{selectedColor.name}</Text></Text>
            <View style={styles.colorOptions}>
              {mockProduct.variations.colors.map((color) => (
                <TouchableOpacity
                  key={color.name}
                  style={[
                    styles.colorCircleWrapper,
                    selectedColor.name === color.name && styles.selectedColorWrapper
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <View style={[styles.colorCircle, { backgroundColor: color.code }]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Variation */}
          <View style={styles.variationSection}>
            <Text style={styles.variationTitle}>Select Size: <Text style={styles.variationValue}>{selectedSize}</Text></Text>
            <View style={styles.sizeOptions}>
              {mockProduct.variations.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeBox,
                    selectedSize === size && styles.selectedSizeBox
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText
                  ]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity & Stats */}
          <View style={styles.statsRow}>
            <View style={styles.quantityWrapper}>
              <Text style={styles.variationTitle}>Quantity</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityBtn}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Ionicons name="remove" size={18} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityBtn}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Ionicons name="add" size={18} color={Colors.text} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.soldBox}>
              <Text style={styles.soldCount}>{mockProduct.sold}</Text>
              <Text style={styles.soldLabel}>Happy Customers</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{mockProduct.description}</Text>
          </View>

          {/* Specifications */}
          <View style={styles.specsSection}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsGrid}>
              {mockProduct.specs.map((spec, index) => (
                <View key={index} style={styles.specItem}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Similar Products */}
          <View style={styles.similarSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Similar Products</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Explore All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarProductsList}>
              {similarProducts.map((product) => (
                <View key={product.id} style={{ width: width * 0.45, marginRight: 4 }}>
                  <ProductCard item={product} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartBtnMain}>
          <Ionicons name="cart-outline" size={22} color={Colors.white} />
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtnMain}>
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.sm,
  },
  headerRight: {
    flexDirection: "row",
    gap: 12,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  sliderContainer: {
    width: width,
    height: ITEM_HEIGHT,
    position: "relative",
  },
  productImage: {
    width: width,
    height: ITEM_HEIGHT,
  },
  pagination: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    alignSelf: "center",
    gap: 8,
  },
  paginationDot: {
    height: 6,
    borderRadius: 3,
  },
  contentContainer: {
    padding: 25,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -30,
    ...Shadows.lg,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  stockBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  stockText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "bold",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.secondary,
    lineHeight: 32,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  priceText: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.primary,
  },
  oldPriceText: {
    fontSize: 18,
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  ratingBox: {
    alignItems: "flex-end",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.secondary,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  variationSection: {
    marginBottom: 25,
  },
  variationTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.secondary,
    marginBottom: 12,
  },
  variationValue: {
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  colorOptions: {
    flexDirection: "row",
    gap: 15,
  },
  colorCircleWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorWrapper: {
    borderColor: Colors.primary,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 12,
  },
  sizeBox: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  selectedSizeBox: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  sizeText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  selectedSizeText: {
    color: Colors.white,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 35,
  },
  quantityWrapper: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    width: 130,
    justifyContent: "space-between",
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.sm,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.secondary,
  },
  soldBox: {
    alignItems: "flex-end",
  },
  soldCount: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.secondary,
  },
  soldLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  descriptionSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    fontWeight: "500",
  },
  specsSection: {
    marginBottom: 35,
  },
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  specItem: {
    width: "48%",
    backgroundColor: Colors.background,
    padding: 15,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  specLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
    fontWeight: "600",
  },
  specValue: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.secondary,
  },
  similarSection: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  similarProductsList: {
    paddingRight: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    flexDirection: "row",
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.lg,
  },
  cartBtnMain: {
    flex: 1,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  cartBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  buyBtnMain: {
    flex: 1,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buyBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
