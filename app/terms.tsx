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

export default function TermsScreen() {
  const router = useRouter();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using EliteShop, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on EliteShop's website for personal, non-commercial transitory viewing only."
    },
    {
      title: "3. User Accounts",
      content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account."
    },
    {
      title: "4. Purchases & Payments",
      content: "All purchases made through EliteShop are subject to product availability. We reserve the right to refuse or cancel any order for any reason including limitations on quantities available for purchase, inaccuracies, or errors in product or pricing information."
    },
    {
      title: "5. Privacy Policy",
      content: "Your use of EliteShop is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices."
    },
    {
      title: "6. Limitation of Liability",
      content: "In no event shall EliteShop or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EliteShop."
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: May 2026</Text>
        
        <Text style={styles.intro}>
          Please read these terms and conditions carefully before using our mobile application.
        </Text>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <Text style={styles.contactText}>
            If you have any questions about these Terms, please contact us at:
          </Text>
          <Text style={styles.email}>legal@eliteshop.com</Text>
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
  lastUpdated: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: "700",
    marginBottom: 10,
  },
  intro: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    fontWeight: "500",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontWeight: "500",
  },
  contactSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 40,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
});
