import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import { globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  const [confirmacaoNovaSenha, setConfirmacaoNovaSenha] = useState("");

  const { width } = useWindowDimensions();
  const larguraCard = Math.max(180, Math.min(380, width - 32));

  const handleAlterarSenha = () => {
    console.log("Senha alterada.");
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

          <TextInput
            style={styles.textinput}
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="Nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

          <TextInput
            style={styles.textinput}
            value={confirmacaoNovaSenha}
            onChangeText={setConfirmacaoNovaSenha}
            placeholder="Confirmar nova senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
          />

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
