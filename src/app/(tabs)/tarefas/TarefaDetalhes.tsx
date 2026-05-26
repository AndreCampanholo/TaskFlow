import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoVermelho from "@/src/components/BotaoVermelho";
import ExibicaoPrazoTarefa from "@/src/components/TaskPrazoDisplay";
import TaskStatusBar from "@/src/components/TaskStatusBar";
import useTarefas from "@/src/hooks/useTarefas";
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

// Tela/Componente de exibição dos detalhes das tarefas
export default function TarefaDetalhes() {
  // Delimita a área segura superior (notch/status bar) para posicionamento correto
  const insets = useSafeAreaInsets();

  // Obtém o parâmetro `id` passado pela rota (pode ser string ou array)
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { obterTarefaPorId, excluirTarefa } = useTarefas();

  // Normaliza o parâmetro de rota para uma string simples e busca a tarefa
  const tarefaId = Array.isArray(id) ? id[0] : id;
  const tarefa = tarefaId ? obterTarefaPorId(tarefaId) : null;

  // Se a rota tem id mas a tarefa não existe (ex: foi removida), volta automaticamente
  useEffect(() => {
    if (tarefaId && !tarefa) {
      router.back();
    }
  }, [tarefa, tarefaId]);

  // Handler para excluir a tarefa atual com confirmação do usuário
  function handleExcluirTarefa() {
    if (!tarefa) return;

    // Armazena true ou false (p/ web)
    const confirmarExclusao =
      Platform.OS === "web"
        ? window.confirm("Deseja excluir esta tarefa?")
        : false;

    if (Platform.OS === "web") {
      // Se confirmou, remove e volta para a lista
      if (confirmarExclusao) {
        excluirTarefa(tarefa.id);
        router.back();
      }
      return;
    }

    // Verifica se o usuário deseja realmente excluir a tarefa (p/ mobile)
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

  // Redireciona para a tela de edição, passando o id da tarefa
  function handleEditarTarefa() {
    if (!tarefa) return;
    router.push({
      pathname: "/(tabs)/tarefas/TarefaEditar",
      params: { id: tarefa.id },
    });
  }

  // Render alternativo quando a tarefa não existe
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
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={42}
              color={colors.amarelo_em_andamento}
            />
          </View>

          <View style={styles.headerCopy}>
            {/* Exibe o título da tarefa */}
            <Text style={styles.title} numberOfLines={2}>
              {tarefa.title}
            </Text>
            {/* Exibe o status da tarefa (em-andamento, concluido, atrasado) */}
            <TaskStatusBar status={tarefa.state} />
          </View>
        </View>

        {/* Exibe a descrição da tarefa */}
        <Text style={styles.description}>{tarefa.description}</Text>

        {/* Exibe o prazo da tarefa */}
        <ExibicaoPrazoTarefa dueDate={tarefa.dueDate} />
      </Pressable>

      <View style={styles.actions}>
        {/* Botão para acessar a tela de edição da tarefa */}
        <BotaoAzulEscuro texto="Editar tarefa" acao={handleEditarTarefa} />
        {/* Botão para excluir a tarefa */}
        <BotaoVermelho texto="Excluir tarefa" acao={handleExcluirTarefa} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
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
    borderColor: "rgba(235,185,42,0.35)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(235,185,42,0.08)",
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
