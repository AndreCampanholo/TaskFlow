import { router } from "expo-router";
import { Button } from "react-native";

export default function LoginButton() {
  return <Button title="Entrar" onPress={() => router.push("/Login")} />;
}
