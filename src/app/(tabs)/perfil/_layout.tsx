import { colors } from "@/src/styles/global";
import { Stack } from "expo-router";
import React from "react";

// Define o Layout/pilha das telas de manipulação do perfil do usuário
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
      {/* Tela principal que exibe o perfil e as opções do usuário*/}
      <Stack.Screen name="Perfil" options={{ title: "Perfil" }} />
      {/* Tela de edição das informações do usuário */}
      <Stack.Screen name="EditarPerfil" options={{ title: "Editar Perfil" }} />
      {/* Tela para alteração da senha */}
      <Stack.Screen name="AlterarSenha" options={{ title: "Alterar Senha" }} />
      {/* Tela (com overlay) para exclusão da conta do usuário */}
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
