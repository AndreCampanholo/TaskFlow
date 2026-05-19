import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");

  const { width } = useWindowDimensions();
  const cardWidth = Math.max(180, Math.min(380, width - 32));

  const handleRecuperarSenha = () => {
    console.log("Protocolo de recuperação de senha iniciado.");
  };

  return (
    <View style={globalStyles.screen}>
      <View style={styles.content}>
        <View style={[styles.container, { width: cardWidth }]}>
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

          <TextInput
            style={styles.textinput}
            value={email}
            onChangeText={setEmail}
            placeholder="email@exemplo.com"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          <BotaoAzulClaro
            text="Enviar link de recuperação"
            action={handleRecuperarSenha}
          />

          <TouchableOpacity
            style={styles.loginLine}
            onPress={() => router.back()}
          >
            <Text style={styles.loginLineText}>Voltar para login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    ...globalStyles.screenContainer,
    alignItems: "center",
    minWidth: 0,
    maxWidth: 380,
  },
  title: {
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
    marginVertical: 10,
  },
  buttonStyle: {
    ...globalStyles.primaryButton,
    backgroundColor: colors.azul_claro,
    width: "100%",
    marginTop: 24,
  },
  icon: {
    marginBottom: 16,
  },
  buttonText: {
    ...globalStyles.primaryButtonText,
    fontSize: 16,
    fontWeight: "600" as any,
  },
  loginLine: {
    flexDirection: "row" as any,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginLineText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
  },
});
