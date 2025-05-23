import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import ThemeProvider from "./context/ThemeContext.tsx";
import "./index.css";
import store from "./redux/store.ts";
import "./reset.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);
