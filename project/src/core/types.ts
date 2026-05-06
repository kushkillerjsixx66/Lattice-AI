export type AttentionEventType =
  | 'friction'
  | 'surprise'
  | 'contradiction'
  | 'curiosity'
  | 'emotional_charge';

export interface Input {
  readonly eventType: AttentionEventType;
  readonly intensity: number; // 0..1
  readonly coherenceDelta: number;
  readonly attentionCost: number;
  readonly reversibilityScore: number;
}

export type NodeState = 'Latent' | 'Active' | 'Decaying' | 'Pruned';

export interface Output {
  readonly nextState: NodeState;
  readonly allowActivation: boolean;
  readonly shouldPrune: boolean;
}
