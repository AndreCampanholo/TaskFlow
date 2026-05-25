import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
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

  const handleCadastro = () => {
    if (
      !nome.trim() ||
      !cpf.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !confirmacaoSenha.trim() ||
      !dataNascimento
    ) {
      if (Platform.OS === "web") {
        window.alert("Todos os campos devem ser preenchidos.");
      } else {
        Alert.alert(
          "Cadastro inválido",
          "Todos os campos devem ser preenchidos.",
          [{ text: "Ok", style: "cancel" }],
        );
      }
      return;
    }

    if (dataNascimento.getTime() > new Date().setHours(23, 59, 59, 999)) {
      if (Platform.OS === "web") {
        window.alert("Data de nascimento inválida.");
      } else {
        Alert.alert("Cadastro inválido", "Data de nascimento inválida.", [
          { text: "Ok", style: "cancel" },
        ]);
      }
      return;
    }

    if (senha.trim() !== confirmacaoSenha.trim()) {
      if (Platform.OS === "web") {
        window.alert("A senha confirmada difere da informada.");
      } else {
        Alert.alert(
          "Cadastro inválido",
          "A senha confirmada difere da senha informada.",
          [{ text: "Ok", style: "cancel" }],
        );
      }
      return;
    }

    const emailInformado = email.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    const emailValido = emailRegex.test(emailInformado);
    const cpfInformado = cpf.trim();
    const cpfNumeros = cpfInformado.replace(/\D/g, "");
    const cpfValido = /^\d{11}$/.test(cpfNumeros);
    if (!emailValido && !cpfValido) {
      if (Platform.OS === "web") {
        window.alert("Informe um E-mail válido e um CPF com 11 dígitos.");
      } else {
        Alert.alert(
          "Erro",
          "Informe um E-mail válido e um CPF com 11 dígitos.",
          [{ text: "Ok", style: "cancel" }],
        );
      }
      return;
    }
    if (!emailValido) {
      if (Platform.OS === "web") {
        window.alert("Informe um E-mail válido.");
      } else {
        Alert.alert("Erro", "Informe um E-mail válido.", [
          { text: "Ok", style: "cancel" },
        ]);
      }
      return;
    }
    if (!cpfValido) {
      if (Platform.OS === "web") {
        window.alert("Informe CPF válido com 11 dígitos.");
      } else {
        Alert.alert("Erro", "Informe CPF válido com 11 dígitos.", [
          { text: "Ok", style: "cancel" },
        ]);
      }
      return;
    }

    router.replace("/tarefas/Tasks" as any);
  };

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
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            style={styles.textinput}
          />

          {Platform.OS === "web" ? (
            <input
              type="date"
              value={
                dataNascimento ? dataNascimento.toISOString().slice(0, 10) : ""
              }
              onChange={(e: any) =>
                setDataNascimento(
                  e.target.value ? new Date(e.target.value) : null,
                )
              }
              max={new Date().toISOString().slice(0, 10)}
              placeholder="dd/mm/aaaa"
              style={{
                borderWidth: 1,
                borderColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: 5,
                padding: 8,
                marginTop: 10,
                marginBottom: 10,
                background: "transparent",
                color: dataNascimento ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.3)",
                fontSize: 16,
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI'",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setSeletorDataAberto(true)}
              >
                <Text
                  style={[
                    styles.dateText,
                    !dataNascimento && styles.datePlaceholder,
                  ]}
                >
                  {dataNascimento
                    ? dataNascimento.toLocaleDateString()
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
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            style={styles.textinput}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            style={styles.textinput}
          />

          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            secureTextEntry
            style={styles.textinput}
          />

          <TextInput
            value={confirmacaoSenha}
            onChangeText={setConfirmacaoSenha}
            placeholder="Confirmar senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
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
    ...globalStyles.fullScreen,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  content: {
    ...globalStyles.centeredContent,
  },
  container: {
    ...globalStyles.screenContainer,
  },
  title: {
    ...globalStyles.sectionTitle,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.sectionSubtitle,
    marginBottom: 20,
  },
  textinput: {
    ...globalStyles.textInput,
    ...globalStyles.field,
  },
  datePickerButton: {
    ...globalStyles.textInput,
    ...globalStyles.field,
  },
  dateText: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
  },
  datePlaceholder: {
    color: "rgba(0,0,0,0.3)",
  },
  loginLine: {
    ...globalStyles.linkRow,
  },
  loginLineText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
  },
  entrarText: {
    ...globalStyles.linkText,
    marginLeft: 4,
  },
});
