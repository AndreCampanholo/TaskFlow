import BotaoNovaTarefa from "@/src/components/BotaoNovaTask";
import BarraFiltro from "@/src/components/FilterBar";
import ListaVazia from "@/src/components/ListaVazia";
import CartaoNovaTarefa from "@/src/components/NovaTaskCard";
import CartaoTarefa from "@/src/components/TaskCard";
import useTarefas from "@/src/hooks/useTarefas";
import { colors, globalStyles } from "@/src/styles/global";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Tela/Componente de exibição das tarefas (tela principal/home do app)
export default function Tarefas() {
  // Obtém lista de tarefas e ações disponíveis no estado global do hook
  const { tarefas, criarTarefa, alternarTarefa, obterFiltradas } = useTarefas();

  // Controla abertura/fechamento do modal de criação e o filtro selecionado
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState<
    "all" | "em-andamento" | "concluida" | "atrasada"
  >("all");

  // Valida os campos e cria uma nova tarefa
  function handleCreate(
    title: string,
    description: string,
    dueDate: Date,
    stateFromModal: "em-andamento" | "concluida" | "atrasada",
  ) {
    // A tarefa deve ter um título
    if (!title.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite um título");
      } else {
        Alert.alert("Erro", "Digite um título");
      }
      return;
    }

    // A tarefa deve ter uma descrição
    if (!description.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite uma descrição");
      } else {
        Alert.alert("Erro", "Digite uma descrição");
      }
      return;
    }

    if (
      stateFromModal === "atrasada" &&
      dueDate.getTime() > new Date().getTime()
    ) {
      if (Platform.OS === "web") {
        window.alert(
          "A tarefa só pode ser marcada como atrasada após o prazo.",
        );
      } else {
        Alert.alert(
          "Erro",
          "A tarefa só pode ser marcada como atrasada após o prazo.",
        );
      }
      return;
    }

    if (
      stateFromModal === "atrasada" &&
      dueDate.getTime() > new Date().getTime()
    ) {
      if (Platform.OS === "web") {
        window.alert(
          "A tarefa só pode ser marcada como atrasada após o prazo.",
        );
      } else {
        Alert.alert(
          "Erro",
          "A tarefa só pode ser marcada como atrasada após o prazo.",
        );
      }
      return;
    }

    // Cria a tarefa
    criarTarefa({ title, description, dueDate, stateFromModal });
    setModalAberto(false); // Fecha o modal (tela de criação de tarefa)
  }

  // Navega para a tela de detalhes da tarefa selecionada
  function handleTaskPress(id: string) {
    router.push({
      pathname: "/(tabs)/tarefas/TarefaDetalhes",
      params: { id },
    });
  }

  // Navega para a tela de edição ao manter pressionado
  function handleTaskLongPress(id: string) {
    router.push({
      pathname: "/(tabs)/tarefas/TarefaEditar",
      params: { id },
    });
  }

  // Aplica o filtro selecionado para montar a lista visível na tela
  const tarefasVisiveis = obterFiltradas(filtro);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskFlow</Text>

      <BarraFiltro filtro={filtro} setFiltro={setFiltro} />

      <View style={styles.card}>
        {/* Se não existir nenhuma tarefa, exibe o estado vazio */}
        {tarefas.length === 0 ? (
          <ListaVazia
            title="Nenhuma tarefa por aqui"
            subtitle="Toque no + para criar sua primeira tarefa e começar a organizar seu dia."
          />
        ) : (
          /* Caso exista tarefa, renderiza a lista filtrada */
          <ScrollView contentContainerStyle={styles.list}>
            {tarefasVisiveis.map((tarefa) => (
              <CartaoTarefa
                key={tarefa.id}
                id={tarefa.id}
                titulo={tarefa.title}
                prazo={tarefa.dueLabel}
                estado={tarefa.state}
                concluida={tarefa.completed}
                alternarConclusao={alternarTarefa}
                aoPressionarTarefa={handleTaskPress}
                aoManterPressionado={handleTaskLongPress}
              />
            ))}
          </ScrollView>
        )}
      </View>

      {/* Botão flutuante para abrir o modal de criação */}
      <View style={styles.fabWrap}>
        <BotaoNovaTarefa onPress={() => setModalAberto(true)} />
      </View>

      {/* Modal responsável por coletar os dados de uma nova tarefa */}
      <CartaoNovaTarefa
        visivel={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoCriar={handleCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.fundo },
  header: { ...globalStyles.headerText, fontSize: 22, marginBottom: 12 },
  card: {
    flex: 1,
    ...globalStyles.cardSurface,
    borderRadius: 20,
    padding: 12,
  },
  list: { paddingBottom: 80 },
  fabWrap: { position: "absolute", right: 12, bottom: 80 },
});
