import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";

const { width } = Dimensions.get("window");

const categories = [
  { id: "1", title: "Fashion", icon: "shirt-outline" },
  { id: "2", title: "Electronics", icon: "phone-portrait-outline" },
  { id: "3", title: "Home", icon: "home-outline" },
  { id: "4", title: "Beauty", icon: "heart-outline" },
  { id: "5", title: "Sports", icon: "football-outline" },
  { id: "6", title: "Groceries", icon: "cart-outline" },
];

const brands = [
  { id: "b1", name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200" },
  { id: "b2", name: "Apple", logo: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200" },
  { id: "b3", name: "Samsung", logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=200" },
  { id: "b4", name: "Adidas", logo: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=200" },
];

const flashSaleProducts = [
  {
    id: "f1",
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
    id: "f2",
    title: "Smart Watch Series 7 - Black",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400",
    price: "199.00",
    oldPrice: "399.00",
    discount: "-50%",
    rating: "4.7",
    sold: "1.8k",
    category: "Electronics",
  },
  {
    id: "f3",
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

const featuredProducts = [
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
];

const banners = [
  { id: "1", title: "Summer Mega Sale", subtitle: "Up to 70% OFF on all items", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200", tag: "Limited Time" },
  { id: "2", title: "New Tech Arrivals", subtitle: "Explore the latest gadgets", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200", tag: "New Release" },
  { id: "3", title: "Fashion Essentials", subtitle: "Upgrade your wardrobe", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200", tag: "Trending" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeBanner, setActiveBanner] = useState(0);

  const renderBanner = ({ item }: { item: any }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.bannerSlide}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTag}>{item.tag}</Text>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
        <View style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>Shop Now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Banner with Overlay Navbar */}
      <View style={styles.topSection}>
        <View style={styles.bannerContainer}>
          <FlatList
            data={banners}
            renderItem={renderBanner}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            snapToAlignment="center"
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveBanner(index);
            }}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.bannerPagination}>
            {banners.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.bannerDot, 
                  activeBanner === index && styles.bannerDotActive
                ]} 
              />
            ))}
          </View>
        </View>
        
        <View style={styles.navbarOverlay}>
          <Navbar transparent />
        </View>
      </View>

      {/* Newsletter / Promo */}
      <View style={styles.promoBannerContainer}>
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContent}>
            <Text style={styles.promoTitle}>Join the Elite Club</Text>
            <Text style={styles.promoSubtitle}>Get 20% off your first order & exclusive access to drops.</Text>
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Subscribe Now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" }} 
            style={styles.promoBannerImage} 
          />
        </View>
      </View>

      {/* Deals of the Day - Grid */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Deals of the Day</Text>
            <Text style={styles.sectionSubtitle}>Exclusive prices for the next 24 hours</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dealsGrid}>
          {featuredProducts.slice(0, 4).map((product) => (
            <TouchableOpacity key={product.id} style={styles.dealCard}>
              <Image source={{ uri: product.image }} style={styles.dealImage} />
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>-40%</Text>
              </View>
              <Text style={styles.dealTitle} numberOfLines={1}>{product.title}</Text>
              <Text style={styles.dealPrice}>${product.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Arrivals - Horizontal Carousel */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <Text style={styles.sectionSubtitle}>Fresh styles just landed in our store</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Explore</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {allProducts.map((product) => (
            <View key={product.id} style={styles.horizontalItem}>
              <ProductCard item={product} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Popular Brands */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Brands</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandsContainer}>
          {brands.map((brand) => (
            <TouchableOpacity key={brand.id} style={styles.brandCard}>
              <Image source={{ uri: brand.logo }} style={styles.brandLogo} />
              <Text style={styles.brandName}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Why Shop With Us - Trust Badges */}
      <View style={styles.trustSection}>
        <View style={styles.trustItem}>
          <View style={styles.trustIconCircle}>
            <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.trustTitle}>Secure</Text>
          <Text style={styles.trustDesc}>Payments</Text>
        </View>
        <View style={styles.trustItem}>
          <View style={styles.trustIconCircle}>
            <Ionicons name="airplane" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.trustTitle}>Fast</Text>
          <Text style={styles.trustDesc}>Shipping</Text>
        </View>
        <View style={styles.trustItem}>
          <View style={styles.trustIconCircle}>
            <Ionicons name="refresh" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.trustTitle}>Easy</Text>
          <Text style={styles.trustDesc}>Returns</Text>
        </View>
        <View style={styles.trustItem}>
          <View style={styles.trustIconCircle}>
            <Ionicons name="headset" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.trustTitle}>24/7</Text>
          <Text style={styles.trustDesc}>Support</Text>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topSection: {
    height: 350,
    width: width,
    position: "relative",
  },
  bannerContainer: {
    height: 350,
    width: width,
  },
  bannerSlide: {
    width: width,
    height: 350,
    position: "relative",
  },
  bannerImage: {
    width: width,
    height: 350,
  },
  navbarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    paddingTop: 180,
    justifyContent: "center",
  },
  bannerTag: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  bannerTitle: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  bannerPagination: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
    gap: 8,
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  bannerDotActive: {
    width: 20,
    backgroundColor: Colors.primary,
  },
  sectionContainer: {
    marginTop: 35,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.secondary,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: "600",
    marginTop: 2,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  promoBannerContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  promoBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  promoTextContent: {
    flex: 1,
    zIndex: 2,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 5,
  },
  promoSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 15,
    fontWeight: "500",
  },
  promoBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  promoBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
  promoBannerImage: {
    width: 120,
    height: 120,
    position: "absolute",
    right: -10,
    bottom: -10,
    opacity: 0.8,
  },
  dealsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  dealCard: {
    width: (width - 55) / 2,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: 10,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dealImage: {
    width: "100%",
    height: 120,
    borderRadius: BorderRadius.sm,
    marginBottom: 10,
  },
  dealBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: Colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dealBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  dealTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.secondary,
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 15,
    fontWeight: "900",
    color: Colors.primary,
  },
  horizontalList: {
    paddingRight: 20,
    gap: 15,
  },
  horizontalItem: {
    width: width * 0.45,
  },
  brandsContainer: {
    paddingRight: 20,
    gap: 15,
  },
  brandCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    width: 100,
    ...Shadows.sm,
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  brandName: {
    fontSize: 12,
  },
  collectionBox: {
    flex: 1,
    height: 140,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    position: "relative",
  },
  collectionImage: {
    width: "100%",
    height: "100%",
  },
  collectionLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  collectionTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  collectionSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 5,
  },
  trustSection: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    margin: 20,
    borderRadius: BorderRadius.lg,
    padding: 20,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 40,
  },
  trustItem: {
    alignItems: "center",
    flex: 1,
  },
  trustIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  trustTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  trustDesc: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
