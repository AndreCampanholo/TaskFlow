import { colors } from "@/src/styles/global";
import { Stack } from "expo-router";
import React from "react";

// Define o layout/stack das telas de tarefas
export default function TarefasLayout() {
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
      {/* Tela principal (onde são dispostas as tarefas criadas) */}
      <Stack.Screen name="Tasks" options={{ title: "Tarefas" }} />
      {/* Tela de detalhes das tarefas */}
      <Stack.Screen
        name="TarefaDetalhes"
        options={{ title: "Detalhes da Tarefa" }}
      />
      {/* Tela de edição de tarefa */}
      <Stack.Screen name="TarefaEditar" options={{ title: "Editar Tarefa" }} />
    </Stack>
  );
}
