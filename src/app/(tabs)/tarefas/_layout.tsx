import { colors } from "@/src/styles/global";
import { Stack } from "expo-router";
import React from "react";

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.branco },
        headerTintColor: colors.azul_escuro,
        headerTitleStyle: {
          color: colors.azul_escuro,
          fontFamily: "Inter",
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen name="Tasks" options={{ title: "Tarefas" }} />
      <Stack.Screen
        name="TarefaDetalhes"
        options={{ title: "Detalhes da Tarefa" }}
      />
      <Stack.Screen
        name="TarefaEditar"
        options={{ title: "Editar Tarefa" }}
      />
    </Stack>
  );
}
