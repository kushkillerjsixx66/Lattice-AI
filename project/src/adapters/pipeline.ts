import { authenticate } from "../modules/auth/auth";
import { runProcessing } from "../modules/processing/processor";
import type { Output } from "../core/types";
import type { ApiEventPayload } from "./api";
import { toAuthInput } from "./api";
import { toCoreInput } from "./latticeAdapter";

/**
 * Outside-world pipeline: adapters -> modules -> core.
 */
export function handleApiEvent(payload: ApiEventPayload): Output {
  const authResult = authenticate(toAuthInput(payload));

  if (authResult.status === "Denied") {
    return {
      nextState: "Latent",
      allowActivation: false,
      shouldPrune: false,
    };
  }

  return runProcessing(toCoreInput(payload));
}
