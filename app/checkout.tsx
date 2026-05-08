import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
} from "react-native";
import { Colors, BorderRadius, Spacing, Shadows } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={["top"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressRow}>
          <View style={styles.progressStep}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Ionicons name="location" size={16} color={Colors.white} />
            </View>
            <Text style={styles.stepLabel}>Shipping</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Ionicons name="card" size={16} color={Colors.textMuted} />
            </View>
            <Text style={styles.stepLabel}>Payment</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Ionicons name="checkmark-done" size={16} color={Colors.textMuted} />
            </View>
            <Text style={styles.stepLabel}>Confirm</Text>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <TouchableOpacity>
              <Text style={styles.editLink}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Ionicons name="home" size={20} color={Colors.primary} />
            </View>
            <View style={styles.addressDetails}>
              <Text style={styles.addressName}>John Doe</Text>
              <Text style={styles.addressText}>123 Business Avenue, Suite 456</Text>
              <Text style={styles.addressText}>Silicon Valley, CA 94025</Text>
              <Text style={styles.addressPhone}>+1 234 567 890</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity 
              style={[styles.paymentOption, paymentMethod === "card" && styles.paymentOptionActive]}
              onPress={() => setPaymentMethod("card")}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconBox}>
                  <Ionicons name="card" size={20} color={paymentMethod === "card" ? Colors.primary : Colors.textMuted} />
                </View>
                <Text style={[styles.paymentText, paymentMethod === "card" && styles.paymentTextActive]}>Credit / Debit Card</Text>
              </View>
              <View style={[styles.radioCircle, paymentMethod === "card" && styles.radioCircleActive]}>
                {paymentMethod === "card" && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.paymentOption, paymentMethod === "paypal" && styles.paymentOptionActive]}
              onPress={() => setPaymentMethod("paypal")}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconBox}>
                  <Ionicons name="logo-paypal" size={20} color={paymentMethod === "paypal" ? Colors.primary : Colors.textMuted} />
                </View>
                <Text style={[styles.paymentText, paymentMethod === "paypal" && styles.paymentTextActive]}>PayPal</Text>
              </View>
              <View style={[styles.radioCircle, paymentMethod === "paypal" && styles.radioCircleActive]}>
                {paymentMethod === "paypal" && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.paymentOption, paymentMethod === "cod" && styles.paymentOptionActive]}
              onPress={() => setPaymentMethod("cod")}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconBox}>
                  <Ionicons name="cash" size={20} color={paymentMethod === "cod" ? Colors.primary : Colors.textMuted} />
                </View>
                <Text style={[styles.paymentText, paymentMethod === "cod" && styles.paymentTextActive]}>Cash on Delivery</Text>
              </View>
              <View style={[styles.radioCircle, paymentMethod === "cod" && styles.radioCircleActive]}>
                {paymentMethod === "cod" && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput 
              placeholder="Enter code here" 
              placeholderTextColor={Colors.textMuted}
              style={styles.promoInput}
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$314.99</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Fee</Text>
            <Text style={styles.summaryValue}>$15.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={[styles.summaryValue, { color: Colors.error }]}>-$10.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>$319.99</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Total Payment</Text>
          <Text style={styles.bottomPriceValue}>$319.99</Text>
        </View>
        <TouchableOpacity 
          style={styles.payBtn}
          onPress={() => router.push("/(tabs)/index")}
        >
          <Text style={styles.payBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  progressStep: {
    alignItems: "center",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textMuted,
  },
  stepLine: {
    width: 50,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: 10,
    marginTop: -15,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.secondary,
    marginBottom: 15,
  },
  editLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "700",
  },
  addressCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addressIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  addressDetails: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.secondary,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontWeight: "500",
  },
  addressPhone: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "700",
    marginTop: 8,
  },
  paymentOptions: {
    gap: 15,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  paymentOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  paymentIconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  paymentTextActive: {
    color: Colors.secondary,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  promoContainer: {
    flexDirection: "row",
    gap: 12,
  },
  promoInput: {
    flex: 1,
    height: 54,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  applyBtn: {
    paddingHorizontal: 25,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  applyBtnText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 14,
  },
  summarySection: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
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
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
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
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.lg,
  },
  bottomPrice: {
    flex: 1,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
    marginBottom: 4,
  },
  bottomPriceValue: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.primary,
  },
  payBtn: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  payBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
