import type { EstadoTarefa } from "@/src/hooks/useTarefas";
import { colors } from "@/src/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  id: string;
  titulo: string;
  prazo: string;
  estado: EstadoTarefa;
  concluida: boolean;
  alternarConclusao: (id: string) => void;
  aoPressionarTarefa?: (id: string) => void;
  aoManterPressionado?: (id: string) => void;
};

// Componente de exibição de uma tarefa na lista
export default function CartaoTarefa({
  id,
  titulo,
  prazo,
  estado,
  concluida,
  alternarConclusao,
  aoPressionarTarefa,
  aoManterPressionado,
}: Props) {
  // Define a cor lateral de acordo com o status da tarefa
  const accent =
    estado === "concluida"
      ? colors.verde
      : estado === "atrasada"
        ? colors.vermelho
        : colors.azul_claro;

  return (
    <View
      style={[styles.card, { borderLeftColor: accent }]}
    >
      {/* Checkbox — toque isolado, não propaga para o card */}
      <TouchableOpacity
        onPress={() => alternarConclusao(id)}
        style={styles.checkWrapper}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View
          style={[styles.checkCircle, concluida && styles.checkCircleChecked]}
        >
          {concluida ? (
            <Ionicons name="checkmark" size={12} color={colors.verde} />
          ) : null}
        </View>
      </TouchableOpacity>

      {/* Área do texto — toque abre detalhes, pressão longa abre edição */}
      <Pressable
        style={({ pressed }) => [styles.body, pressed && styles.bodyPressed]}
        onPress={() => aoPressionarTarefa?.(id)}
        onLongPress={() => aoManterPressionado?.(id)}
        delayLongPress={400}
        accessibilityRole="button"
      >
        <Text
          style={[styles.title, concluida && styles.titleDone]}
          numberOfLines={2}
        >
          {titulo}
        </Text>
        <Text style={styles.due}>{prazo}</Text>
      </Pressable>
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
    paddingTop: 2,
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
  bodyPressed: {
    opacity: 0.7,
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
