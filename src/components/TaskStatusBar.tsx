import { colors } from "@/src/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { TaskState } from "@/src/hooks/useTasks";

type Props = {
  status: TaskState;
};

const STATUS_LABELS: Record<TaskState, string> = {
  "em-andamento": "Em andamento",
  concluida: "Concluída",
  atrasada: "Atrasada",
};

const STATUS_STYLES: Record<
  TaskState,
  { backgroundColor: string; textColor: string; dotColor: string }
> = {
  "em-andamento": {
    backgroundColor: "rgba(235,185,42,0.28)",
    textColor: "#1f2937",
    dotColor: colors.amarelo_em_andamento,
  },
  concluida: {
    backgroundColor: "rgba(16,185,129,0.16)",
    textColor: "#065f46",
    dotColor: colors.verde,
  },
  atrasada: {
    backgroundColor: "rgba(186,26,26,0.14)",
    textColor: "#991b1b",
    dotColor: colors.vermelho_atrasado,
  },
};

export default function TaskStatusBar({ status }: Props) {
  const style = STATUS_STYLES[status];

  return (
    <View
      style={[styles.container, { backgroundColor: style.backgroundColor }]}
    >
      <View style={[styles.dot, { backgroundColor: style.dotColor }]} />
      <Text style={[styles.label, { color: style.textColor }]}>
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
