import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import ProfileAvatar from "@/src/components/ProfileAvatar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, globalStyles } from "@/src/styles/global";
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
          Alert.alert("Erro", "Informe um E-mail válido.");
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
          Alert.alert("Erro", "Informe CPF válido com 11 dígitos.");
        }
        return;
      }
    }

    router.back();
  }

  function handleDateChange(_event: any, selectedDate?: Date) {
    if (selectedDate) setDataNascimento(selectedDate);

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <View style={styles.avatarWrap}>
          <ProfileAvatar
            uri={avatarUri}
            onChange={setAvatarUri}
            size={110}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome completo"
            placeholderTextColor={"rgba(0,0,0,0.45)"}
          />

          <Text style={styles.label}>Data de nascimento</Text>

          {Platform.OS === "web" ? (
            <input
              type="date"
              value={
                dataNascimento
                  ? dataNascimento.toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e: any) =>
                setDataNascimento(
                  e.target.value ? new Date(e.target.value) : null
                )
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

          {showDatePicker && Platform.OS !== "web" && (
            <DateTimePicker
              value={dataNascimento ?? new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
            placeholderTextColor={"rgba(0,0,0,0.45)"}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="email@exemplo.com"
            placeholderTextColor={"rgba(0,0,0,0.45)"}
            keyboardType="email-address"
          />

          <BotaoAzulClaro
            text="Salvar alterações"
            action={handleEditarPerfil}
          />
        </View>
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