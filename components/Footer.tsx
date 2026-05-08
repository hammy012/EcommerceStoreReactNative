import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors, BorderRadius, Spacing } from "@/constants/theme";

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <Text style={styles.logo}>Elite<Text style={{color: Colors.primary}}>Shop</Text></Text>
          <Text style={styles.tagline}>Curating the world's most premium products for your lifestyle.</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-facebook" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-instagram" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-twitter" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-linkedin" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.linksRow}>
          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Shop</Text>
            <TouchableOpacity><Text style={styles.linkText}>All Categories</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>New Arrivals</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Limited Editions</Text></TouchableOpacity>
          </View>
          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>Support</Text>
            <TouchableOpacity><Text style={styles.linkText}>Help Center</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Track Order</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Refund Policy</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>© 2026 EliteShop. All rights reserved.</Text>
        <Text style={styles.madeWith}>Made with ❤️ for premium shopping.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 50,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  content: {
    paddingHorizontal: 25,
    marginBottom: 40,
  },
  brandSection: {
    marginBottom: 35,
  },
  logo: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 22,
    maxWidth: "80%",
  },
  socialIcons: {
    flexDirection: "row",
    gap: 12,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkColumn: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.secondary,
    marginBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    fontWeight: "500",
  },
  bottomBar: {
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  madeWith: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
