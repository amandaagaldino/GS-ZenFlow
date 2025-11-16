import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="manager-login" />
      <Stack.Screen name="gestor" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

