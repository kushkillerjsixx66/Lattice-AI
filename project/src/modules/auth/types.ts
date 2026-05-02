export type AuthStatus = "Authenticated" | "Denied";

export interface AuthInput {
  readonly token: string;
}

export interface AuthResult {
  readonly status: AuthStatus;
  readonly reason?: string;
}
