/**
 * Adaptador futuro.
 *
 * NO está importado por la demo actual. La aplicación activa vive en /src y
 * utiliza localStorage. Cuando se conecte el backend, esta frontera puede
 * implementar los mismos contratos usando REST.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const apiEnabled = import.meta.env.VITE_USE_API === "true";

export function futureApiClient(){
  return {
    mode: apiEnabled ? "rest" : "local",
    baseUrl: API_BASE_URL,
    status: "prepared-only",
  };
}
