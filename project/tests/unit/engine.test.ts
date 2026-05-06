import { process } from '../../src/core/engine';

const baseInput = {
  eventType: 'friction' as const,
  intensity: 0.9,
  coherenceDelta: 0.2,
  attentionCost: 0.3,
  reversibilityScore: 0.9,
};

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

{
  const result = process(baseInput);
  assert(result.allowActivation === true, 'expected activation allowed');
  assert(result.nextState === 'Active', 'expected active state');
}

{
  const result = process({ ...baseInput, coherenceDelta: -0.1, intensity: 0.2 });
  assert(result.allowActivation === false, 'expected activation denied');
  assert(result.nextState === 'Pruned', 'expected pruned state');
}
