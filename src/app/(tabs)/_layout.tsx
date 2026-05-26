import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// Define o layout/stack das abas ("tabs")
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.branco,
          borderTopColor: colors.preto,
        },
        tabBarActiveTintColor: colors.azul_escuro,
        tabBarInactiveTintColor: colors.background,
      }}
    >
      {/* Telas de manipulação e visualização das tarefas */}
      <Tabs.Screen
        name="tarefas"
        options={{
          title: "Tarefas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Telas de manipulação e visualização do perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
