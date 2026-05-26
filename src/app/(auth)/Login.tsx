import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Login() {
  const { width } = useWindowDimensions();
  const larguraCard = Math.max(180, Math.min(380, width - 32));
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    if (!identificador.trim() || !senha.trim()) {
      if (Platform.OS === "web") {
        window.alert("Todos os campos devem ser preenchidos.");
      } else {
        Alert.alert(
          "Cadastro inválido",
          "Todos os campos devem ser preenchidos.",
          [{ text: "Ok", style: "cancel" }],
        );
      }
      return;
    }

    const valorInformado = identificador.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    const emailValido = emailRegex.test(valorInformado);
    const cpfNumeros = valorInformado.replace(/\D/g, "");
    const cpfValido = /^\d{11}$/.test(cpfNumeros);
    if (!emailValido && !cpfValido) {
      const msg = "Informe um E-mail válido ou um CPF com 11 dígitos.";
      if (Platform.OS === "web") {
        window.alert(msg);
      } else {
        Alert.alert("Erro", msg, [{ text: "Ok", style: "cancel" }]);
      }
      return;
    }

    router.replace("/tarefas/Tasks" as any);
  }

  return (
    <LinearGradient
      colors={[colors.azul_claro, colors.branco, colors.verde]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <View style={[styles.container, { width: larguraCard }]}>
        <MaterialCommunityIcons
          name="check-circle"
          size={64}
          color="#1E3A8A"
          style={styles.icon}
        />

        <Text style={styles.header}>Seja bem-vindo!</Text>
        <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>

        <TextInput
          value={identificador}
          onChangeText={setIdentificador}
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

        <BotaoAzulEscuro texto="Entrar →" acao={handleLogin} />

        <View style={styles.cadastroLine}>
          <Text style={styles.cadastroLineText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/Cadastro")}>
            <Text style={styles.cadastroText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...globalStyles.fullScreen,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    ...globalStyles.screenContainer,
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  icon: {
    marginBottom: 16,
  },
  header: {
    ...globalStyles.sectionTitle,
    fontSize: 30,
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
  esqueciSenhaContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  esqueciSenha: {
    ...globalStyles.forgotPasswordText,
    marginBottom: 16,
  },
  cadastroLine: {
    ...globalStyles.linkRow,
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