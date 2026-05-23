import BotaoNovaTask from "@/src/components/BotaoNovaTask";
import FilterBar from "@/src/components/FilterBar";
import ListaVazia from "@/src/components/ListaVazia";
import NovaTaskCard from "@/src/components/NovaTaskCard";
import TaskCard from "@/src/components/TaskCard";
import useTasks from "@/src/hooks/useTasks";
import { globalStyles } from "@/src/styles/global";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Tasks() {
  // Keep UI focused on rendering. Task logic is in `useTasks`.
  const { tasks, createTask, toggleTask, getFiltered } = useTasks();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "em-andamento" | "concluida" | "atrasada"
  >("all");

  function handleCreate(
    title: string,
    description: string,
    dueDate: Date,
    stateFromModal: "em-andamento" | "concluida" | "atrasada",
  ) {
    if (!title.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite um título");
      } else {
        Alert.alert("Erro", "Digite um título");
      }
      return;
    }

    if (!description.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite uma descrição");
      } else {
        Alert.alert("Erro", "Digite uma descrição");
      }
      return;
    }

    createTask({ title, description, dueDate, stateFromModal });
    setOpen(false);
  }

  function openTaskDetails(id: string) {
    router.push({
      pathname: "/(tabs)/tarefas/TarefaDetalhes",
      params: { id },
    });
  }

  function handleTaskLongPress(id: string) {
    openTaskDetails(id);
  }

  const visibleTasks = getFiltered(filter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskFlow</Text>

      <FilterBar filter={filter} setFilter={setFilter} />

      <View style={styles.card}>
        {tasks.length === 0 ? (
          <ListaVazia
            title="Nenhuma tarefa por aqui"
            subtitle="Toque no + para criar sua primeira tarefa e começar a organizar seu dia."
          />
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {visibleTasks.map((t) => (
              <TaskCard
                key={t.id}
                id={t.id}
                title={t.title}
                dueLabel={t.dueLabel}
                state={t.state}
                completed={t.completed}
                onToggle={toggleTask}
                onPressTask={openTaskDetails}
                onLongPressTask={handleTaskLongPress}
              />
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.fabWrap}>
        <BotaoNovaTask onPress={() => setOpen(true)} />
      </View>

      <NovaTaskCard
        visible={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#EDEDF6" },
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
