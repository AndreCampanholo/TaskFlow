import AvatarPerfil from "@/src/components/ProfileAvatar";
import { colors, globalStyles } from "@/src/styles/global";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const handleSair = () => {
    if (Platform.OS === "web") {
      const shouldLogout = window.confirm("Quer sair de sua conta?");

      if (shouldLogout) {
        router.replace("/Login");
      }

      return;
    }

    Alert.alert("Sair", "Quer sair de sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => router.replace("/Login"),
      },
    ]);
  };

  return (
    <View style={globalStyles.fullScreen}>
      <View style={styles.content}>

        <View style={[globalStyles.cardSurface, styles.card]}>
          <AvatarPerfil editavel={false} />

          <View style={styles.info}>
            <Text style={globalStyles.sectionTitle}>Usuário Exemplo</Text>
            <Text style={globalStyles.sectionSubtitle}>
              usuario@exemplo.com
            </Text>
          </View>

          <View style={styles.listCard}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push("/(tabs)/perfil/EditarPerfil")}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color={colors.azul_escuro}
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.rowText}>Editar perfil</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push("/(tabs)/perfil/AlterarSenha")}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="lock"
                  size={20}
                  color={colors.azul_escuro}
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.rowText}>Alterar senha</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.listCard}>
            <TouchableOpacity style={styles.row} onPress={handleSair}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color={colors.vermelho_atrasado}
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={[styles.rowText, { color: colors.vermelho_atrasado }]}
                >
                  Sair
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.vermelho_atrasado}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push("/(tabs)/perfil/ExcluirConta")}
            >
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color={colors.vermelho_atrasado}
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={[styles.rowText, { color: colors.vermelho_atrasado }]}
                >
                  Excluir conta
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.vermelho_atrasado}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...globalStyles.centeredContent,
    paddingHorizontal: 16,
    backgroundColor: colors.fundo
  },
  card: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 8,
  },
  info: {
    alignItems: "center",
    marginBottom: 12,
  },
  actions: {
    width: "100%",
    marginTop: 8,
  },
  actionItem: { flex: 1 },
  listCard: {
    width: "100%",
    marginTop: 12,
    backgroundColor: colors.branco,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowText: { fontSize: 16, color: "rgba(0,0,0,0.9)" },
});
