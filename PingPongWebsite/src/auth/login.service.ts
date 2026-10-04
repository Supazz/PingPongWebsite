import { API_BASE_URL, checkResponse } from "../api";
import type { CurrentUser, LoginRequest } from "./login.model";
export const login = async (request: LoginRequest) => {
  const url = `${API_BASE_URL}/api/auth/login`;
  const response = await fetch(url, {
    method: "Post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: request.username,
      password: request.password,
    }),
  });

  if (response.status == 401) {
    throw new Error("Sign-in failed.");
  }
  if (!response.ok) {
    throw new Error("Unable to sign in. Please try again.");
  }
};

export const logout = async () => {
  const url = `${API_BASE_URL}/api/auth/logout`;
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  checkResponse(response, "Unable to log out. Please try again.");
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const url = `${API_BASE_URL}/api/auth/me`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status == 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Unable to check your acount");
  }
  return response.json();
};
