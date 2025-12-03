import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Superwall, TEST_PLACEMENT, isExpoGo } from "@/lib/superwall-config";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaywallTriggerScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showExpoGoModal, setShowExpoGoModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "unknown" | "subscribed" | "not_subscribed"
  >("unknown");

  const handleAccessPremium = async () => {
    console.log("🔘 Access Premium clicked! isExpoGo:", isExpoGo);
    try {
      setIsLoading(true);

      if (isExpoGo) {
        console.log("✅ Showing Expo Go modal...");
        setIsLoading(false);
        setShowExpoGoModal(true);
      } else {
        console.log("📱 Using real Superwall (development build)...");
        // Register event with Superwall to trigger paywall
        // This will automatically show the paywall if the user is not subscribed
        await Superwall.shared.register(TEST_PLACEMENT);

        console.log("Paywall triggered for placement:", TEST_PLACEMENT);

        // After paywall interaction completes
        // In a real app, use Superwall delegate to handle purchase events
        setSubscriptionStatus("not_subscribed");
        setIsLoading(false);
        Alert.alert(
          "Paywall Displayed",
          "In a production app, Superwall will handle the purchase flow automatically. Configure your products in the Superwall dashboard."
        );
      }
    } catch (error) {
      console.error("Error triggering paywall:", error);
      setIsLoading(false);
      Alert.alert(
        "Error",
        "Failed to show paywall. Make sure you have configured your Superwall API key and created the placement in your dashboard."
      );
    }
  };

  const checkSubscriptionStatus = () => {
    // For demo purposes, show instructions
    Alert.alert(
      "Subscription Status",
      "To check subscription status in a production app, you would:\n\n" +
        "1. Use RevenueCat or your payment provider's API\n" +
        "2. Set up Superwall delegate callbacks\n" +
        "3. Track purchases through Superwall events\n\n" +
        "For now, tap 'Access Premium' to see the Superwall paywall."
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Paywall Trigger
      </ThemedText>

      <ThemedText style={styles.description}>
        This screen demonstrates Superwall's paywall integration using the
        `register` method.
      </ThemedText>

      <View style={styles.infoBox}>
        <ThemedText style={styles.infoTitle}>How it works:</ThemedText>
        <ThemedText style={styles.infoText}>
          1. Tap "Access Premium" button{" \n"}
          2. Superwall checks subscription status{" \n"}
          3. Shows paywall if not subscribed{" \n"}
          4. Grants access if subscribed or purchased
        </ThemedText>
      </View>

      <View style={styles.statusContainer}>
        <ThemedText style={styles.statusLabel}>Subscription Status:</ThemedText>
        <ThemedText
          style={[
            styles.status,
            {
              color:
                subscriptionStatus === "subscribed" ? "#34C759" : "#FF9500",
            },
          ]}
        >
          {subscriptionStatus === "subscribed"
            ? "✓ Subscribed"
            : subscriptionStatus === "not_subscribed"
            ? "✗ Not Subscribed"
            : "? Unknown"}
        </ThemedText>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleAccessPremium}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Access Premium</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={checkSubscriptionStatus}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Check Status
        </Text>
      </TouchableOpacity>

      <ThemedText style={styles.note}>
        Note: Make sure to configure your Superwall API key and create a
        placement named "{TEST_PLACEMENT}" in your Superwall dashboard.
      </ThemedText>

      {/* Expo Go Warning Modal */}
      <Modal
        visible={showExpoGoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowExpoGoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚠️ Expo Go Mode</Text>
            <Text style={styles.modalText}>
              You're running in Expo Go, which doesn't support native modules.
              {"\n\n"}
              To see REAL Superwall paywalls:{"\n"}
              1. Build: eas build --platform ios{"\n"}
              2. Install the build on your device{"\n"}
              3. Test the paywall{"\n\n"}
              For now, tap "Go to Premium" to view the premium screen (demo
              only).
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowExpoGoModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => {
                  setShowExpoGoModal(false);
                  router.push("/premium");
                }}
              >
                <Text style={styles.modalButtonText}>Go to Premium</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
  },
  infoBox: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  statusLabel: {
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.6,
    marginTop: 24,
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#000",
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#f0f0f0",
  },
  modalButtonPrimary: {
    backgroundColor: "#007AFF",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalButtonTextCancel: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});
