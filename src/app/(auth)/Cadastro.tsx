import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import { colors, globalStyles } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
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
  const cardWidth = Math.max(180, Math.min(380, width - 32));

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [mostrarSeletor, setMostrarSeletor] = useState(false);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const handleCadastro = () => {
    console.log({ nome, dataNascimento, cpf, email, senha });
    router.replace("/tarefas/Tasks" as any);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const current = selectedDate ?? dataNascimento;
    if (selectedDate) setDataNascimento(selectedDate);
    // on Android the picker stays open; close it after selection/dismiss
    if (Platform.OS === "android") setMostrarSeletor(false);
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
        <View style={[styles.container, { width: cardWidth }]}>
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
                onPress={() => setMostrarSeletor(true)}
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
              {mostrarSeletor && (
                <DateTimePicker
                  value={dataNascimento ?? new Date()}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={onChange}
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
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            placeholder="Confirmar senha"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            secureTextEntry
            style={styles.textinput}
          />

          <BotaoAzulEscuro text="Criar conta →" action={handleCadastro} />

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
    ...globalStyles.screen,
    width: "100%",
    paddingHorizontal: 12,
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  container: {
    ...globalStyles.screenContainer,
    alignItems: "center",
    minWidth: 0,
    maxWidth: 380,
  },
  title: {
    ...globalStyles.headerText,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    ...globalStyles.bodyText,
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(0,0,0,0.7)",
  },
  textinput: {
    ...globalStyles.textInput,
    width: "100%",
    marginVertical: 10,
  },
  datePickerButton: {
    borderStyle: "solid" as const,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
    width: "100%",
  },
  dateText: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
  },
  datePlaceholder: {
    color: "rgba(0,0,0,0.3)",
  },
  buttonStyle: {
    ...globalStyles.primaryButton,
    width: "100%",
    marginTop: 24,
  },
  buttonText: {
    ...globalStyles.primaryButtonText,
    fontSize: 16,
    fontWeight: "600" as any,
  },
  loginLine: {
    flexDirection: "row" as any,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
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
