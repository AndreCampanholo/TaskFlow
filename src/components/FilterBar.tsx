import { colors } from "@/src/styles/global";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  filter: "all" | "em-andamento" | "concluida" | "atrasada";
  setFilter: (f: Props["filter"]) => void;
};

export default function FilterBar({ filter, setFilter }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setFilter("all")}
        style={[styles.pill, filter === "all" && styles.TodasActive]}
      >
        <Text style={filter === "all" ? styles.textActive : styles.text}>
          Todas
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("em-andamento")}
        style={[
          styles.pill,
          filter === "em-andamento" && styles.EmAndamentoActive,
        ]}
      >
        <Text
          style={filter === "em-andamento" ? styles.textActive : styles.text}
        >
          Em andamento
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("concluida")}
        style={[styles.pill, filter === "concluida" && styles.ConcluidasActive]}
      >
        <Text style={filter === "concluida" ? styles.textActive : styles.text}>
          Concluídas
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("atrasada")}
        style={[styles.pill, filter === "atrasada" && styles.AtrasadasActive]}
      >
        <Text style={filter === "atrasada" ? styles.textActive : styles.text}>
          Atrasadas
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, marginBottom: 10 },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  TodasActive: { backgroundColor: colors.azul_escuro },
  EmAndamentoActive: { backgroundColor: colors.azul_em_progresso },
  ConcluidasActive: { backgroundColor: colors.verde },
  AtrasadasActive: { backgroundColor: colors.vermelho_atrasado },
  text: { color: "rgba(0,0,0,0.7)" },
  textActive: { color: colors.branco, fontWeight: "700" },
});
