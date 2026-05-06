Constraints Specification

1. Architectural Constraints

1.1 Layer Separation

- Core MUST NOT import or depend on:
  - Modules
  - Adapters
  - External libraries (except pure utilities explicitly allowed)
- Modules MUST NOT directly depend on other modules
- Adapters MUST NOT contain business logic

1.2 Dependency Direction

- Allowed flow:
  Adapters → Modules → Core
- Reverse dependencies are forbidden

1.3 Interface Enforcement

- All communication between layers MUST occur via defined interfaces
- No direct data structure sharing across layers

---

2. Data Constraints

2.1 Validation Boundary

- All external data MUST be validated before entering the system
- Core assumes data is valid and does NOT revalidate

2.2 Immutability

- Data MUST be treated as immutable after validation
- Any transformation MUST return a new object

2.3 Schema Integrity

- No dynamic schema changes at runtime
- All data structures MUST be explicitly defined

2.4 Serialization Rules

- All external I/O MUST use defined serialization formats
- No implicit conversions

---

3. Behavioral Constraints

3.1 Determinism

- Core logic MUST be deterministic
- Same input MUST produce identical output

3.2 Side Effects

- Core MUST have zero side effects
- Side effects ONLY allowed in adapters

3.3 State

- Core MUST remain stateless
- Modules MAY maintain local state ONLY if explicitly defined
- Adapters MAY manage external state

---

4. Dependency Constraints

4.1 External Libraries

- Must be explicitly justified
- No unnecessary dependencies
- Prefer standard library where possible

4.2 Versioning

- Dependencies MUST be pinned (no floating versions)

4.3 Isolation

- External dependencies MUST be wrapped in adapters
- No direct usage inside core or modules

---

5. Complexity Constraints

5.1 Function Size

- Max 50 lines per function

5.2 Cyclomatic Complexity

- Max complexity: 10 per function

5.3 Nesting Depth

- Max nesting: 3 levels

5.4 File Size

- Max 500 lines per file

---

6. Mutation Rules

6.1 Allowed Mutation Zones

- Adapters ONLY (if necessary)

6.2 Forbidden Mutation

- Core MUST NOT mutate inputs
- Modules MUST NOT mutate shared data

6.3 Explicitness

- All mutations MUST be explicit and visible

---

7. Error Handling Constraints

7.1 Explicit Errors

- No silent failures
- No swallowed exceptions

7.2 Error Structure

- Errors MUST follow defined schema

7.3 Propagation

- Core returns structured errors, does NOT throw

7.4 Boundaries

- Adapters MAY throw, but MUST convert to structured errors before passing inward

---

8. Observability Constraints

8.1 Logging

- Logging ONLY in adapters
- Core MUST NOT log

8.2 Tracing

- All requests MUST be traceable via ID

8.3 Metrics

- Performance metrics collected externally

---

9. Performance Constraints

9.1 Time

- Operations MUST complete within defined latency bounds

9.2 Memory

- No unbounded memory growth

9.3 Concurrency

- System MUST be safe under concurrent execution

---

10. Security Constraints

10.1 Input Safety

- All inputs MUST be sanitized

10.2 Data Exposure

- No sensitive data leakage across layers

10.3 Access Control

- Enforced at adapter level

---

11. Forbidden Patterns

- Hidden state
- Implicit side effects
- Cross-layer access
- Circular dependencies
- Magic numbers
- Hardcoded configuration
- Global variables
- Reflection-based logic (unless justified)
- Runtime schema mutation

---

12. Code Style Constraints

12.1 Naming

- Descriptive, explicit names
- No abbreviations unless standard

12.2 Structure

- Single responsibility per function/module

12.3 Comments

- Explain WHY, not WHAT

---

13. Testing Constraints

13.1 Coverage

- Core logic MUST have unit test coverage

13.2 Isolation

- Unit tests MUST NOT depend on external systems

13.3 Integration

- Integration tests validate adapter + module interaction

---

14. Extension Constraints

- New code MUST NOT violate existing constraints
- Refactors MUST preserve all invariants
- Interfaces MUST remain backward compatible

---

15. Enforcement Rules

- Any code violating constraints MUST be rejected
- No “temporary exceptions” without explicit documentation
- Constraints override convenience
