import { globalStyles } from "@/src/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function ListaVazia({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.illustration} />
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
  },
  title: {
    ...globalStyles.sectionTitle,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.sectionSubtitle,
    color: "rgba(0,0,0,0.62)",
  },
});
