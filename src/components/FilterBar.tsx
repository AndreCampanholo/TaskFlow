import { colors, globalStyles } from "@/src/styles/global";
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
        style={[globalStyles.pill, filter === "all" && styles.TodasActive]}
      >
        <Text style={filter === "all" ? globalStyles.pillTextActive : globalStyles.pillText}>
          Todas
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("em-andamento")}
        style={[globalStyles.pill, filter === "em-andamento" && styles.EmAndamentoActive]}
      >
        <Text
          style={filter === "em-andamento" ? globalStyles.pillTextActive : globalStyles.pillText}
        >
          Em andamento
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("concluida")}
        style={[globalStyles.pill, filter === "concluida" && styles.ConcluidasActive]}
      >
        <Text style={filter === "concluida" ? globalStyles.pillTextActive : globalStyles.pillText}>
          Concluídas
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("atrasada")}
        style={[globalStyles.pill, filter === "atrasada" && styles.AtrasadasActive]}
      >
        <Text style={filter === "atrasada" ? globalStyles.pillTextActive : globalStyles.pillText}>
          Atrasadas
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, marginBottom: 10 },
  TodasActive: { backgroundColor: colors.azul_escuro },
  EmAndamentoActive: { backgroundColor: colors.azul_em_progresso },
  ConcluidasActive: { backgroundColor: colors.verde },
  AtrasadasActive: { backgroundColor: colors.vermelho_atrasado },
});
