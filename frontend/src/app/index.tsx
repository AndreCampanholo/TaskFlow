import { Redirect } from "expo-router";

// Redireciona imediatamente para o login
export default function Index() {
  return <Redirect href="/(auth)/Login" />;
}