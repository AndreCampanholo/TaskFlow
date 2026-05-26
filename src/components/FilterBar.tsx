import { colors, globalStyles } from "@/src/styles/global";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Define o tipo FiltoTarefa, que pode assumir um dos quatro valores abaixo
type FiltroTarefa = "all" | "em-andamento" | "concluida" | "atrasada";

// Define um tipo Props com filtro e uma função para setar o filtro
type Props = {
  filtro: FiltroTarefa;
  setFiltro: (filtro: FiltroTarefa) => void;
};

// Componente que permite seleção do filtro desejado
export default function BarraFiltro({ filtro, setFiltro }: Props) {
  return (
    <View style={styles.container}>
      {/* Filtro: nenhum (aparecem todas as tarefas) */}
      <Pressable
        onPress={() => setFiltro("all")}
        style={[globalStyles.pill, filtro === "all" && styles.todasAtivas]}
      >
        <Text
          style={
            filtro === "all"
              ? globalStyles.pillTextActive
              : globalStyles.pillText
          }
        >
          Todas
        </Text>
      </Pressable>
      {/* Filtro: Em-andamento */}
      <Pressable
        onPress={() => setFiltro("em-andamento")}
        style={[
          globalStyles.pill,
          filtro === "em-andamento" && styles.emAndamentoAtivas,
        ]}
      >
        <Text
          style={
            filtro === "em-andamento"
              ? globalStyles.pillTextActive
              : globalStyles.pillText
          }
        >
          Em andamento
        </Text>
      </Pressable>
      {/* Filtro: Concluídas */}
      <Pressable
        onPress={() => setFiltro("concluida")}
        style={[
          globalStyles.pill,
          filtro === "concluida" && styles.concluidasAtivas,
        ]}
      >
        <Text
          style={
            filtro === "concluida"
              ? globalStyles.pillTextActive
              : globalStyles.pillText
          }
        >
          Concluídas
        </Text>
      </Pressable>
      {/* Filtro: Atrasadas */}
      <Pressable
        onPress={() => setFiltro("atrasada")}
        style={[
          globalStyles.pill,
          filtro === "atrasada" && styles.atrasadasAtivas,
        ]}
      >
        <Text
          style={
            filtro === "atrasada"
              ? globalStyles.pillTextActive
              : globalStyles.pillText
          }
        >
          Atrasadas
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, marginBottom: 10 },
  todasAtivas: { backgroundColor: colors.azul_escuro },
  emAndamentoAtivas: { backgroundColor: colors.azul_em_progresso },
  concluidasAtivas: { backgroundColor: colors.verde },
  atrasadasAtivas: { backgroundColor: colors.vermelho_atrasado },
});
