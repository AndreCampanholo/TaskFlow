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
      <Stack.Screen name="Perfil" options={{ title: "Perfil" }} />
      <Stack.Screen name="EditarPerfil" options={{ title: "Editar Perfil" }} />
      <Stack.Screen name="AlterarSenha" options={{ title: "Alterar Senha" }} />
      <Stack.Screen
        name="ExcluirConta"
        options={{
          title: "Excluir Conta",
          headerShown: false,
          presentation: "transparentModal",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack>
  );
}
