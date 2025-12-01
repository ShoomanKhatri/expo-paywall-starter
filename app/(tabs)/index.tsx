import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Expo Superwall Demo
      </ThemedText>

      <ThemedText style={styles.description}>
        This app demonstrates Superwall integration with three screens:
      </ThemedText>

      <View style={styles.infoContainer}>
        <ThemedText style={styles.infoItem}>✓ Home (this screen)</ThemedText>
        <ThemedText style={styles.infoItem}>
          ✓ Paywall Trigger (test placement)
        </ThemedText>
        <ThemedText style={styles.infoItem}>
          ✓ Premium Screen (for subscribed users)
        </ThemedText>
      </View>

      <ThemedText style={styles.instructions}>
        Navigate to the "Paywall" tab to test the Superwall integration.
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/premium")}
      >
        <Text style={styles.buttonText}>View Premium Screen</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
  },
  infoContainer: {
    marginBottom: 32,
    alignItems: "flex-start",
  },
  infoItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  instructions: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
