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

// Tela/Componente de login
export default function Login() {
  const { width } = useWindowDimensions(); // Define a largura como a largura da janela aberta
  const larguraCard = Math.max(180, Math.min(380, width - 32)); // estabelece limites inferiores e superiores para a largura da caixa de login

  // Campos modificáveis declarados com useState()
  const [identificador, setIdentificador] = useState(""); // Email ou cpf
  const [senha, setSenha] = useState("");

  // Valida as entradas do usuário (posteriormente chamará o back-end através da API)
  function handleLogin() {
    // Usuário deve preencher ambos os campos para logar
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

    // Verifica se foi informado um email ou cpf válido
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

    // Redireciona para a telas de tasks do usuário
    router.replace("/tarefas/Tasks" as any);
  }

  return (
    <LinearGradient
      colors={["#4F83FF", "#F8F8FA", "#52D6B5"]}
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
        {/* Input para o identificador do usuário */}
        <TextInput
          value={identificador}
          onChangeText={setIdentificador}
          placeholder="E-mail ou CPF"
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          autoCapitalize="none"
          style={styles.textinput}
        />
        {/* Input para a senha do usuário */}
        <TextInput
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          secureTextEntry
          style={styles.textinput}
        />
        {/* Botão para acessar tela de recuperação de senha */}
        <TouchableOpacity
          style={styles.esqueciSenhaContainer}
          onPress={() => router.push("/RecuperarSenha")}
        >
          <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>
        {/* Botão para efetuar Login */}
        <BotaoAzulEscuro texto="Entrar →" acao={handleLogin} />
        {/* Botão para ir para tela de cadastro */}
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