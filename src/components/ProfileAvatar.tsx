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

type Props = {
  uri?: string | null;
  size?: number;
  onChange?: (uri: string | null) => void;
  editable?: boolean;
};

export default function ProfileAvatar({
  uri: initialUri,
  size = 88,
  onChange,
  editable = true,
}: Props) {
  const [uri, setUri] = useState<string | null>(initialUri ?? null);

  async function requestPermission() {
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

  async function pickImage() {
    const ok = await requestPermission();
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setUri(result.assets ? result.assets[0].uri : (result as any).uri);
      onChange?.(result.assets ? result.assets[0].uri : (result as any).uri);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o uso da câmera para tirar uma foto.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUri(result.assets ? result.assets[0].uri : (result as any).uri);
      onChange?.(result.assets ? result.assets[0].uri : (result as any).uri);
    }
  }

  function onPress() {
    Alert.alert(
      "Alterar foto",
      undefined,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Escolher da galeria", onPress: pickImage },
        { text: "Tirar foto", onPress: takePhoto },
      ],
      { cancelable: true },
    );
  }

  function onRemove() {
    Alert.alert("Remover foto", "Deseja remover sua foto de perfil?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setUri(null);
          onChange?.(null);
        },
      },
    ]);
  }

  if (!editable) {
    return (
      <View style={{ alignItems: "center" }}>
        {uri ? (
          <Image
            source={{ uri }}
            style={[
              styles.avatar,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          >
            <MaterialCommunityIcons
              name="account"
              size={Math.max(32, size / 3)}
              color={colors.azul_escuro}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      >
        {uri ? (
          <Image
            source={{ uri }}
            style={[
              styles.avatar,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          >
            <MaterialCommunityIcons
              name="account"
              size={Math.max(32, size / 3)}
              color={colors.azul_escuro}
            />
          </View>
        )}
      </Pressable>

      {uri ? (
        <Pressable
          onPress={onRemove}
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
