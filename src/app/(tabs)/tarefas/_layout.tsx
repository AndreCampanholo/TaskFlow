import { Stack } from "expo-router";
import React from "react";

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Tasks" options={{ title: "Tarefas" }} />
      <Stack.Screen
        name="DetalhesTarefa"
        options={{ title: "Detalhes da Tarefa" }}
      />
      <Stack.Screen name="CriarTarefa" options={{ title: "Criar Tarefa" }} />
      <Stack.Screen name="EditarTarefa" options={{ title: "Editar Tarefa" }} />
      <Stack.Screen
        name="ExcluirTarefa"
        options={{ title: "Excluir Tarefa" }}
      />
    </Stack>
  );
}
