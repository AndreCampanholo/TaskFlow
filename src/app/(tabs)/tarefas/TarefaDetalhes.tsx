import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoVermelho from "@/src/components/BotaoVermelho";
import ExibicaoPrazoTarefa from "@/src/components/TaskPrazoDisplay";
import TaskStatusBar from "@/src/components/TaskStatusBar";
import useTarefas from "@/src/hooks/useTasks";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TarefaDetalhes() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { obterTarefaPorId, excluirTarefa } = useTarefas();

  const tarefaId = Array.isArray(id) ? id[0] : id;
  const tarefa = tarefaId ? obterTarefaPorId(tarefaId) : null;

  useEffect(() => {
    if (tarefaId && !tarefa) {
      router.back();
    }
  }, [tarefa, tarefaId]);

  function handleExcluirTarefa() {
    if (!tarefa) return;

    const confirmarExclusao =
      Platform.OS === "web"
        ? window.confirm("Deseja excluir esta tarefa?")
        : false;

    if (Platform.OS === "web") {
      if (confirmarExclusao) {
        excluirTarefa(tarefa.id);
        router.back();
      }
      return;
    }

    Alert.alert("Excluir tarefa", "Deseja excluir esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          excluirTarefa(tarefa.id);
          router.back();
        },
      },
    ]);
  }

  function handleEditarTarefa() {
    if (!tarefa) return;
    router.push({
      pathname: "/(tabs)/tarefas/TarefaEditar",
      params: { id: tarefa.id },
    });
  }

  if (!tarefa) {
    return (
      <View
        style={[
          styles.screen,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
      >
        <View style={styles.emptyCard}>
          <MaterialCommunityIcons
            name="clipboard-alert-outline"
            size={56}
            color={colors.azul_escuro}
          />
          <Text style={styles.emptyTitle}>Tarefa não encontrada</Text>
          <Text style={styles.emptyText}>
            Volte para a lista e tente abrir a tarefa novamente.
          </Text>
          <BotaoAzulEscuro texto="Voltar" acao={() => router.back()} />
        </View>
      </View>
    );
  }

  return (
    <Pressable
      style={[
        styles.screen,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
      ]}
      onPress={() => router.back()}
    >
      <Pressable style={styles.card} onPress={() => null}>
        <View style={styles.headerRow}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={42} color={colors.azul_em_progresso} />
          </View>

          <View style={styles.headerCopy}>
            <Text style={styles.title} numberOfLines={2}>
              {tarefa.title}
            </Text>
            <TaskStatusBar status={tarefa.state} />
          </View>
        </View>

        <Text style={styles.description}>{tarefa.description}</Text>

        <ExibicaoPrazoTarefa dueDate={tarefa.dueDate} />
      </Pressable>

      <View style={styles.actions}>
        <BotaoAzulEscuro texto="Editar tarefa" acao={handleEditarTarefa} />
        <BotaoVermelho texto="Excluir tarefa" acao={handleExcluirTarefa} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.fundo,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 18,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.fundo,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.fundo,
  },
  headerCopy: {
    flex: 1,
    gap: 10,
  },
  title: {
    color: "rgba(0,0,0,0.9)",
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    color: "rgba(0,0,0,0.72)",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
  },
  actions: {
    width: "100%",
    maxWidth: 360,
    marginTop: 18,
  },
  emptyCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  emptyTitle: {
    ...globalStyles.sectionTitle,
  },
  emptyText: {
    ...globalStyles.sectionSubtitle,
  },
});
