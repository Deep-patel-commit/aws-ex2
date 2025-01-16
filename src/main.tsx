import { createRoot } from "react-dom/client";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";

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
  <AuthProvider {...cognitoAuthConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
