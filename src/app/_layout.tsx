import { Stack } from 'expo-router';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux';
import '~/global.css'; // Tailwind / NativeWind globals
import { QueryProvider } from '@/hooks/query/QueryProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <ReduxProvider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </ReduxProvider>
    </QueryProvider>
  );
}
