import { colors } from "@/src/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { EstadoTarefa } from "@/src/hooks/useTasks";

type Props = {
  status: EstadoTarefa;
};

const ROTULOS_STATUS: Record<EstadoTarefa, string> = {
  "em-andamento": "Em andamento",
  concluida: "Concluída",
  atrasada: "Atrasada",
};

const ESTILOS_STATUS: Record<
  EstadoTarefa,
  { backgroundColor: string; textColor: string; dotColor: string }
> = {
  "em-andamento": {
    backgroundColor: "rgba(235,185,42,0.28)",
    textColor: "#1f2937",
    dotColor: colors.azul_claro,
  },
  concluida: {
    backgroundColor: "rgba(16,185,129,0.16)",
    textColor: "#065f46",
    dotColor: colors.verde,
  },
  atrasada: {
    backgroundColor: "rgba(186,26,26,0.14)",
    textColor: "#991b1b",
    dotColor: colors.vermelho,
  },
};

export default function BarraStatusTarefa({ status }: Props) {
  const estilo = ESTILOS_STATUS[status];

  return (
    <View
      style={[styles.container, { backgroundColor: estilo.backgroundColor }]}
    >
      <View style={[styles.dot, { backgroundColor: estilo.dotColor }]} />
      <Text style={[styles.label, { color: estilo.textColor }]}>
        {ROTULOS_STATUS[status]}
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
