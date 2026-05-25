import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoCancelar from "@/src/components/BotaoCancelar";
import { colors, globalStyles } from "@/src/styles/global";
import {
  atualizarHora,
  formatarDataParaInput,
  formatarHoraParaInput,
  mesclarDataHora,
  obterDataDoInput,
  obterHoraDoInput,
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
  visivel: boolean;
  aoFechar: () => void;
  aoCriar: (
    title: string,
    description: string,
    dueDate: Date,
    state: "em-andamento" | "concluida" | "atrasada",
  ) => void;
};

export default function CartaoNovaTarefa({ visivel, aoFechar, aoCriar }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataVencimento, setDataVencimento] = useState<Date>(new Date());
  const [estado, setEstado] = useState<"em-andamento" | "concluida" | "atrasada">(
    "em-andamento",
  );
  const [seletorDataAberto, setSeletorDataAberto] = useState(false);
  const [seletorHoraAberto, setSeletorHoraAberto] = useState(false);

  useEffect(() => {
    if (!visivel) {
      setTitulo("");
      setDescricao("");
      setDataVencimento(new Date());
      setEstado("em-andamento");
      setSeletorDataAberto(false);
      setSeletorHoraAberto(false);
    }
  }, [visivel]);

  function handleSalvar() {
    if (!titulo.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite um título");
      } else {
        Alert.alert("Erro", "Digite um título");
      }
      return;
    }

    if (!descricao.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite uma descrição");
      } else {
        Alert.alert("Erro", "Digite uma descrição");
      }
      return;
    }

    aoCriar(titulo.trim(), descricao.trim(), dataVencimento, estado);
  }

  function handleDateChange(_event: any, selectedDate?: Date) {
    if (selectedDate) {
      setDataVencimento((atual) => mesclarDataHora(atual, selectedDate));
    }

    if (Platform.OS === "android") setSeletorDataAberto(false);
  }

  function handleTimeChange(_event: any, selectedDate?: Date) {
    if (selectedDate) {
      setDataVencimento((atual) => atualizarHora(atual, selectedDate));
    }

    if (Platform.OS === "android") setSeletorHoraAberto(false);
  }

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={aoFechar}
    >
      <Pressable style={globalStyles.modalBackdrop} onPress={aoFechar}>
        <Pressable style={styles.card} onPress={() => null}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <Text style={styles.title}>Nova tarefa</Text>
            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={styles.input}
            />

            <TextInput
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              style={[styles.input, styles.descriptionInput]}
              multiline
            />

            <Text style={styles.stateLabel}>Prazo</Text>
            {Platform.OS === "web" ? (
              <View style={styles.webDateRow}>
                <input
                  type="date"
                  value={formatarDataParaInput(dataVencimento)}
                  onChange={(event: any) => {
                    setDataVencimento((atual) =>
                      mesclarDataHora(
                        atual,
                        obterDataDoInput(event.target.value, atual),
                      ),
                    );
                  }}
                  style={styles.webInput as any}
                />
                <input
                  type="time"
                  value={formatarHoraParaInput(dataVencimento)}
                  onChange={(event: any) => {
                    setDataVencimento((atual) =>
                      atualizarHora(
                        atual,
                        obterHoraDoInput(event.target.value, atual),
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
                  onPress={() => setSeletorDataAberto(true)}
                >
                  <Text style={styles.dateText}>
                    {dataVencimento.toLocaleDateString("pt-BR")}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => setSeletorHoraAberto(true)}
                >
                  <Text style={styles.dateText}>
                    {dataVencimento.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Pressable>
              </View>
            )}

            {seletorDataAberto && Platform.OS !== "web" ? (
              <DateTimePicker
                value={dataVencimento}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            ) : null}

            {seletorHoraAberto && Platform.OS !== "web" ? (
              <DateTimePicker
                value={dataVencimento}
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
                  estado === "em-andamento" && {
                    backgroundColor: colors.azul_em_progresso,
                  },
                ]}
                onPress={() => setEstado("em-andamento")}
              >
                <Text
                  style={
                    estado === "em-andamento"
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
                  estado === "concluida" && { backgroundColor: colors.verde },
                ]}
                onPress={() => setEstado("concluida")}
              >
                <Text
                  style={
                    estado === "concluida"
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
                  estado === "atrasada" && {
                    backgroundColor: colors.vermelho_atrasado,
                  },
                ]}
                onPress={() => setEstado("atrasada")}
              >
                <Text
                  style={
                    estado === "atrasada"
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
                <BotaoCancelar texto="Cancelar" acao={aoFechar} />
              </View>
              <View style={styles.actionItem}>
                <BotaoAzulEscuro texto="Salvar" acao={handleSalvar} />
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
