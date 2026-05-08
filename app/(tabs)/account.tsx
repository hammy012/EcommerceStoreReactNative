import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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

export default function AccountScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: "receipt-outline", title: "My Orders", route: "/orders" as any },
    { icon: "heart-outline", title: "My Wishlist", route: "/(tabs)/index" as any },
    { icon: "location-outline", title: "Shipping Address", route: "/checkout" as any },
    { icon: "card-outline", title: "Payment Methods", route: "/checkout" as any },
    { icon: "notifications-outline", title: "Notifications", route: "/(tabs)/index" as any },
    { icon: "settings-outline", title: "Settings", route: "/(tabs)/index" as any },
    { icon: "information-circle-outline", title: "About Us", route: "/about" as any },
    { icon: "document-text-outline", title: "Terms & Conditions", route: "/terms" as any },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>johndoe@eliteshop.com</Text>
            <View style={styles.badgeRow}>
              <View style={styles.vipBadge}>
                <Ionicons name="star" size={12} color={Colors.warning} />
                <Text style={styles.vipText}>VIP Member</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>$1.2k</Text>
          <Text style={styles.statLabel}>Spent</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>450</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <Text style={styles.menuSectionTitle}>Account Management</Text>
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name={item.icon as any} size={20} color={Colors.secondary} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <View style={styles.logoutContent}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>EliteShop v1.0.2 • Made with Love</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 25,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.white,
    letterSpacing: -0.5,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.2)",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 10,
    fontWeight: "500",
  },
  badgeRow: {
    flexDirection: "row",
  },
  vipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 6,
  },
  vipText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "800",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginHorizontal: 25,
    marginTop: -50,
    borderRadius: BorderRadius.lg,
    paddingVertical: 25,
    ...Shadows.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: "60%",
    backgroundColor: Colors.border,
    alignSelf: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  menuWrapper: {
    paddingHorizontal: 25,
    marginTop: 35,
  },
  menuSectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textSecondary,
    marginBottom: 15,
    marginLeft: 5,
  },
  menuCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: "700",
  },
  logoutBtn: {
    marginTop: 40,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.error,
  },
  versionText: {
    textAlign: "center",
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 50,
  },
});
