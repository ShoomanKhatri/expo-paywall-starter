import Superwall from '@superwall/react-native-superwall';

// Initialize Superwall
// API key is loaded from .env file
export const initializeSuperwall = () => {
    const API_KEY = process.env.EXPO_PUBLIC_SUPERWALL_API_KEY || 'pk_YOUR_SUPERWALL_API_KEY_HERE';

    if (!API_KEY || API_KEY === 'pk_YOUR_SUPERWALL_API_KEY_HERE') {
        console.warn('⚠️ Superwall API key not configured. Please set EXPO_PUBLIC_SUPERWALL_API_KEY in your .env file');
    }

    Superwall.configure(API_KEY);
};

// Test placement name - loaded from .env or default
export const TEST_PLACEMENT = process.env.EXPO_PUBLIC_SUPERWALL_PLACEMENT || 'premium_access';
