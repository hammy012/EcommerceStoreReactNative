import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Colors, BorderRadius, Shadows } from "@/constants/theme";

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  return (
    <View style={[styles.headerContainer, transparent && styles.transparentContainer]}>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.welcomeText, transparent && { color: "rgba(255,255,255,0.7)" }]}>Welcome back,</Text>
          <Text style={styles.logo}>Elite<Text style={{color: Colors.primary}}>Shop</Text></Text>
        </View>
        <View style={styles.topIcons}>
          <TouchableOpacity style={[styles.iconButton, transparent && styles.transparentIconButton]}>
            <Ionicons name="notifications-outline" size={22} color={Colors.white} />
            <View style={styles.dotBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, transparent && styles.transparentIconButton]}>
            <Ionicons name="cart-outline" size={22} color={Colors.white} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput 
            placeholder="Search premium products..." 
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
          />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="scan-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.secondary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  transparentContainer: {
    backgroundColor: "transparent",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
  },
  logo: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  topIcons: {
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {
    position: "relative",
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  transparentIconButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dotBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: Colors.error,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  searchWrapper: {
    ...Shadows.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 15,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    fontWeight: "500",
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
  },
  cameraButton: {
    padding: 5,
  },
});
