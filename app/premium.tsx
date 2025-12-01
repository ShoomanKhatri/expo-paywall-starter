import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PremiumScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            🎉 Premium Content
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Welcome to your exclusive premium area!
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>✨</ThemedText>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            Unlimited Access
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            You now have full access to all premium features and content.
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>🚀</ThemedText>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            Advanced Features
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Unlock powerful tools and capabilities exclusive to premium members.
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>💎</ThemedText>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            Premium Support
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Get priority support and exclusive updates before anyone else.
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <ThemedText style={styles.featureIcon}>🎯</ThemedText>
          <ThemedText type="subtitle" style={styles.featureTitle}>
            No Ads
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            Enjoy an ad-free experience with seamless navigation.
          </ThemedText>
        </View>

        <View style={styles.infoBox}>
          <ThemedText style={styles.infoText}>
            This screen represents premium content that's only accessible to
            subscribed users. In a real app, you would check the subscription
            status before allowing access.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
  },
  featureCard: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: "rgba(255, 149, 0, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 13,
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
  },
});
