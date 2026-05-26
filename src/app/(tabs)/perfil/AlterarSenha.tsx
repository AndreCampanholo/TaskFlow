import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import { globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

// Tela/Componente de alteração de senha
export default function AlterarSenha() {
  // Campos modificáveis declarados com useState
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoNovaSenha, setConfirmacaoNovaSenha] = useState("");

  const { width } = useWindowDimensions();
  const larguraCard = Math.max(180, Math.min(380, width - 32));

  // Efetuará a alteração da senha do usuário
  const concluirAlteracao = () => {
    setNovaSenha("");
    setConfirmacaoNovaSenha("");
    router.back();
  };

  // Executará lógica de alteração da senha do usuário
  const handleAlterarSenha = () => {
    // Ambos os campos devem ser preenchidos
    if (!novaSenha || !confirmacaoNovaSenha) {
      if (Platform.OS === "web") {
        window.alert("Ambos os campos devem ser preenchidos.");
      } else {
        Alert.alert(
          "Alteração inválida",
          "Ambos os campos devem ser preenchidos.",
          [{ text: "Ok", style: "cancel" }],
        );
      }
      return;
    }
    // As senhas informadas devem ser equivalentes
    if (novaSenha.trim() != confirmacaoNovaSenha.trim()) {
      if (Platform.OS === "web") {
        window.alert("A senha confirmada difere da informada.");
      } else {
        Alert.alert(
          "Alteração inválida",
          "A senha confirmada difere da senha informada.",
          [{ text: "Ok", style: "cancel" }],
        );
      }
      return;
    }

    // Verifica se o usuário confirma a alteração da senha
    if (Platform.OS === "web") {
      const shouldUpdate = window.confirm("Confirmar a alteração de senha?");

      if (shouldUpdate) {
        concluirAlteracao();
      }

      return;
    } else {
      Alert.alert("Alterar senha?", "Confirmar a alteração de senha?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Alterar",
          style: "default",
          onPress: concluirAlteracao,
        },
      ]);
    }
  };

  return (
    <View style={globalStyles.screen}>
      <View style={styles.content}>
        <View style={[styles.container, { width: larguraCard }]}>
          <MaterialCommunityIcons
            name="lock"
            size={64}
            color="#1E3A8A"
            style={styles.icon}
          />

          <Text style={styles.title}>Alterar senha</Text>

          {/* Input para a nova senha do usuário */}
          <TextInput
            style={styles.textinput}
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="Nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          {/* Input para a confirmação da nova senha do usuário */}
          <TextInput
            style={styles.textinput}
            value={confirmacaoNovaSenha}
            onChangeText={setConfirmacaoNovaSenha}
            placeholder="Confirmar nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          {/* Botão para confirmar a alteração da senha */}
          <BotaoAzulClaro texto="Alterar senha" acao={handleAlterarSenha} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...globalStyles.centeredContent,
  },
  container: {
    ...globalStyles.screenContainer,
    backgroundColor: "#FFFFFF",
  },
  title: {
    ...globalStyles.sectionTitle,
    marginBottom: 8,
  },
  textinput: {
    ...globalStyles.textInput,
    ...globalStyles.field,
  },
  icon: {
    marginBottom: 16,
  },
});
