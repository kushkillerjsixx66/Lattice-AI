# Execution Flows

## Flow: Standard Processing

1. Adapter receives raw input
2. Validate input
3. Transform → InputDTO
4. Pass to core.process()
5. Receive OutputDTO
6. Adapter handles output

## Flow: Failure Case

- Validation fails → reject immediately
