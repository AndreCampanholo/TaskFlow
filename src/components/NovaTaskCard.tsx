import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoCancelar from "@/src/components/BotaoCancelar";
import { colors, globalStyles } from "@/src/styles/global";
import {
  fromDateInputValue,
  fromTimeInputValue,
  mergeTaskDateTime,
  toDateInputValue,
  toTimeInputValue,
  updateTaskTime,
} from "@/src/utils/taskDates";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (
    title: string,
    description: string,
    dueDate: Date,
    state: "em-andamento" | "concluida" | "atrasada",
  ) => void;
};

export default function NovaTaskCard({ visible, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [state, setState] = useState<"em-andamento" | "concluida" | "atrasada">(
    "em-andamento",
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTitle("");
      setDescription("");
      setDueDate(new Date());
      setState("em-andamento");
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  }, [visible]);

  function handleSave() {
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

    onCreate(title.trim(), description.trim(), dueDate, state);
  }

  function handleDateChange(_event: any, selectedDate?: Date) {
    if (selectedDate) {
      setDueDate((current) => mergeTaskDateTime(current, selectedDate));
    }

    if (Platform.OS === "android") setShowDatePicker(false);
  }

  function handleTimeChange(_event: any, selectedDate?: Date) {
    if (selectedDate) {
      setDueDate((current) => updateTaskTime(current, selectedDate));
    }

    if (Platform.OS === "android") setShowTimePicker(false);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={globalStyles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => null}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <Text style={styles.title}>Nova tarefa</Text>
            <TextInput
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            <TextInput
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, styles.descriptionInput]}
              multiline
            />

            <Text style={styles.stateLabel}>Prazo</Text>
            {Platform.OS === "web" ? (
              <View style={styles.webDateRow}>
                <input
                  type="date"
                  value={toDateInputValue(dueDate)}
                  onChange={(event: any) => {
                    setDueDate((current) =>
                      mergeTaskDateTime(
                        current,
                        fromDateInputValue(event.target.value, current),
                      ),
                    );
                  }}
                  style={styles.webInput as any}
                />
                <input
                  type="time"
                  value={toTimeInputValue(dueDate)}
                  onChange={(event: any) => {
                    setDueDate((current) =>
                      updateTaskTime(
                        current,
                        fromTimeInputValue(event.target.value, current),
                      ),
                    );
                  }}
                  style={styles.webInput as any}
                />
              </View>
            ) : (
              <View style={styles.dateRow}>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateText}>
                    {dueDate.toLocaleDateString("pt-BR")}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.dateText}>
                    {dueDate.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Pressable>
              </View>
            )}

            {showDatePicker && Platform.OS !== "web" ? (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            ) : null}

            {showTimePicker && Platform.OS !== "web" ? (
              <DateTimePicker
                value={dueDate}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            ) : null}

            <Text style={styles.stateLabel}>Status</Text>
            <View style={styles.stateRow}>
              <Pressable
                style={[
                  globalStyles.pill,
                  state === "em-andamento" && {
                    backgroundColor: colors.azul_em_progresso,
                  },
                ]}
                onPress={() => setState("em-andamento")}
              >
                <Text
                  style={
                    state === "em-andamento"
                      ? globalStyles.pillTextActive
                      : globalStyles.pillText
                  }
                >
                  Em andamento
                </Text>
              </Pressable>
              <Pressable
                style={[
                  globalStyles.pill,
                  state === "concluida" && { backgroundColor: colors.verde },
                ]}
                onPress={() => setState("concluida")}
              >
                <Text
                  style={
                    state === "concluida"
                      ? globalStyles.pillTextActive
                      : globalStyles.pillText
                  }
                >
                  Concluída
                </Text>
              </Pressable>
              <Pressable
                style={[
                  globalStyles.pill,
                  state === "atrasada" && {
                    backgroundColor: colors.vermelho_atrasado,
                  },
                ]}
                onPress={() => setState("atrasada")}
              >
                <Text
                  style={
                    state === "atrasada"
                      ? globalStyles.pillTextActive
                      : globalStyles.pillText
                  }
                >
                  Atrasada
                </Text>
              </Pressable>
            </View>

            <View style={styles.actions}>
              <View style={styles.actionItem}>
                <BotaoCancelar text="Cancelar" action={onClose} />
              </View>
              <View style={styles.actionItem}>
                <BotaoAzulEscuro text="Salvar" action={handleSave} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: { ...globalStyles.cardSurface },
  title: { ...globalStyles.sectionTitle, marginBottom: 8 },
  input: { ...globalStyles.textInput, ...globalStyles.field },
  descriptionInput: {
    minHeight: 84,
    textAlignVertical: "top",
  },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  actionItem: { flex: 1 },
  stateLabel: { marginTop: 8, marginBottom: 6, color: "rgba(0,0,0,0.7)" },
  stateRow: { flexDirection: "row", gap: 8 },
  dateRow: { flexDirection: "row", gap: 8 },
  dateButton: {
    ...globalStyles.textInput,
    ...globalStyles.field,
    flex: 1,
    marginVertical: 0,
    justifyContent: "center",
  },
  dateText: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
  },
  webDateRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  webInput: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "transparent",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI'",
    width: "100%",
    boxSizing: "border-box",
  },
});
