
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* ---------------- REACT QUERY OPTIMIZATION ---------------- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 min cache (no refetch)
      cacheTime: 1000 * 60 * 10,     // keep in memory 10 min
      refetchOnWindowFocus: false,   // no refetch on tab switch
      retry: 1,                      // retry once if fails
    },
  },
});

/* ---------------- ROOT RENDER ---------------- */
createRoot(document.getElementById("root")).render(
  // ⚠️ Remove StrictMode in performance testing (add back in dev if needed)
  // <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  // </React.StrictMode>
);

