# Interfaces

## Core ↔ Modules

### Function Signatures
- `ingest_attention_event(event: AttentionEvent) -> CoreSignal`
- `activate_nodes(signal: CoreSignal, state: LatticeState) -> LatticeState`
- `evaluate_governance(state: LatticeState) -> GovernanceDecision`
- `apply_decay(state: LatticeState, now: Timestamp) -> LatticeState`
- `enter_silence(state: LatticeState, duration: SilenceInterval) -> LatticeState`
- `emit_bias(state: LatticeState) -> AdvisoryBiasOutput`

### Data Contracts
- `AttentionEvent` must be one of: `friction | surprise | contradiction | curiosity | emotional_charge`.
- `LatticeState` must preserve node states: `Latent`, `Active`, `Decaying`, `Pruned`.
- `GovernanceDecision` must include:
  - `coherence_delta`
  - `attention_cost`
  - `reversibility_score`
  - `action` (`retain | downgrade_to_latent | prune`)
- `AdvisoryBiasOutput` must be probabilistic and explicitly non-mandatory.

## Modules ↔ Adapters

### Input Schema (Adapter → Module)
```json
{
  "event_id": "string",
  "event_type": "friction|surprise|contradiction|curiosity|emotional_charge",
  "timestamp": "RFC3339",
  "context": {"source": "string", "tags": ["string"]},
  "weight": "number (0..1)"
}
```

### Output Schema (Module → Adapter)
```json
{
  "state_transition": "latent|active|decaying|pruned",
  "bias_vector": {"observe": "number", "delay": "number", "probe": "number"},
  "governance": {
    "coherence_delta": "number",
    "attention_cost": "number",
    "reversibility_score": "number"
  },
  "mandatory_action": false,
  "ignorable": true
}
```

## External Interfaces

### APIs
- `POST /v1/lattice/events`: accepts validated `AttentionEvent` payloads.
- `GET /v1/lattice/state/:id`: returns current node-state distribution and silence timer.
- `POST /v1/lattice/reset`: triggers hard reset phrase path (“Echoes return to the dark”).

### File I/O Formats
- Event logs: newline-delimited JSON (`.jsonl`) with validated `AttentionEvent` records.
- Snapshots: JSON documents containing serializable `LatticeState` and governance metrics.
- Config: YAML or JSON for decay constants, silence intervals, and threshold tuning.

## Rules
- Interfaces are stable and versioned; breaking changes require explicit version bumps.
- Implementations can change as long as contracts, invariants, and advisory-output semantics remain intact.
- Core remains pure; any I/O, API transport, persistence, or scheduling concerns stay in adapters.
- External inputs are rejected if not mapped into the canonical attention-event classes.
