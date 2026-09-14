// Vite exposes VITE_* variables to browser code; never put secrets here.
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5167"
).replace(/\/+$/, "");
