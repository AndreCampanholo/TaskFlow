
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/global";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.center}>
        <View style={styles.brandRow}>
          <Text style={styles.title}>TaskFlow</Text>
          <View style={styles.dotAccent} />
        </View>
        <Text style={styles.tagline}>Gerencie suas tarefas</Text>
      </View>

      <View style={styles.dotsRow}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.azul_escuro,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    color: colors.branco,
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  dotAccent: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.verde,
    marginLeft: 4,
    marginTop: 6,
  },
  tagline: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 15,
    marginTop: 8,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    bottom: 48,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
  },
});