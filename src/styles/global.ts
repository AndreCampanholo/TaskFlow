import { StyleSheet } from "react-native";

export const colors = {
  azul_escuro: "#1E3A8A",
  azul_claro: "#2563EB",
  azul_em_progresso: "#1F62EB",
  amarelo_em_andamento: "#EBB92A",
  verde: "#10B981",
  vermelho_atrasado: "#BA1A1A",
  preto: "#000000",
  branco: "#FFFFFF",
  background: "#C5C5D3",
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenContainer: {
    borderStyle: "solid" as const,
    borderColor: colors.preto,
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
  },
  authContainer: {
    width: 400,
    maxWidth: "100%" as any,
    padding: 30,
    borderStyle: "solid" as const,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: colors.azul_escuro,
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: "700" as any,
  },
  bodyText: {
    color: colors.preto,
    fontSize: 14,
  },
  textInput: {
    borderStyle: "solid" as const,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
    color: "rgba(0,0,0,1)",
  },
  primaryButton: {
    backgroundColor: colors.azul_escuro,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as any,
    textAlign: "center" as any,
  },
  linkText: {
    fontWeight: "500" as any,
    color: colors.azul_escuro,
    marginLeft: 4,
  },
  forgotPasswordText: {
    color: colors.azul_claro,
  },
  inlineRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
