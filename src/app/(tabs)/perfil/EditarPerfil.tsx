import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import AvatarPerfil from "@/src/components/ProfileAvatar";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function exibirAlerta(titulo: string, mensagem: string) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensagem}`);
    return;
  }

  Alert.alert(titulo, mensagem, [{ text: "Ok", style: "cancel" }]);
}

export default function EditarPerfil() {
  const [uriAvatar, setUriAvatar] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [seletorDataAberto, setSeletorDataAberto] = useState(false);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const temAlteracao = Boolean(
    nome.trim() || dataNascimento || cpf.trim() || email.trim(),
  );

  function handleEditarPerfil() {
    if (!temAlteracao) {
      exibirAlerta("Aviso", "Nenhuma alteração feita.");
      router.back();
      return;
    }

    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      exibirAlerta("Erro", "Informe um e-mail válido.");
      return;
    }

    if (cpf.trim() && !/^\d{11}$/.test(cpf.replace(/\D/g, ""))) {
      exibirAlerta("Erro", "Informe um CPF válido com 11 dígitos.");
      return;
    }

    router.back();
  }

  function handleDateChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }

    if (Platform.OS === "android") {
      setSeletorDataAberto(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.avatarWrap}>
        <AvatarPerfil uri={uriAvatar} aoAlterar={setUriAvatar} tamanho={110} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholderTextColor={"rgb(0, 0, 0, 0.6)"}
          placeholder="Nome completo"
        />

        <Text style={styles.label}>Data de Nascimento</Text>
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
              marginTop: 0,
              marginBottom: 12,
              background: "transparent",
              color: dataNascimento ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.3)",
              fontSize: 16,
              fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI'",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        ) : (
          <Pressable
            style={styles.dateButton}
            onPress={() => setSeletorDataAberto(true)}
          >
            <Text
              style={[
                styles.dateButtonText,
                !dataNascimento && styles.datePlaceholder,
              ]}
            >
              {dataNascimento
                ? dataNascimento.toLocaleDateString("pt-BR")
                : "dd/mm/aaaa"}
            </Text>
          </Pressable>
        )}

        {seletorDataAberto && Platform.OS !== "web" ? (
          <DateTimePicker
            value={dataNascimento ?? new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        ) : null}

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholderTextColor={"rgb(0, 0, 0, 0.6)"}
          placeholder="000.000.000-00"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"rgb(0, 0, 0, 0.6)"}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
        />

        <BotaoAzulClaro texto="Salvar Alterações" acao={handleEditarPerfil} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 48,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  avatarWrap: {
    marginTop: 4,
    marginBottom: 12,
    alignItems: "center",
    width: "100%",
  },
  form: { width: "100%", maxWidth: 380 },
  label: { color: "rgba(0,0,0,0.6)", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  dateButtonText: {
    color: "rgba(0,0,0,0.6)",
    fontWeight: "400",
  },
  datePlaceholder: {
    color: "rgba(0,0,0,0.6)",
  },
});
