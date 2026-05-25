import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import ProfileAvatar from "@/src/components/ProfileAvatar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
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

export default function EditarPerfil() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  function handleEditarPerfil() {
    if (!name.trim() && !dataNascimento && !cpf.trim() && !email.trim()) {
      if (Platform.OS === "web") {
        window.alert("Nenhuma alteração feita.");
      } else {
        Alert.alert("Aviso", "Nenhuma alteração feita.", [
          { text: "Ok", style: "cancel" },
        ]);
      }
      router.back();
      return;
    }

    if (email.trim()) {
      const emailInformado = email.trim();
      const emailRegex = /^\S+@\S+\.\S+$/;
      const isEmail = emailRegex.test(emailInformado);
      if (!isEmail) {
        if (Platform.OS === "web") {
          window.alert("Informe um E-mail válido.");
        } else {
          Alert.alert("Erro", "Informe um E-mail válido.", [
            { text: "Ok", style: "cancel" },
          ]);
        }
        return;
      }
    }
    if (cpf.trim()) {
      const cpfInformado = cpf.trim();
      const digits = cpfInformado.replace(/\D/g, "");
      const isCpf = /^\d{11}$/.test(digits);
      if (!isCpf) {
        if (Platform.OS === "web") {
          window.alert("Informe CPF válido com 11 dígitos.");
        } else {
          Alert.alert("Erro", "Informe CPF válido com 11 dígitos.", [
            { text: "Ok", style: "cancel" },
          ]);
        }
        return;
      }
    }

    router.back();
  }

  function handleDateChange(_event: any, selectedDate?: Date) {
    if (selectedDate) setDataNascimento(selectedDate);
    if (Platform.OS === "android") setShowDatePicker(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.avatarWrap}>
        <ProfileAvatar uri={avatarUri} onChange={setAvatarUri} size={110} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
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
            onPress={() => setShowDatePicker(true)}
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

        {showDatePicker && Platform.OS !== "web" ? (
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

        <BotaoAzulClaro text="Salvar Alterações" action={handleEditarPerfil} />
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
