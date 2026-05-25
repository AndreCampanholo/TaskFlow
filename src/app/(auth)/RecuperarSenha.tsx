import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import { globalStyles } from "@/src/styles/global";
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
  const [emailRecuperacao, setEmailRecuperacao] = useState("");

  const { width } = useWindowDimensions();
  const larguraCard = Math.max(180, Math.min(380, width - 32));

  const handleSolicitarRecuperacao = () => {
    console.log("Protocolo de recuperação de senha iniciado.");
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

          <Text style={styles.title}>Recuperar senha</Text>

          <Text style={styles.subtitle}>
            Digite o e-mail associado à sua conta e enviaremos um link para você
            redefinir sua senha.
          </Text>

          <TextInput
            style={styles.textinput}
            value={emailRecuperacao}
            onChangeText={setEmailRecuperacao}
            placeholder="email@exemplo.com"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          <BotaoAzulClaro
            texto="Enviar link de recuperação"
            acao={handleSolicitarRecuperacao}
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
    ...globalStyles.centeredContent,
  },
  container: {
    ...globalStyles.screenContainer,
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
