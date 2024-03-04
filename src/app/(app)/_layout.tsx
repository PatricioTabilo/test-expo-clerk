import { useEffect } from "react";
import { Redirect } from "expo-router";
import { Tabs } from "expo-router/tabs";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  console.log(isLoaded);

  useEffect(() => {
    console.log(isLoaded);
    const hideSplash = async () => {
      if (isLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash().catch(console.error);
  });

  if (!isSignedIn) {
    return <Redirect href="/signin" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="transactions" options={{ title: "Transacciones" }} />
    </Tabs>
  );
}
