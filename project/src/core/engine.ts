import { Input, Output } from './types';

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function isSurvivableAttentionCost(attentionCost: number): boolean {
  return attentionCost <= 0.7;
}

function isReversible(reversibilityScore: number): boolean {
  return reversibilityScore >= 0.5;
}

function increasesCoherence(coherenceDelta: number): boolean {
  return coherenceDelta > 0;
}

export function process(input: Input): Output {
  const normalizedIntensity = clamp01(input.intensity);
  const coherenceOk = increasesCoherence(input.coherenceDelta);
  const attentionOk = isSurvivableAttentionCost(clamp01(input.attentionCost));
  const reversibleOk = isReversible(clamp01(input.reversibilityScore));

  const allowActivation = coherenceOk && attentionOk && reversibleOk;

  if (!allowActivation) {
    return {
      nextState: normalizedIntensity < 0.3 ? 'Pruned' : 'Latent',
      allowActivation: false,
      shouldPrune: normalizedIntensity < 0.3,
    };
  }

  if (normalizedIntensity > 0.8) {
    return {
      nextState: 'Active',
      allowActivation: true,
      shouldPrune: false,
    };
  }

  return {
    nextState: 'Decaying',
    allowActivation: true,
    shouldPrune: false,
  };
}
