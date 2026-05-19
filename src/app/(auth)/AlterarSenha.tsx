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
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const { width } = useWindowDimensions();
  const cardWidth = Math.max(180, Math.min(380, width - 32));

  const handleAlterarSenha = () => {
    console.log("Senha alterada.");
  };

  return (
    <View style={globalStyles.screen}>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 8,
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
  textinput: {
    ...globalStyles.textInput,
    width: "100%",
    marginVertical: 10,
  },
  icon: {
    marginBottom: 16,
  },
});
