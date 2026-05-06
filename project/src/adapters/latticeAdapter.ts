import type { Input } from "../core/types";
import type { ApiEventPayload } from "./api";

/**
 * Maps external API payload into core input contract.
 */
export function toCoreInput(payload: ApiEventPayload): Input {
  return {
    eventType: payload.eventType,
    intensity: payload.intensity,
    coherenceDelta: payload.coherenceDelta,
    attentionCost: payload.attentionCost,
    reversibilityScore: payload.reversible ? 1 : 0,
  };
}
