import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  return (
    <LinearGradient
      colors={[colors.azul_claro, colors.branco, colors.verde]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="check-circle"
          size={90}
          color="#1E3A8A"
        />

        <Text style={styles.title}>TaskFlow</Text>

        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={styles.loader}
        />

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
  },

  title: {
    marginTop: 18,
    fontSize: 42,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  loader: {
    marginTop: 40,
  },

  loading: {
    marginTop: 12,
    color: "rgba(0,0,0,0.45)",
    fontSize: 15,
  },
});