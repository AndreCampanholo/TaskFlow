import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

// Tela/Componente de recuperação de senha
export default function RecuperarSenha() {
  // Campo modificável declarado com useState
  const [emailRecuperacao, setEmailRecuperacao] = useState("");

  const { width } = useWindowDimensions(); // Define a largura como a largura da janela aberta
  const larguraCard = Math.max(180, Math.min(380, width - 32)); // estabelece limites inferiores e superiores para a largura da caixa de login

  function exibirAlerta(titulo: string, mensagem: string, onOk?: () => void) {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n\n${mensagem}`);
      onOk?.();
    } else {
      Alert.alert(titulo, mensagem, [{ text: "Ok", onPress: onOk }]);
    }
  }

  // Executará o protocolo de recuperação de senha
  const handleSolicitarRecuperacao = () => {
    exibirAlerta(
      "Aviso",
      "Esta funcionalidade não está habilitada. Voltando para tela de login.",
    );
    router.back();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.azul_escuro}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.container, { width: larguraCard }]}>
          <MaterialCommunityIcons
            name="lock"
            size={64}
            color="#1E3A8A"
            style={styles.icon}
          />

          <Text style={styles.title}>Recuperar senha</Text>

          <Text style={styles.subtitle}>
            Digite o e-mail associado à sua conta e enviaremos um link para você
            redefinir sua senha.
          </Text>

          {/* Input para o email do usuário */}
          <TextInput
            style={styles.textinput}
            value={emailRecuperacao}
            onChangeText={setEmailRecuperacao}
            placeholder="email@exemplo.com"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          {/* Botão para enviar o link e iniciar o protocolo de recuperação */}
          <BotaoAzulEscuro
            texto="Enviar link de recuperação"
            acao={handleSolicitarRecuperacao}
          />

          {/* Botão para retornar à tela de login */}
          <TouchableOpacity onPress={() => router.replace("/Login")}>
            <Text style={styles.loginLineText}>Voltar para login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  headerContainer: {
    width: "100%",
    height: 64,
    backgroundColor: colors.branco,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    ...globalStyles.screenContainer,
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.branco,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  title: {
    ...globalStyles.sectionTitle,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.sectionSubtitle,
    marginBottom: 20,
  },
  textinput: {
    ...globalStyles.textInput,
    ...globalStyles.field,
  },
  icon: {
    marginBottom: 16,
  },
  loginLine: {
    ...globalStyles.linkRow,
  },
  loginLineText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
  },
});
