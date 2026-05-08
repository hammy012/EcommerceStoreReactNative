import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About EliteShop</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>E<Text style={{ color: Colors.primary }}>S</Text></Text>
          </View>
          <Text style={styles.appName}>EliteShop v1.0.2</Text>
          <Text style={styles.tagline}>Premium Quality, Professional Service</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.paragraph}>
            EliteShop was founded with a single mission: to provide the most premium shopping experience for discerning customers worldwide. We believe in quality over quantity and curated excellence in every product we offer.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
            <Text style={styles.featureText}>Hand-picked Premium Products</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
            <Text style={styles.featureText}>Express Global Delivery</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
            <Text style={styles.featureText}>24/7 Priority Support</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
            <Text style={styles.featureText}>Secure & Encrypted Payments</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Text style={styles.paragraph}>
            Started in 2024, EliteShop has grown from a small boutique collection to a global destination for premium electronics, fashion, and lifestyle essentials. Our commitment to authenticity and customer satisfaction remains our top priority.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 EliteShop Inc.</Text>
          <Text style={styles.footerText}>Made with ❤️ for Elite Customers</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  content: {
    padding: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.md,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "900",
    color: Colors.white,
  },
  appName: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    fontWeight: "500",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
    fontWeight: "600",
  },
});
