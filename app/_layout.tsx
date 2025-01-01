import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
