import BotaoCancelar from "@/src/components/BotaoCancelar";
import { colors, globalStyles } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tela/Componente de exclusão de conta
export default function ExcluirConta() {
  // Delimita uma faixa superior da tela que não deve ser usada (espaço reservado para camera, horário, bateria do celular)
  const insets = useSafeAreaInsets();

  // Campo variável declarado com useState
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");

  // Valida a entrada do usuário para exclusão da conta (futuramente comparará com a senha do usuário para validar exclusão e apagará conta do banco de dados)
  function handleExcluirConta() {
    // Se a senha não for informada exibe alerta e não efetua exclusão
    if (!senhaConfirmacao.trim()) {
      if (Platform.OS === "web") {
        window.alert("Insira a senha para excluir sua conta!");
        return;
      }

      Alert.alert("Excluir conta", "Insira a senha para excluir sua conta!", [
        { text: "Ok", style: "default" },
      ]);
      return;
    }

    router.replace("/Login"); // Redireciona para a tela de login
    return;
  }

  return (
    // Tela feita como um "overlay" (aparece sobre a tela anterior com fundo transparente). Clicar ao redor da tela retorna à tela de perfil
    <Pressable
      style={[
        styles.overlay,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
      ]}
      onPress={() => router.back()}
    >
      <Pressable style={styles.card} onPress={() => null}>
        <View style={styles.iconWrap}>
          <Ionicons name="warning" size={28} color={colors.vermelho} />
        </View>

        <Text style={styles.title}>Excluir conta?</Text>

        <Text style={styles.description}>
          Esta ação é irreversível. Todos os seus dados, tarefas e histórico
          serão permanentemente removidos. Para prosseguir, confirme sua senha.
        </Text>

        {/* Input para a senha do usuário */}
        <Text style={styles.label}>Senha de confirmação</Text>
        <TextInput
          value={senhaConfirmacao}
          onChangeText={setSenhaConfirmacao}
          placeholder="Digite sua senha"
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.actions}>
          {/* Botão que exclui a conta do usuário */}
          <Pressable style={styles.deleteButton} onPress={handleExcluirConta}>
            <Ionicons name="trash-outline" size={16} color={colors.branco} />
            <Text style={styles.deleteButtonText}>Excluir minha conta</Text>
          </Pressable>

          {/* Botão para cancelar a exclusão da conta */}
          <BotaoCancelar texto="Cancelar" acao={() => router.back()} />
        </View>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...globalStyles.modalBackdrop,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(186,26,26,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    ...globalStyles.sectionTitle,
    marginBottom: 10,
  },
  description: {
    ...globalStyles.sectionSubtitle,
    marginBottom: 16,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 6,
    color: "rgba(0,0,0,0.75)",
    fontSize: 13,
  },
  input: {
    ...globalStyles.textInput,
    ...globalStyles.field,
    marginTop: 0,
    marginBottom: 16,
  },
  actions: {
    width: "100%",
  },
  deleteButton: {
    backgroundColor: colors.vermelho,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  deleteButtonText: {
    color: colors.branco,
    fontWeight: "700",
  },
});
