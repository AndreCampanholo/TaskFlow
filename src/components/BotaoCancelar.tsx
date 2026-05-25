import { globalStyles } from "@/src/styles/global";
import { RelativePathString, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BotaoCancelar({
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
      <Text
        style={[globalStyles.primaryButtonText, globalStyles.neutralButtonText]}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    ...globalStyles.primaryButton,
    ...globalStyles.neutralButton,
    width: "100%",
    marginTop: 24,
  },
});
