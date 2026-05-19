import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RecuperarSenha() {
  let [email, setEmail] = useState("");

  const handleRecuperarSenha = () => {
    console.log("Protocolo de recuperação de senha iniciado.");
  };

  return (
    <View>
      <Text>Recuperar senha</Text>

      <Text>
        Digite o e-mail associado à sua conta e enviaremos um link para você
        redefinir sua senha.
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        // style={StylePropertyMap.textinput}
      />

      <TouchableOpacity onPress={() => handleRecuperarSenha()}>
        <Text>Enviar link de recuperação</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar para login</Text>
      </TouchableOpacity>
    </View>
  );
}
