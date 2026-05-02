import type { AuthInput } from "../modules/auth/types";

export interface ApiEventPayload {
  readonly token: string;
  readonly eventType: "friction" | "surprise" | "contradiction" | "curiosity" | "emotional_charge";
  readonly intensity: number;
  readonly coherenceDelta: number;
  readonly reversible: boolean;
  readonly attentionCost: number;
}

/**
 * Adapter boundary for remote payloads.
 * This is intentionally effectful-facing (outside world), but kept as a pure mapper for testability.
 */
export function toAuthInput(payload: ApiEventPayload): AuthInput {
  return { token: payload.token };
}
