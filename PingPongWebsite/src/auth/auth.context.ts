import { createContext } from "react";
import type { CurrentUser } from "./login.model";

export type AuthContextValue = {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<CurrentUser | null>;
  clearUser: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
