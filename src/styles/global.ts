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
  fullScreen: {
    flex: 1,
    width: "100%",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  screenContainer: {
    width: "100%",
    maxWidth: 380,
    minWidth: 0,
    padding: 30,
    borderStyle: "solid",
    borderColor: colors.preto,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  headerText: {
    color: colors.azul_escuro,
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: "700",
  },
  bodyText: {
    color: colors.preto,
    fontSize: 14,
  },
  textInput: {
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
    color: "rgba(0,0,0,1)",
  },
  field: {
    width: "100%",
    marginVertical: 10,
  },
  sectionTitle: {
    color: colors.azul_escuro,
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  sectionSubtitle: {
    color: "rgba(0,0,0,0.7)",
    fontSize: 14,
    textAlign: "center",
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
    fontWeight: "500",
    color: colors.azul_escuro,
    marginLeft: 4,
  },
  forgotPasswordText: {
    color: colors.azul_claro,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 4,
  },
  cardSurface: {
    backgroundColor: colors.branco,
    borderRadius: 14,
    padding: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  pillText: {
    color: "rgba(0,0,0,0.7)",
  },
  pillTextActive: {
    color: colors.branco,
    fontWeight: "700",
  },
  neutralButton: {
    backgroundColor: "#EEF2FF",
  },
  neutralButtonText: {
    color: colors.azul_escuro,
  },
});
