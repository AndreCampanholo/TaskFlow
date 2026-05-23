import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
      <Tabs.Screen
        name="tarefas"
        options={{
          title: "Tarefas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
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
