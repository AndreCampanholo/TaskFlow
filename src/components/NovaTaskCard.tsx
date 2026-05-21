import { colors, globalStyles } from "@/src/styles/global";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoCancelar from "@/src/components/BotaoCancelar";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, due: string, state: "em-andamento" | "concluida" | "atrasada") => void;
};

export default function NovaTaskCard({ visible, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [state, setState] = useState<"em-andamento" | "concluida" | "atrasada">("em-andamento");

  useEffect(() => {
    if (!visible) {
      setTitle("");
      setDue("");
    }
  }, [visible]);

  function handleSave() {
    if (!title.trim()) return; // validation handled by caller if needed
    onCreate(title.trim(), due.trim(), state);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
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
              placeholder="Prazo (opcional)"
              value={due}
              onChangeText={setDue}
              style={styles.input}
            />

            <Text style={styles.stateLabel}>Status</Text>
            <View style={styles.stateRow}>
              <Pressable
                style={[
                  styles.statePill,
                  state === "em-andamento" && { backgroundColor: colors.azul_em_progresso },
                ]}
                onPress={() => setState("em-andamento")}
              >
                <Text
                  style={
                    state === "em-andamento" ? styles.stateTextActive : styles.stateText
                  }
                >
                  Em andamento
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.statePill,
                  state === "concluida" && { backgroundColor: colors.verde },
                ]}
                onPress={() => setState("concluida")}
              >
                <Text
                  style={
                    state === "concluida" ? styles.stateTextActive : styles.stateText
                  }
                >
                  Concluída
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.statePill,
                  state === "atrasada" && { backgroundColor: colors.vermelho_atrasado },
                ]}
                onPress={() => setState("atrasada")}
              >
                <Text
                  style={
                    state === "atrasada" ? styles.stateTextActive : styles.stateText
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
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  card: { backgroundColor: colors.branco, borderRadius: 14, padding: 16 },
  title: { ...globalStyles.headerText, fontSize: 18, marginBottom: 8 },
  input: { ...globalStyles.textInput, marginBottom: 8 },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  actionItem: { flex: 1, marginRight: 8 },
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
  stateLabel: { marginTop: 8, marginBottom: 6, color: "rgba(0,0,0,0.7)" },
  stateRow: { flexDirection: "row", gap: 8 },
  statePill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  statePillActive: { backgroundColor: colors.azul_escuro },
  stateText: { color: "rgba(0,0,0,0.8)" },
  stateTextActive: { color: colors.branco, fontWeight: "700" },
});
