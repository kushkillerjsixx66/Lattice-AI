import type { AuthInput, AuthResult } from "./types";

/**
 * Auth module capability: validate token presence/shape only.
 * Pure and deterministic; no network or storage side effects.
 */
export function authenticate(input: AuthInput): AuthResult {
  const token = input.token.trim();

  if (token.length < 8) {
    return { status: "Denied", reason: "Token is too short" };
  }

  return { status: "Authenticated" };
}
