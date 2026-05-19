import { router } from "expo-router";
import { Button } from "react-native";

export default function CadastroButton() {
  return (
    <Button title="Cadastrar-se" onPress={() => router.push("/Cadastro")} />
  );
}
