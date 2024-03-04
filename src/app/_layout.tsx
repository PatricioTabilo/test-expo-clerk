import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "../utils/token.cache";

import "../styles.css";

SplashScreen.preventAutoHideAsync().catch(() =>
  console.log("Failed to prevent splash screen from hiding.")
);

export default function Layout() {
  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <Slot />
      <StatusBar />
    </ClerkProvider>
  );
}
