import { RelativePathString, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, globalStyles } from "@/src/styles/global";

export default function BotaoCancelar({
  text,
  action,
}: {
  text: string;
  action: RelativePathString | (() => void);
}) {
  const handlePress = () => {
    if (typeof action === "string") {
      router.push(action);
    } else {
      action();
    }
  };

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    ...globalStyles.primaryButton,
    backgroundColor: "#EEF2FF",
    width: "100%",
    marginTop: 24,
  },
  buttonText: {
    ...globalStyles.primaryButtonText,
    color: colors.azul_escuro,
    fontSize: 16,
    fontWeight: "600" as any,
  },
});
