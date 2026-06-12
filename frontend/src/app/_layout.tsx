import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

import SplashScreen from "@/src/components/SplashScreen";

// define o layout (stack de telas) do projeto
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Declara a fonte 'Inter' para o projeto
    Inter: Inter_400Regular,
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Telas disponíveis após login */}
      <Stack.Screen name="(auth)" />
      {/* Telas disponíveis após login */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}