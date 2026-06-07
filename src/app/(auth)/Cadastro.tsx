import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import { apiCadastrar } from "@/src/services/api";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Cadastro() {
  const { width } = useWindowDimensions();
  const larguraCard = Math.max(180, Math.min(380, width - 32));

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [seletorDataAberto, setSeletorDataAberto] = useState(false);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  async function handleCadastro() {
    if (
      !nome.trim() ||
      !cpf.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !confirmacaoSenha.trim() ||
      !dataNascimento
    ) {
      Alert.alert("Cadastro inválido", "Todos os campos devem ser preenchidos.");
      return;
    }

    if (dataNascimento.getTime() > new Date().setHours(23, 59, 59, 999)) {
      Alert.alert("Cadastro inválido", "Data de nascimento inválida.");
      return;
    }

    if (senha.trim() !== confirmacaoSenha.trim()) {
      Alert.alert("Cadastro inválido", "As senhas não coincidem.");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Erro", "Informe um e-mail válido.");
      return;
    }

    const cpfNumeros = cpf.trim().replace(/\D/g, "");
    if (!/^\d{11}$/.test(cpfNumeros)) {
      Alert.alert("Erro", "Informe um CPF válido com 11 dígitos.");
      return;
    }

    try {
      await apiCadastrar(nome.trim(), email.trim(), senha.trim());
      Alert.alert("Sucesso", "Conta criada! Faça login para continuar.", [
        { text: "Ok", onPress: () => router.replace("/Login") },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível criar a conta.");
    }
  }

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) setDataNascimento(selectedDate);
    if (Platform.OS === "android") setSeletorDataAberto(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.azul_escuro}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.container, { width: larguraCard }]}>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Preencha os campos com seus dados</Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
            placeholderTextColor="rgba(0,0,0,0.35)"
            style={styles.textinput}
          />

          {Platform.OS === "web" ? (
            <input
              type="date"
              value={dataNascimento ? dataNascimento.toISOString().slice(0, 10) : ""}
              onChange={(e: any) =>
                setDataNascimento(e.target.value ? new Date(e.target.value) : null)
              }
              max={new Date().toISOString().slice(0, 10)}
              style={{
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: "8px",
                padding: "10px 12px",
                marginBottom: "14px",
                background: "#fff",
                color: "rgba(0,0,0,0.85)",
                fontSize: "15px",
                width: "100%",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setSeletorDataAberto(true)}
              >
                <Text style={[styles.dateText, !dataNascimento && styles.datePlaceholder]}>
                  {dataNascimento
                    ? dataNascimento.toLocaleDateString("pt-BR")
                    : "dd/mm/aaaa"}
                </Text>
              </TouchableOpacity>
              {seletorDataAberto && (
                <DateTimePicker
                  value={dataNascimento ?? new Date()}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={handleDateChange}
                />
              )}
            </>
          )}

          <TextInput
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            placeholder="CPF"
            placeholderTextColor="rgba(0,0,0,0.35)"
            style={styles.textinput}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="rgba(0,0,0,0.35)"
            style={styles.textinput}
          />

          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
            placeholderTextColor="rgba(0,0,0,0.35)"
            secureTextEntry
            style={styles.textinput}
          />

          <TextInput
            value={confirmacaoSenha}
            onChangeText={setConfirmacaoSenha}
            placeholder="Confirmar senha"
            placeholderTextColor="rgba(0,0,0,0.35)"
            secureTextEntry
            style={styles.textinput}
          />

          <BotaoAzulEscuro texto="Criar conta →" acao={handleCadastro} />

          <View style={styles.loginLine}>
            <Text style={styles.loginLineText}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push("/Login")}>
              <Text style={styles.entrarText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  headerContainer: {
    width: "100%",
    height: 64,
    backgroundColor: colors.branco,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.branco,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  title: {
    ...globalStyles.sectionTitle,
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.sectionSubtitle,
    marginBottom: 22,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "rgba(0,0,0,0.9)",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  dateText: {
    color: "rgba(0,0,0,0.9)",
    fontSize: 15,
  },
  datePlaceholder: {
    color: "rgba(0,0,0,0.45)",
  },
  loginLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    gap: 4,
  },
  loginLineText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
  },
  entrarText: {
    ...globalStyles.linkText,
    marginLeft: 2,
  },
});