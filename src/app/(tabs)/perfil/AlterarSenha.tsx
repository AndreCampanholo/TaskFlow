import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

export default function AlterarSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const { width } = useWindowDimensions();
  const cardWidth = Math.max(180, Math.min(380, width - 32));

  const handleAlterarSenha = () => {
    console.log("Senha alterada.");
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

          <Text style={styles.title}>Alterar senha</Text>

          <TextInput
            style={styles.textinput}
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="Nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          <TextInput
            style={styles.textinput}
            value={confirmarNovaSenha}
            onChangeText={setConfirmarNovaSenha}
            placeholder="Confirmar nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          <BotaoAzulClaro text="Alterar senha" action={handleAlterarSenha} />
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
