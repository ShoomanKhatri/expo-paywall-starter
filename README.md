# Expo Superwall Starter 🚀

A simple Expo React Native app demonstrating **Superwall** paywall integration with three screens: Home, Paywall Trigger, and Premium Screen.

This project shows how to use Superwall's `register` method to display paywalls and manage subscription states in a React Native app built with Expo Router.

## 📱 Features

- ✅ **Home Screen**: Welcome screen with navigation to other sections
- 🔒 **Paywall Trigger Screen**: Test Superwall placement using `Superwall.register()`
- 💎 **Premium Screen**: Exclusive content for subscribed users
- 🎨 **Clean UI**: Simple, minimal design for easy understanding
- 📱 **Expo Router**: File-based navigation
- 🌓 **Dark/Light Mode**: Built-in theme support

## 🏗️ Project Structure

```
app/
├── _layout.tsx              # Root layout with Superwall initialization
├── premium.tsx              # Premium content screen
└── (tabs)/
    ├── _layout.tsx          # Tab navigation layout
    ├── index.tsx            # Home screen
    └── explore.tsx          # Paywall trigger screen
lib/
└── superwall-config.ts      # Superwall configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- **Superwall Account** ([Sign up here](https://superwall.com))

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure Superwall**

   - Go to [Superwall Dashboard](https://superwall.com/dashboard)
   - Copy your API key
   - Open `lib/superwall-config.ts`
   - Replace `pk_YOUR_SUPERWALL_API_KEY_HERE` with your actual API key

   ```typescript
   const API_KEY = "pk_your_actual_api_key_here";
   ```

3. **Create a Placement in Superwall Dashboard**

   - In your Superwall dashboard, create a new placement
   - Name it: `premium_access` (or update `TEST_PLACEMENT` in `lib/superwall-config.ts`)
   - Configure your paywall design and products

4. **Run the app**

   ```bash
   npx expo start
   ```

   Then press:

   - `i` for iOS Simulator
   - `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 📖 How It Works

### 1. Superwall Initialization

The app initializes Superwall in `app/_layout.tsx` when the app starts:

```typescript
useEffect(() => {
  initializeSuperwall();
}, []);
```

### 2. Triggering the Paywall

The **Paywall Trigger Screen** (`app/(tabs)/explore.tsx`) uses `Superwall.register()`:

```typescript
const result = await Superwall.register(TEST_PLACEMENT);

if (result === "purchased" || result === "restored") {
  // User has premium access
  router.push("/premium");
} else if (result === "closed") {
  // User closed the paywall
}
```

### 3. Checking Subscription Status

```typescript
const status = await Superwall.getSubscriptionStatus();
if (status === "ACTIVE") {
  // User is subscribed
}
```

## 🎯 Key Superwall Methods Used

| Method                              | Purpose                                |
| ----------------------------------- | -------------------------------------- |
| `Superwall.configure()`             | Initialize Superwall with your API key |
| `Superwall.register()`              | Trigger a paywall placement            |
| `Superwall.getSubscriptionStatus()` | Check current subscription state       |

## 📋 Testing the App

1. **Navigate to Home Tab**: See the welcome screen
2. **Navigate to Paywall Tab**: Test the paywall trigger
3. **Tap "Access Premium"**:
   - If not subscribed → Superwall paywall appears
   - If subscribed → Navigate to Premium screen
4. **Tap "Check Status"**: Verify subscription state

## 🔧 Configuration

### Update Superwall API Key

Edit `lib/superwall-config.ts`:

```typescript
const API_KEY = "pk_your_api_key_here";
```

### Change Placement Name

Edit `lib/superwall-config.ts`:

```typescript
export const TEST_PLACEMENT = "your_placement_name";
```

### Adjust Logging Level

In production, change logging to reduce console output:

```typescript
Superwall.configure(API_KEY, {
  logging: {
    level: "warn", // or 'error'
  },
});
```

## 📦 Dependencies

- **@superwall/react-native-superwall**: Superwall SDK for React Native (works with Expo)
- **expo-router**: File-based routing
- **expo**: Expo SDK ~54.0
- **react-native**: 0.81.5

## 🛠️ Troubleshooting

### Paywall doesn't show?

1. Verify your API key is correct in `lib/superwall-config.ts`
2. Check that you created the placement `premium_access` in Superwall Dashboard
3. Look for errors in the console logs
4. Make sure you're testing on iOS or Android (Superwall doesn't support web)

### Build errors?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

## 📚 Learn More

- [Superwall Documentation](https://docs.superwall.com)
- [Superwall React Native SDK](https://github.com/superwall/react-native-superwall)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo Documentation](https://docs.expo.dev/)

## 💡 Next Steps

- Configure real products in your Superwall dashboard
- Add product IDs from App Store Connect / Google Play Console
- Test purchases in sandbox mode
- Customize paywall designs
- Add analytics tracking
- Implement subscription management

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For Superwall-specific questions:

- [Superwall Docs](https://docs.superwall.com)
- [Superwall Support](https://superwall.com/support)

For Expo questions:

- [Expo Discord](https://chat.expo.dev)
- [Expo Forums](https://forums.expo.dev)
