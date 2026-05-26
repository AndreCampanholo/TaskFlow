import { RelativePathString, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

export default function BotaoAzulEscuro({
  texto,
  acao,
}: {
  texto: string;
  acao: RelativePathString | (() => void);
}) {
  const handlePress = () => {
    if (typeof acao === "string") {
      router.push(acao);
    } else {
      acao();
    }
  };

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
      <Text style={globalStyles.primaryButtonText}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    ...globalStyles.primaryButton,
    width: "100%",
    marginTop: 24,
  },
});
