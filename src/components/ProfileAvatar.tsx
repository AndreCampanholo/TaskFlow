import { colors } from "@/src/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Define um Props para o avatar do usuário
type Props = {
  uri?: string | null;
  tamanho?: number;
  aoAlterar?: (uri: string | null) => void;
  editavel?: boolean;
};

// Componente de visualização do avatar do usuário
export default function AvatarPerfil({
  uri: uriInicial,
  tamanho = 88,
  aoAlterar,
  editavel = true,
}: Props) {
  const [uriImagem, setUriImagem] = useState<string | null>(uriInicial ?? null);

  // Solicita permissão para acessar a galeria quando necessário
  async function solicitarPermissao() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Permita acesso às fotos para alterar sua foto de perfil.",
        );
        return false;
      }
    }
    return true;
  }

  // Abre a galeria e atualiza o avatar com a imagem escolhida
  async function escolherImagem() {
    const permitido = await solicitarPermissao();
    if (!permitido) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!resultado.canceled) {
      const uriSelecionada = resultado.assets
        ? resultado.assets[0].uri
        : (resultado as any).uri;
      setUriImagem(uriSelecionada);
      aoAlterar?.(uriSelecionada);
    }
  }

  // Abre a câmera para tirar uma nova foto de perfil
  async function tirarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o uso da câmera para tirar uma foto.",
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      const uriSelecionada = resultado.assets
        ? resultado.assets[0].uri
        : (resultado as any).uri;
      setUriImagem(uriSelecionada);
      aoAlterar?.(uriSelecionada);
    }
  }

  // Mostra as opções para alterar a foto do perfil
  function handlePress() {
    Alert.alert(
      "Alterar foto",
      undefined,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Escolher da galeria", onPress: escolherImagem },
        { text: "Tirar foto", onPress: tirarFoto },
      ],
      { cancelable: true },
    );
  }

  // Remove a imagem atual e avisa o componente pai
  function handleRemoverFoto() {
    Alert.alert("Remover foto", "Deseja remover sua foto de perfil?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setUriImagem(null);
          aoAlterar?.(null);
        },
      },
    ]);
  }

  // Quando o avatar é apenas exibido, não permite interação
  if (!editavel) {
    return (
      <View style={{ alignItems: "center" }}>
        {uriImagem ? (
          <Image
            source={{ uri: uriImagem }}
            style={[
              styles.avatar,
              { width: tamanho, height: tamanho, borderRadius: tamanho / 2 },
            ]}
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              { width: tamanho, height: tamanho, borderRadius: tamanho / 2 },
            ]}
          >
            <MaterialCommunityIcons
              name="account"
              size={Math.max(32, tamanho / 3)}
              color={colors.azul_escuro}
            />
          </View>
        )}
      </View>
    );
  }

  // Quando é editável, o avatar vira um botão para alterar a imagem
  return (
    <View style={{ alignItems: "center" }}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      >
        {uriImagem ? (
          <Image
            source={{ uri: uriImagem }}
            style={[
              styles.avatar,
              { width: tamanho, height: tamanho, borderRadius: tamanho / 2 },
            ]}
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              { width: tamanho, height: tamanho, borderRadius: tamanho / 2 },
            ]}
          >
            <MaterialCommunityIcons
              name="account"
              size={Math.max(32, tamanho / 3)}
              color={colors.azul_escuro}
            />
          </View>
        )}
      </Pressable>

      {uriImagem ? (
        <Pressable
          onPress={handleRemoverFoto}
          style={({ pressed }) => [
            { marginTop: 8, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={{ color: colors.vermelho_atrasado }}>Remover foto</Text>
        </Pressable>
      ) : (
        <Text style={{ marginTop: 8, color: "rgba(0,0,0,0.6)" }}>
          Toque para alterar
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#EEE",
  },
  placeholder: {
    backgroundColor: "rgba(37,99,235,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
});
