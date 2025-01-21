import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./store/store";

const cognitoAuthConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_COGNITO_USER_POOL_AUTHORITY,
  silent_redirect_uri: import.meta.env
    .VITE_COGNITO_USER_POOL_SILENT_REDIRECT_URI,
  client_id: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_USER_POOL_REDIRECT_URI,
  response_type: import.meta.env.VITE_COGNITO_USER_POOL_RESPONSE_TYPE,
  scope: import.meta.env.VITE_COGNITO_USER_POOL_SCOPE,
};

console.log(cognitoAuthConfig);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
