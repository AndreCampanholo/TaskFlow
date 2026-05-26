import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import BotaoCancelar from "@/src/components/BotaoCancelar";
import BotaoVermelho from "@/src/components/BotaoVermelho";
import useTarefas, { EstadoTarefa } from "@/src/hooks/useTarefas";
import { colors, globalStyles } from "@/src/styles/global";
import {
  atualizarHora,
  formatarDataParaInput,
  formatarHoraParaInput,
  mesclarDataHora,
  obterDataDoInput,
  obterHoraDoInput,
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

// Opções disponíveis para o status da tarefa exibidas na interface
const OPCOES_STATUS: { value: EstadoTarefa; label: string; color: string }[] = [
<<<<<<< HEAD
  { value: "em-andamento", label: "Em andamento", color: colors.azul_claro },
  { value: "concluida",    label: "Concluída",    color: colors.verde },
  { value: "atrasada",     label: "Atrasada",     color: colors.vermelho },
=======
  {
    value: "em-andamento",
    label: "Em andamento",
    color: colors.azul_em_progresso,
  },
  { value: "concluida", label: "Concluída", color: colors.verde },
  { value: "atrasada", label: "Atrasada", color: colors.vermelho_atrasado },
>>>>>>> ca41cdb0a72aa11cc7342dd1952a3742c54f2dbf
];

// Estilo aplicado aos campos nativos de data/hora no ambiente web
const estiloInputWeb = {
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

// Tela/Componente de edição de tarefas
export default function TarefaEditar() {
  // Delimita a área segura superior (notch/status bar) para posicionamento correto
  const insets = useSafeAreaInsets();

  // Obtém o parâmetro `id` passado pela rota (pode ser string ou array)
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { obterTarefaPorId, atualizarTarefa, excluirTarefa } = useTarefas();

  // Normaliza o parâmetro de rota para uma string simples e busca a tarefa
  const tarefaId = Array.isArray(id) ? id[0] : id;
  const tarefa = tarefaId ? obterTarefaPorId(tarefaId) : null;

  // Variáveis modificáveis declaradas com useState
  const [titulo, setTitulo] = useState(tarefa?.title ?? "");
  const [descricao, setDescricao] = useState(tarefa?.description ?? "");
  const [dataVencimento, setDataVencimento] = useState<Date>(
    tarefa?.dueDate ? new Date(tarefa.dueDate) : new Date(),
  );
  const [estado, setEstado] = useState<EstadoTarefa>(
    tarefa?.state ?? "em-andamento",
  );
  const [seletorDataAberto, setSeletorDataAberto] = useState(false); // Determina se o seletor de data é visível ou não
  const [seletorHoraAberto, setSeletorHoraAberto] = useState(false); // Determina se o seletor de hora é visível ou não

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
          <Text style={globalStyles.sectionTitle}>Tarefa não encontrada</Text>
          <BotaoAzulEscuro texto="Voltar" acao={() => router.back()} />
        </View>
      </View>
    );
  }

  // Valida as novas informações da tarefa, salvando as alterações
  function handleSalvar() {
    // Exige que o usuário digite um título
    if (!titulo.trim()) {
      if (Platform.OS === "web") {
        window.alert("Digite um título");
      } else {
        Alert.alert("Erro", "Digite um título");
      }
      return;
    }
    if (
      estado === "atrasada" &&
      dataVencimento.getTime() > new Date().getTime()
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
    // Atualiza a tarefa com as novas informações
    atualizarTarefa(tarefaId!, {
      title: titulo.trim(),
      description: descricao.trim(),
      dueDate: dataVencimento,
      state: estado,
      completed: estado === "concluida",
    });
    router.navigate("/(tabs)/tarefas/Tasks"); // Redireciona para a página principal de tarefas
  }

  // Handler para excluir a tarefa atual com confirmação do usuário
  function handleExcluir() {
    // p/ web
    if (Platform.OS === "web") {
      if (window.confirm("Deseja excluir esta tarefa?")) {
        excluirTarefa(tarefaId!); // Exclui a tarefa
        router.navigate("/(tabs)/tarefas/Tasks"); // Redireciona para a tela das tarefas
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
          excluirTarefa(tarefaId!); // Exclui a tarefa
          router.navigate("/(tabs)/tarefas/Tasks"); // Redireciona para a tela das tarefas
        },
      },
    ]);
  }

  // Altera a data de vencimento da tarefa (data + hora)
  function handleDateChange(_event: any, selectedDate?: Date) {
    if (selectedDate)
      setDataVencimento((atual) => mesclarDataHora(atual, selectedDate));
    if (Platform.OS === "android") setSeletorDataAberto(false);
  }

  // Atualiza a hora de vencimento da tarefa
  function handleTimeChange(_event: any, selectedDate?: Date) {
    if (selectedDate)
      setDataVencimento((atual) => atualizarHora(atual, selectedDate));
    if (Platform.OS === "android") setSeletorHoraAberto(false);
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
          <View style={styles.header}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={26}
                color={colors.azul_claro}
              />
            </View>
            <Text style={styles.headerTitle}>Editar tarefa</Text>
          </View>

          {/* Input para o nome da tarefa */}
          <Text style={styles.fieldLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Nome escolhido"
            placeholderTextColor="rgba(0,0,0,0.35)"
          />

          {/* Input para a descrição da tarefa */}
          <Text style={styles.fieldLabel}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição adicionada aqui com mais detalhes da tarefa."
            placeholderTextColor="rgba(0,0,0,0.35)"
            multiline
            textAlignVertical="top"
          />

          {/* Input para o prazo */}
          <Text style={styles.fieldLabel}>Prazo</Text>

          {/* p/ web */}
          {Platform.OS === "web" ? (
            <View style={styles.dateRow}>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Data</Text>
                <input
                  type="date"
                  value={formatarDataParaInput(dataVencimento)}
                  onChange={(e: any) =>
                    setDataVencimento((atual) =>
                      mesclarDataHora(
                        atual,
                        obterDataDoInput(e.target.value, atual),
                      ),
                    )
                  }
                  style={estiloInputWeb}
                />
              </View>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Hora</Text>
                <input
                  type="time"
                  value={formatarHoraParaInput(dataVencimento)}
                  onChange={(e: any) =>
                    setDataVencimento((atual) =>
                      atualizarHora(
                        atual,
                        obterHoraDoInput(e.target.value, atual),
                      ),
                    )
                  }
                  style={estiloInputWeb}
                />
              </View>
            </View>
          ) : (
            // p/ mobile
            <View style={styles.dateRow}>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Data</Text>
                <Pressable
                  style={styles.nativeDateInput}
                  onPress={() => setSeletorDataAberto(true)}
                >
                  <Text style={styles.dateText}>
                    {dataVencimento.toLocaleDateString("pt-BR")}
                  </Text>
                  <MaterialCommunityIcons
                    name="calendar-outline"
                    size={18}
                    color="rgba(0,0,0,0.4)"
                  />
                </Pressable>
              </View>
              <View style={styles.dateFieldWrap}>
                <Text style={styles.dateSubLabel}>Hora</Text>
                <Pressable
                  style={styles.nativeDateInput}
                  onPress={() => setSeletorHoraAberto(true)}
                >
                  <Text style={styles.dateText}>
                    {dataVencimento.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={18}
                    color="rgba(0,0,0,0.4)"
                  />
                </Pressable>
              </View>
            </View>
          )}

          {seletorDataAberto && Platform.OS !== "web" && (
            <DateTimePicker
              value={dataVencimento}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {seletorHoraAberto && Platform.OS !== "web" && (
            <DateTimePicker
              value={dataVencimento}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}

          {/* Modificador do status da tarefa */}
          <Text style={styles.fieldLabel}>Status</Text>
          <View style={styles.statusRow}>
            {OPCOES_STATUS.map((opcao) => {
              const selected = estado === opcao.value;
              return (
                <Pressable
                  key={opcao.value}
                  style={[
                    styles.statusPill,
                    selected
                      ? {
                          backgroundColor: opcao.color,
                          borderColor: opcao.color,
                        }
                      : { borderColor: opcao.color },
                  ]}
                  onPress={() => setEstado(opcao.value)}
                >
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor: selected ? colors.branco : opcao.color,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusPillText,
                      selected && { color: colors.branco },
                    ]}
                  >
                    {opcao.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.actions}>
            <View style={[styles.actionItem, { flex: 1.3 }]}>
              {/* Botão para cancelar as alterações */}
              <BotaoCancelar texto="Cancelar" acao={() => router.back()} />
            </View>
            <View style={styles.actionItem}>
              {/* Botão para excluir a tarefa */}
              <BotaoVermelho texto="Excluir tarefa" acao={handleExcluir} />
            </View>
            <View style={[styles.actionItem, { flex: 1.5 }]}>
              {/* Botão para salvar as alterações */}
              <BotaoAzulEscuro texto="Salvar alterações" acao={handleSalvar} />
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
