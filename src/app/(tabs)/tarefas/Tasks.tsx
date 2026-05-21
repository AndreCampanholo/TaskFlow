import BotaoNovaTask from "@/src/components/BotaoNovaTask";
import ListaVazia from "@/src/components/ListaVazia";
import NovaTaskCard from "@/src/components/NovaTaskCard";
import TaskCard from "@/src/components/TaskCard";
import FilterBar from "@/src/components/FilterBar";
import { colors, globalStyles } from "@/src/styles/global";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import useTasks from "@/src/hooks/useTasks";

export default function Tasks() {
  // Keep UI focused on rendering. Task logic is in `useTasks`.
  const { tasks, createTask, toggleTask, getFiltered } = useTasks();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "em-andamento" | "concluida" | "atrasada">("all");

  function handleCreate(title: string, due: string, stateFromModal: "em-andamento" | "concluida" | "atrasada") {
    if (!title.trim()) return Alert.alert("Erro", "Digite um título");
    createTask(title, due, stateFromModal);
    setOpen(false);
  }

  function handleToggle(id: string) {
    toggleTask(id);
  }

  const visibleTasks = filter === "all" ? tasks : getFiltered(filter);

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
                onToggle={handleToggle}
              />
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.fabWrap}>
        <BotaoNovaTask onPress={() => setOpen(true)} />
      </View>

      <NovaTaskCard visible={open} onClose={() => setOpen(false)} onCreate={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#EDEDF6" },
  header: { ...globalStyles.headerText, fontSize: 22, marginBottom: 12 },
  card: {
    flex: 1,
    backgroundColor: colors.branco,
    borderRadius: 20,
    padding: 12,
  },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  filterPillActive: { backgroundColor: colors.azul_escuro },
  filterText: { color: "rgba(0,0,0,0.7)" },
  filterTextActive: { color: colors.branco, fontWeight: "700" },
  list: { paddingBottom: 80 },
  fabWrap: { position: "absolute", right: 12, bottom: 80 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: { backgroundColor: colors.branco, borderRadius: 16, padding: 16 },
  modalTitle: { ...globalStyles.headerText, fontSize: 18, marginBottom: 8 },
  input: { ...globalStyles.textInput, marginBottom: 8 },
  modalActions: { flexDirection: "row", gap: 8, marginTop: 6 },
  btnPrimary: {
    flex: 1,
    backgroundColor: colors.azul_escuro,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnTextPrimary: { color: colors.branco, fontWeight: "700" },
  btnSecondary: {
    flex: 1,
    backgroundColor: "#EEF2FF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnTextSecondary: { color: colors.azul_escuro, fontWeight: "700" },
});
