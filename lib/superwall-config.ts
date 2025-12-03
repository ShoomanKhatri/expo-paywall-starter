import Constants from 'expo-constants';

// Check if running in Expo Go (native modules not available)
// Use expo-constants to reliably detect Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

console.log('🔍 Expo Go Detection:', {
    appOwnership: Constants.appOwnership,
    isExpoGo: isExpoGo,
    executionEnvironment: Constants.executionEnvironment
});

let Superwall: any = null;

if (isExpoGo) {
    console.warn('⚠️ Running in Expo Go - Superwall native module not available. Using mock implementation.');

    // Mock Superwall for Expo Go
    Superwall = {
        configure: () => {
            console.log('[Mock] Superwall.configure called');
        },
        shared: {
            register: async (placement: string) => {
                console.log('[Mock] Superwall.shared.register called:', placement);
                return Promise.resolve();
            }
        }
    };
} else {
    try {
        Superwall = require('@superwall/react-native-superwall').default;
    } catch (error) {
        console.error('Failed to load Superwall module:', error);
        // Fallback to mock
        Superwall = {
            configure: () => { },
            shared: { register: async () => { } }
        };
    }
}

export { isExpoGo, Superwall };

// Initialize Superwall
// API key is loaded from .env file
export const initializeSuperwall = () => {
    const API_KEY = process.env.EXPO_PUBLIC_SUPERWALL_API_KEY || 'pk_YOUR_SUPERWALL_API_KEY_HERE';

    if (!API_KEY || API_KEY === 'pk_YOUR_SUPERWALL_API_KEY_HERE') {
        console.warn('⚠️ Superwall API key not configured. Please set EXPO_PUBLIC_SUPERWALL_API_KEY in your .env file');
    }

    if (isExpoGo) {
        console.log('[Mock] Initializing Superwall in Expo Go mode (no native module)');
        return;
    }

    Superwall.configure(API_KEY);
};

// Test placement name - loaded from .env or default
export const TEST_PLACEMENT = process.env.EXPO_PUBLIC_SUPERWALL_PLACEMENT || 'premium_access';
