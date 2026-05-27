import { globalStyles } from "@/src/styles/global";
import { Image, StyleSheet, Text, View } from "react-native";

// Componente de lista vazia, isto é, da tela de tarefas sem nenhuma tarefa
export default function ListaVazia({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <Image
          source={require("@/assets/images/task-icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  illustration: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(37,99,235,0.08)",
    marginBottom: 16,

    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 54,
    height: 54,
  },

  title: {
    ...globalStyles.sectionTitle,
    marginBottom: 8,
  },

  subtitle: {
    ...globalStyles.sectionSubtitle,
    color: "rgba(0,0,0,0.62)",
    textAlign: "center",
  },
});