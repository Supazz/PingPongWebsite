// Vite exposes VITE_* variables to browser code; never put secrets here.
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5167"
).replace(/\/+$/, "");

export function checkResponse(response: Response, message: string): void {
  if (response.status === 401) {
    throw new Error("Please sign in to continue.");
  }
  if (response.status === 403) {
    throw new Error("You need the Admin role to perform this action.");
  }
  if (!response.ok) throw new Error(message);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return "Unable to connect to the server. Check your connection and try again.";
  }
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
