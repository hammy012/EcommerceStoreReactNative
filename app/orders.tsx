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
import { Image } from "expo-image";

const mockOrders = [
  {
    id: "ORD-9283",
    date: "May 08, 2026",
    status: "Delivered",
    total: 325.99,
    items: [
      { id: "1", title: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200", price: 299.99 },
      { id: "2", title: "Coffee Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=200", price: 26.00 }
    ]
  },
  {
    id: "ORD-8712",
    date: "May 05, 2026",
    status: "On the way",
    total: 89.00,
    items: [
      { id: "3", title: "Gaming Keyboard", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=200", price: 89.00 }
    ]
  },
  {
    id: "ORD-7541",
    date: "May 01, 2026",
    status: "Cancelled",
    total: 45.50,
    items: [
      { id: "4", title: "Leather Bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200", price: 45.50 }
    ]
  }
];

const OrderItem = ({ order }: { order: any }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "#10B981";
      case "on the way": return Colors.primary;
      case "cancelled": return Colors.error;
      default: return Colors.textMuted;
    }
  };

  return (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + "20" }]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.orderContent}>
        <View style={styles.imagesRow}>
          {order.items.map((item: any, index: number) => (
            <Image key={item.id} source={{ uri: item.image }} style={[styles.itemThumb, { zIndex: 10 - index, marginLeft: index === 0 ? 0 : -15 }]} />
          ))}
          {order.items.length > 3 && (
            <View style={styles.moreCircle}>
              <Text style={styles.moreText}>+{order.items.length - 3}</Text>
            </View>
          )}
        </View>
        <View style={styles.priceColumn}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>Order Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trackBtn}>
          <Text style={styles.trackBtnText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Active", "Completed", "Cancelled"];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.tabsWrapper}>
        <FlatList
          horizontal
          data={tabs}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => setActiveTab(item)}
              style={[styles.tab, activeTab === item && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <OrderItem order={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color={Colors.border} />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySubtitle}>When you place an order, it will appear here.</Text>
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
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsWrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.white,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: 20,
    marginBottom: 20,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.secondary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  orderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  imagesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemThumb: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.background,
  },
  moreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  moreText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  priceColumn: {
    alignItems: "flex-end",
  },
  totalLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: "600",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.primary,
  },
  orderFooter: {
    flexDirection: "row",
    gap: 12,
  },
  detailsBtn: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailsBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.secondary,
  },
  trackBtn: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  trackBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.white,
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
    lineHeight: 20,
  },
});
