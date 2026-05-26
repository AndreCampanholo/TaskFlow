import { RelativePathString, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, globalStyles } from "../styles/global";

// Cria um componente de um botão vermelho (usado múltiplas vezes no app)
// Parametros: 'texto': o que estará escrito no botão; 'acao': função que será executado ao ser clickado
export default function BotaoVermelho({
  texto,
  acao,
}: {
  texto: string;
  acao: RelativePathString | (() => void);
}) {
  // Lida com 'acao': pode ser um redirecionamento ou não
  const handlePress = () => {
    if (typeof acao === "string") {
      router.push(acao);
    } else {
      acao();
    }
  };
  // Visual do componente
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
      <Text style={globalStyles.primaryButtonText}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    ...globalStyles.primaryButton,
    backgroundColor: colors.vermelho_atrasado,
    width: "100%",
    marginTop: 24,
  },
});
