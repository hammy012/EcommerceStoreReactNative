import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

const notifications = [
  {
    id: "1",
    title: "Order Shipped! 🚀",
    message: "Your order #ORD-9283 has been shipped and is on its way to you.",
    time: "2 hours ago",
    type: "shipping",
    isRead: false,
  },
  {
    id: "2",
    title: "New Flash Sale Alert! ⚡️",
    message: "Get up to 70% off on premium electronics. Offer ends in 4 hours!",
    time: "5 hours ago",
    type: "promo",
    isRead: false,
  },
  {
    id: "3",
    title: "Payment Successful ✅",
    message: "We've received your payment for order #ORD-9283. Thank you!",
    time: "1 day ago",
    type: "payment",
    isRead: true,
  },
  {
    id: "4",
    title: "Price Drop! 💸",
    message: "An item in your wishlist just dropped in price. Check it out now!",
    time: "2 days ago",
    type: "alert",
    isRead: true,
  },
];

const NotificationItem = ({ item }: { item: any }) => {
  const getIcon = () => {
    switch (item.type) {
      case "shipping": return { name: "airplane", color: Colors.primary };
      case "promo": return { name: "flash", color: Colors.warning };
      case "payment": return { name: "card", color: "#10B981" };
      case "alert": return { name: "notifications", color: Colors.error };
      default: return { name: "chatbubble", color: Colors.secondary };
    }
  };

  const iconData = getIcon();

  return (
    <TouchableOpacity style={[styles.notificationCard, !item.isRead && styles.unreadCard]}>
      <View style={[styles.iconBox, { backgroundColor: iconData.color + "20" }]}>
        <Ionicons name={iconData.name as any} size={22} color={iconData.color} />
      </View>
      <View style={styles.textContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotificationItem item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={80} color={Colors.border} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>We'll notify you when something important happens.</Text>
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
  markReadText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "700",
  },
  listContent: {
    padding: 20,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: BorderRadius.lg,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  unreadCard: {
    borderColor: Colors.primary + "40",
    backgroundColor: Colors.primaryLight + "30",
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.secondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  message: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  time: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 150,
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
