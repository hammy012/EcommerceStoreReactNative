import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors, BorderRadius, Shadows } from "@/constants/theme";

export default function ProductCard({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.wishlistBtn}>
          <Ionicons name="heart-outline" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.categoryText}>{item.category || "General"}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color={Colors.warning} />
            <Text style={styles.ratingText}>{item.rating || "4.5"}</Text>
            <Text style={styles.soldText}>• {item.sold || "1.2k"} sold</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  imageContainer: {
    position: "relative",
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    zIndex: 1,
  },
  discountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  wishlistBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  content: {
    padding: 12,
  },
  categoryText: {
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
    height: 40,
    lineHeight: 20,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
  },
  oldPrice: {
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: "bold",
  },
  soldText: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  addBtn: {
    backgroundColor: Colors.secondary,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
});
