import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  id: string;
  title: string;
  dueLabel: string;
  state: "em-andamento" | "concluida" | "atrasada";
  completed: boolean;
  onToggle: (id: string) => void;
};

export default function TaskCard({
  id,
  title,
  dueLabel,
  state,
  completed,
  onToggle,
}: Props) {
  const accent =
    state === "concluida"
      ? colors.verde
      : state === "atrasada"
        ? colors.vermelho_atrasado
        : colors.azul_claro;

  return (
    <View style={[styles.card, { borderLeftColor: accent }]}>
      <TouchableOpacity
        onPress={() => onToggle(id)}
        style={styles.checkWrapper}
      >
        <View
          style={[styles.checkCircle, completed && styles.checkCircleChecked]}
        >
          {completed ? (
            <Ionicons name="checkmark" size={12} color={colors.verde} />
          ) : null}
        </View>
      </TouchableOpacity>

      <View style={styles.body}>
        <Text
          style={[styles.title, completed && styles.titleDone]}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text style={styles.due}>{dueLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.branco,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
  },
  checkWrapper: {
    paddingRight: 8,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.branco,
  },
  checkCircleChecked: {
    borderColor: colors.verde,
    backgroundColor: "rgba(16,185,129,0.08)",
  },
  body: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    color: "#111827",
    fontSize: 15,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "rgba(0,0,0,0.45)",
  },
  due: {
    marginTop: 6,
    color: "rgba(0,0,0,0.6)",
    fontSize: 12,
  },
});
