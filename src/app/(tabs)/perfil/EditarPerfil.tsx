import BotaoAzulClaro from "@/src/components/BotaoAzulClaro";
import ProfileAvatar from "@/src/components/ProfileAvatar";
import { colors } from "@/src/styles/global";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EditarPerfil() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  function handleEditarPerfil() {
    if (!name.trim()) return Alert.alert("Erro", "Digite seu nome completo");

    router.back();
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
        <TextInput
          style={styles.input}
          value={dataNascimento}
          onChangeText={setDataNascimento}
          placeholderTextColor={"rgb(0, 0, 0, 0.6)"}
          placeholder="dd/mm/aaaa"
        />

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
});
