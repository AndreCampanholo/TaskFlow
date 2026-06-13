import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoVermelho from "@/src/components/BotaoVermelho";
import ExibicaoPrazoTarefa from "@/src/components/TaskPrazoDisplay";
import TaskStatusBar from "@/src/components/TaskStatusBar";
import useTarefas, { EstadoTarefa } from "@/src/hooks/useTarefas";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
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

  // Recebe todos os dados da tarefa via params (passados pelo Tasks.tsx)
  const {
    id,
    titulo,
    descricao,
    prazo,
    estado,
    concluida,
  } = useLocalSearchParams<{
    id?: string;
    titulo?: string;
    descricao?: string;
    prazo?: string;
    estado?: string;
    concluida?: string;
  }>();

  const { excluirTarefa } = useTarefas();

  const tarefaId = Array.isArray(id) ? id[0] : id;
  const tituloStr = Array.isArray(titulo) ? titulo[0] : titulo ?? "";
  const descricaoStr = Array.isArray(descricao) ? descricao[0] : descricao ?? "";
  const prazoStr = Array.isArray(prazo) ? prazo[0] : prazo;
  const estadoStr = (Array.isArray(estado) ? estado[0] : estado ?? "em-andamento") as EstadoTarefa;
  const concluidaBool = (Array.isArray(concluida) ? concluida[0] : concluida) === "true";
  const dueDate = prazoStr ? new Date(prazoStr) : new Date();

  // Render alternativo quando o id não existe nos params
  if (!tarefaId) {
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

  // Handler para excluir a tarefa atual com confirmação do usuário
  function handleExcluirTarefa() {
    // p/ web
    const confirmarExclusao =
      Platform.OS === "web"
        ? window.confirm("Deseja excluir esta tarefa?")
        : false;

    if (Platform.OS === "web") {
      if (confirmarExclusao) {
        excluirTarefa(tarefaId);
        router.back();
      }
      return;
    }

    // p/ mobile
    Alert.alert("Excluir tarefa", "Deseja excluir esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          excluirTarefa(tarefaId);
          router.back();
        },
      },
    ]);
  }

  // Redireciona para a tela de edição, passando os dados da tarefa
  function handleEditarTarefa() {
    router.push({
      pathname: "/(tabs)/tarefas/TarefaEditar",
      params: {
        id: tarefaId,
        titulo: tituloStr,
        descricao: descricaoStr,
        prazo: prazoStr ?? new Date().toISOString(),
        estado: estadoStr,
      },
    });
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
              color={colors.azul_claro}
            />
          </View>

          <View style={styles.headerCopy}>
            {/* Exibe o título da tarefa */}
            <Text style={styles.title} numberOfLines={2}>
              {tituloStr}
            </Text>
            {/* Exibe o status da tarefa */}
            <TaskStatusBar status={estadoStr} />
          </View>
        </View>

        {/* Exibe a descrição da tarefa */}
        <Text style={styles.description}>{descricaoStr}</Text>

        {/* Exibe o prazo da tarefa */}
        <ExibicaoPrazoTarefa dueDate={dueDate} />
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
