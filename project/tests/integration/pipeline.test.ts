import { handleApiEvent } from '../../src/adapters/pipeline';

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

const validPayload = {
  token: 'token-12345',
  eventType: 'friction' as const,
  intensity: 0.9,
  coherenceDelta: 0.2,
  reversible: true,
  attentionCost: 0.3,
};

{
  const result = handleApiEvent(validPayload);
  assert(result.allowActivation === true, 'expected activation allowed for valid payload');
  assert(result.nextState === 'Active', 'expected active state for valid payload');
}

{
  const result = handleApiEvent({ ...validPayload, token: 'short' });
  assert(result.allowActivation === false, 'expected activation denied for invalid auth');
  assert(result.nextState === 'Latent', 'expected latent state for denied auth');
}
