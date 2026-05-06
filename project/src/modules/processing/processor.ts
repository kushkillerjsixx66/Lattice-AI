import { process } from "../../core/engine";
import type { Input, Output } from "../../core/types";

/**
 * Processing module capability: adapt module input to core processing.
 * Talks to core via stable interfaces only.
 */
export function runProcessing(input: Input): Output {
  return process(input);
}
