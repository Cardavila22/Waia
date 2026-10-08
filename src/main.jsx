import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./styles/animations.css";
import "./index.css";
import theme from "./theme/theme";
import App from "./App";
import AppErrorBoundary from "./components/AppErrorBoundary";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se encontró #root en index.html.");
}

window.addEventListener("error", (event) => {
  console.error("WAIA window error:", event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("WAIA unhandled rejection:", event.reason);
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
);
