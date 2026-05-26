import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoCancelar from "@/src/components/BotaoCancelar";
import BotaoVermelho from "@/src/components/BotaoVermelho";
import useTasks, { TaskState } from "@/src/hooks/useTasks";
import { colors, globalStyles } from "@/src/styles/global";
import {
  fromDateInputValue,
  fromTimeInputValue,
  mergeTaskDateTime,
  toDateInputValue,
  toTimeInputValue,
  updateTaskTime,
} from "@/src/utils/taskDates";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const STATUS_OPTIONS: { value: TaskState; label: string; color: string }[] = [
  { value: "em-andamento", label: "Em andamento", color: colors.azul_em_progresso },
  { value: "concluida",    label: "Concluída",    color: colors.verde },
  { value: "atrasada",     label: "Atrasada",     color: colors.vermelho_atrasado },
];

const webInputStyle = {
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "14px",
  color: "rgba(0,0,0,0.85)",
  width: "100%",
  boxSizing: "border-box" as const,
  background: "transparent",
  fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI'",
  outline: "none",
};

export default function TarefaEditar() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getTaskById, updateTask, deleteTask } = useTasks();

  const taskId = Array.isArray(id) ? id[0] : id;
  const task = taskId ? getTaskById(taskId) : null;

  const [title, setTitle]             = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate]         = useState<Date>(task?.dueDate ? new Date(task.dueDate) : new Date());
  const [status, setStatus]           = useState<TaskState>(task?.state ?? "em-andamento");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  if (!task) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.emptyCard}>
          <Text style={globalStyles.sectionTitle}>Tarefa não encontrada</Text>
          <BotaoAzulEscuro text="Voltar" action={() => router.back()} />
        </View>
      </View>
    );
  }

  function handleSave() {
    if (!title.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite um título");
      } else {
        Alert.alert("Erro", "Digite um título");
      }
      return;
    }
    if (status === "atrasada" && dueDate.getTime() > new Date().getTime()) {
          if (Platform.OS === "web") {
            window.alert("A tarefa só pode ser marcada como atrasada após o prazo.");
          } else {
            Alert.alert("Erro", "A tarefa só pode ser marcada como atrasada após o prazo.");
          }
          return;
        }
    updateTask(taskId!, { title: title.trim(), description: description.trim(), dueDate, state: status, completed: status === "concluida" });
    router.navigate("/(tabs)/tarefas/Tasks");
  }

  function handleDelete() {
    if (Platform.OS === "web") {
      if (window.confirm("Deseja excluir esta tarefa?")) {
        deleteTask(taskId!);
        router.navigate("/(tabs)/tarefas/Tasks");
      }
      return;
    }
    Alert.alert("Excluir tarefa", "Deseja excluir esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deleteTask(taskId!);
          router.navigate("/(tabs)/tarefas/Tasks");
        },
      },
    ]);
  }

  function handleDateChange(_event: any, selectedDate?: Date) {
    if (selectedDate) setDueDate((cur) => mergeTaskDateTime(cur, selectedDate));
    if (Platform.OS === "android") setShowDatePicker(false);
  }

  function handleTimeChange(_event: any, selectedDate?: Date) {
    if (selectedDate) setDueDate((cur) => updateTaskTime(cur, selectedDate));
    if (Platform.OS === "android") setShowTimePicker(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name="pencil-outline" size={26} color={colors.azul_claro} />
            </View>
            <Text style={styles.headerTitle}>Editar tarefa</Text>
          </View>

          {/* Nome */}
          <Text style={styles.fieldLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Nome escolhido"
            placeholderTextColor="rgba(0,0,0,0.35)"
          />

          {/* Descrição */}
          <Text style={styles.fieldLabel}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descrição adicionada aqui com mais detalhes da tarefa."
            placeholderTextColor="rgba(0,0,0,0.35)"
            multiline
            textAlignVertical="top"
          />

          {/* Prazo */}
          <Text style={styles.fieldLabel}>Prazo</Text>

          {Platform.OS === "web" ? (
            <View style={styles.dateRow}>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Data</Text>
                <input
                  type="date"
                  value={toDateInputValue(dueDate)}
                  onChange={(e: any) =>
                    setDueDate((cur) => mergeTaskDateTime(cur, fromDateInputValue(e.target.value, cur)))
                  }
                  style={webInputStyle}
                />
              </View>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Hora</Text>
                <input
                  type="time"
                  value={toTimeInputValue(dueDate)}
                  onChange={(e: any) =>
                    setDueDate((cur) => updateTaskTime(cur, fromTimeInputValue(e.target.value, cur)))
                  }
                  style={webInputStyle}
                />
              </View>
            </View>
          ) : (
            <View style={styles.dateRow}>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Data</Text>
                <Pressable style={styles.nativeDateInput} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateText}>{dueDate.toLocaleDateString("pt-BR")}</Text>
                  <MaterialCommunityIcons name="calendar-outline" size={18} color="rgba(0,0,0,0.4)" />
                </Pressable>
              </View>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Hora</Text>
                <Pressable style={styles.nativeDateInput} onPress={() => setShowTimePicker(true)}>
                  <Text style={styles.dateText}>
                    {dueDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                  <MaterialCommunityIcons name="clock-outline" size={18} color="rgba(0,0,0,0.4)" />
                </Pressable>
              </View>
            </View>
          )}

          {showDatePicker && Platform.OS !== "web" && (
            <DateTimePicker value={dueDate} mode="date" display="default" onChange={handleDateChange} />
          )}
          {showTimePicker && Platform.OS !== "web" && (
            <DateTimePicker value={dueDate} mode="time" display="default" onChange={handleTimeChange} />
          )}

          {/* Status */}
          <Text style={styles.fieldLabel}>Status</Text>
          <View style={styles.statusRow}>
            {STATUS_OPTIONS.map((opt) => {
              const selected = status === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  style={[
                    styles.statusPill,
                    selected
                      ? { backgroundColor: opt.color, borderColor: opt.color }
                      : { borderColor: opt.color },
                  ]}
                  onPress={() => setStatus(opt.value)}
                >
                  <View style={[styles.statusDot, { backgroundColor: selected ? colors.branco : opt.color }]} />
                  <Text style={[styles.statusPillText, selected && { color: colors.branco }]}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Ações */}
          <View style={styles.actions}>
            <View style={[styles.actionItem, { flex: 1.3}]}>
              <BotaoCancelar text="Cancelar" action={() => router.back()} />
            </View>
            <View style={styles.actionItem}>
              <BotaoVermelho text="Excluir tarefa" action={handleDelete} />
            </View>
            <View style={[styles.actionItem, { flex: 1.5 }]}>
              <BotaoAzulEscuro text="Salvar alterações" action={handleSave} />
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(37,99,235,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(0,0,0,0.85)",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(0,0,0,0.72)",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "rgba(0,0,0,0.9)",
    marginBottom: 14,
  },
  descriptionInput: {
    minHeight: 90,
  },
  dateRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  dateFieldWrap: {
    flex: 1,
  },
  dateSubLabel: {
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
    marginBottom: 4,
  },
  nativeDateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.85)",
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    backgroundColor: "transparent",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusPillText: {
    fontSize: 13,
    color: "rgba(0,0,0,0.65)",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  actionItem: {
    flex: 1,
  },
});
