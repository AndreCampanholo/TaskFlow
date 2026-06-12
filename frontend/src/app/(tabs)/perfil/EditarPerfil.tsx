import BotaoAzulEscuro from "@/src/components/BotaoAzulEscuro";
import AvatarPerfil from "@/src/components/ProfileAvatar";
import { apiEditarPerfil } from "@/src/services/api";
import { colors } from "@/src/styles/global";
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

// Função auxiliar para exibir um alerta
function exibirAlerta(titulo: string, mensagem: string) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensagem}`);
    return;
  }

  Alert.alert(titulo, mensagem, [{ text: "Ok", style: "cancel" }]);
}

// Tela/Componente de Edição de perfil
export default function EditarPerfil() {
  // Campos variáveis declarados com useState
  const [uriAvatar, setUriAvatar] = useState<string | null>(null); // foto de perfil como string (uri)
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [seletorDataAberto, setSeletorDataAberto] = useState(false); // determina se o seletor de data deve ser visível ou não
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  // Booleano que armazena se alguma alteração foi feita
  const temAlteracao = Boolean(
    nome.trim() || dataNascimento || cpf.trim() || email.trim(),
  );

  async function handleEditarPerfil() {
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

    try {
      await apiEditarPerfil({
        ...(nome.trim() && { nome: nome.trim() }),
        ...(cpf.trim() && { cpf: cpf.trim() }),
        ...(email.trim() && { email: email.trim() }),
        ...(dataNascimento && { dataNascimento: dataNascimento }),
      });
      router.back();
    } catch (error: any) {
      exibirAlerta(
        "Erro",
        error.message || "Não foi possível salvar as alterações.",
      );
    }
  }

  // Altera a data de nascimento
  function handleDateChange(_event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }

    if (Platform.OS === "android") {
      setSeletorDataAberto(false); // fecha o seletor em dispositivos android
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <View style={styles.avatarWrap}>
          <AvatarPerfil
            uri={uriAvatar}
            aoAlterar={setUriAvatar}
            tamanho={110}
          />
        </View>

        {/* Input para o novo nome do usuário */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholderTextColor={"rgb(0, 0, 0, 0.6)"}
          placeholder="Nome completo"
        />

        {/* Seletor da data de nascimento */}
        <Text style={styles.label}>Data de Nascimento</Text>
        {Platform.OS === "web" ? ( // p/ web
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
          // p/ mobile
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

        {/* Input para o novo CPF */}
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholder="000.000.000-00"
          placeholderTextColor={"rgba(0,0,0,0.45)"}
        />

        {/* Input para o novo E-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@exemplo.com"
          placeholderTextColor={"rgba(0,0,0,0.45)"}
          keyboardType="email-address"
        />

        <BotaoAzulEscuro texto="Salvar Alterações" acao={handleEditarPerfil} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.fundo,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  avatarWrap: {
    alignItems: "center",
    marginBottom: 20,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    color: "rgba(0,0,0,0.65)",
    marginBottom: 6,
    fontWeight: "500",
  },

  input: {
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

  dateButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  dateButtonText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.85)",
  },

  datePlaceholder: {
    color: "rgba(0,0,0,0.45)",
  },
});
