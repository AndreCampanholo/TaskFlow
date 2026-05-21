import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Login() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.max(180, Math.min(380, width - 32));
  const [identifier, setIdentifier] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    router.replace("/tarefas/Tasks" as any);
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.container, { width: cardWidth }]}>
        <MaterialCommunityIcons
          name="check-circle"
          size={64}
          color="#1E3A8A"
          style={styles.icon}
        />

        <Text style={styles.header}>Seja bem-vindo!</Text>
        <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>

        <TextInput
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="E-mail ou CPF"
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          autoCapitalize="none"
          style={styles.textinput}
        />

        <TextInput
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          secureTextEntry
          style={styles.textinput}
        />

        <TouchableOpacity
          style={styles.esqueciSenhaContainer}
          onPress={() => router.push("/RecuperarSenha")}
        >
          <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <BotaoAzulEscuro text="Entrar →" action={handleLogin} />

        <View style={styles.cadastroLine}>
          <Text style={styles.cadastroLineText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/Cadastro")}>
            <Text style={styles.cadastroText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...globalStyles.screen,
    width: "100%",
    paddingHorizontal: 12,
  },
  container: {
    ...globalStyles.screenContainer,
    alignItems: "center",
    minWidth: 0,
    maxWidth: 380,
  },
  icon: {
    marginBottom: 16,
  },
  header: {
    ...globalStyles.headerText,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    ...globalStyles.bodyText,
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(0,0,0,0.7)",
  },
  textinput: {
    ...globalStyles.textInput,
    width: "100%",
    marginVertical: 12,
  },
  esqueciSenhaContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  esqueciSenha: {
    ...globalStyles.forgotPasswordText,
    marginBottom: 16,
  },
  buttonContainer: {
    ...globalStyles.primaryButton,
    width: "100%",
    marginTop: 24,
  },
  buttonText: {
    ...globalStyles.primaryButtonText,
    fontSize: 16,
    fontWeight: "600",
  },
  cadastroLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 4,
  },
  cadastroLineText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
  },
  cadastroText: {
    ...globalStyles.linkText,
    color: colors.verde,
    marginLeft: 0,
  },
});
