import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

// define o layout (stack de telas) do projeto
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Declara a fonte 'Inter' para o projeto
    Inter: Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
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
