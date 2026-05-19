import { RelativePathString, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, globalStyles } from "../styles/global";

export default function BotaoAzulClaro({
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
    backgroundColor: colors.azul_claro,
    width: "100%",
    marginTop: 24,
  },
  buttonText: {
    ...globalStyles.primaryButtonText,
    fontSize: 16,
    fontWeight: "600" as any,
  },
});
