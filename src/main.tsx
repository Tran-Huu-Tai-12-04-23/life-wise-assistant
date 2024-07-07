import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./reset.css";
import ThemeProvider from "./context/ThemeContext.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <Toaster position="top-right" theme="dark" richColors />
          <App />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
