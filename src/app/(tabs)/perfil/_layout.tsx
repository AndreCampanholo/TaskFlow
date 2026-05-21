import { Stack } from "expo-router";
import React from "react";

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Perfil" options={{ title: "Perfil" }} />
      <Stack.Screen name="EditarPerfil" options={{ title: "Editar Perfil" }} />
      <Stack.Screen name="AlterarSenha" options={{ title: "Alterar Senha" }} />
      <Stack.Screen name="ExcluirConta" options={{ title: "Excluir Conta" }} />
    </Stack>
  );
}
