import { Stack } from 'expo-router';
import '~/global.css'; // Tailwind / NativeWind globals
import { QueryProvider } from '@/context/QueryProvider';
import { AuthProvider } from '@/context/AuthProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryProvider>
  );
}
