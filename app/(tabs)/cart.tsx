import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";

const initialCartItems = [
  {
    id: "f1",
    title: "Premium Wireless Noise Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
    price: 129.0,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: "f3",
    title: "Nike Air Max 270 - Special Edition",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
    price: 85.0,
    quantity: 2,
    category: "Fashion",
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(initialCartItems);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 15.0 : 0;
  const discount = 10.0;
  const total = Math.max(0, subtotal + shipping - discount);

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{items.length} Items</Text>
        </View>
      </View>

      <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {items.length > 0 ? (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <View style={styles.itemTopRow}>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="close-circle" size={22} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.itemBottomRow}>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity 
                      style={styles.qtyBtn} 
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Ionicons name="remove" size={16} color={Colors.secondary} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Ionicons name="add" size={16} color={Colors.secondary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemSubtotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="cart-outline" size={50} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
            <TouchableOpacity 
              style={styles.shopNowBtn}
              onPress={() => router.push("/(tabs)/index")}
            >
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Promo Discount</Text>
              <Text style={[styles.summaryValue, { color: Colors.error }]}>-${discount.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.summaryRow, { marginBottom: 0 }]}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.checkoutBtn}
            onPress={() => router.push("/checkout")}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      )}
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
    paddingHorizontal: 25,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.secondary,
    letterSpacing: -0.5,
  },
  itemCountBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  itemCountText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  itemList: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: 15,
    marginBottom: 20,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemCategory: {
    fontSize: 10,
    fontWeight: "800",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.secondary,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  itemBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyBtn: {
    padding: 6,
    paddingHorizontal: 8,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.secondary,
    minWidth: 20,
    textAlign: "center",
  },
  itemSubtotal: {
    fontSize: 15,
    fontWeight: "900",
    color: Colors.secondary,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  shopNowBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: BorderRadius.md,
  },
  shopNowText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 15,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 20,
    paddingBottom: 35,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    ...Shadows.lg,
  },
  summaryCard: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.primary,
  },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    height: 56,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  checkoutBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
