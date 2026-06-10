import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import { apiAlterarSenha } from "@/src/services/api";
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

export default function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacaoNovaSenha, setConfirmacaoNovaSenha] = useState("");

  const { width } = useWindowDimensions();
  const larguraCard = Math.max(180, Math.min(380, width - 32));

  function exibirAlerta(titulo: string, mensagem: string) {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem, [{ text: "Ok", style: "cancel" }]);
    }
  }

  const handleAlterarSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmacaoNovaSenha) {
      exibirAlerta("Alteração inválida", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (novaSenha.trim() !== confirmacaoNovaSenha.trim()) {
      exibirAlerta("Alteração inválida", "A senha confirmada difere da senha informada.");
      return;
    }

    const concluir = async () => {
      try {
        await apiAlterarSenha(senhaAtual, novaSenha);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmacaoNovaSenha("");
        router.back();
      } catch (error: any) {
        exibirAlerta("Erro", error.message || "Não foi possível alterar a senha.");
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm("Confirmar a alteração de senha?")) concluir();
    } else {
      Alert.alert("Alterar senha?", "Confirmar a alteração de senha?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Alterar", style: "default", onPress: concluir },
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

          {/* Input para a senha atual do usuário */}
          <TextInput
            style={styles.textinput}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholder="Senha atual"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            secureTextEntry
          />

          {/* Input para a nova senha do usuário */}
          <TextInput
            style={styles.textinput}
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="Nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            secureTextEntry
          />

          {/* Input para a confirmação da nova senha do usuário */}
          <TextInput
            style={styles.textinput}
            value={confirmacaoNovaSenha}
            onChangeText={setConfirmacaoNovaSenha}
            placeholder="Confirmar nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            secureTextEntry
          />
          {/* Botão para confirmar a alteração da senha */}
          <BotaoAzulEscuro texto="Alterar senha" acao={handleAlterarSenha} />
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
