---
id: state-manager
title: StateManager
sidebar_position: 1
---

# StateManager

The `StateManager` class is responsible for managing the state of a zero-knowledge state channel. It handles state transitions, verification, and proof generation.

## Type Parameters

| Parameter | Description |
|-----------|-------------|
| `S extends State` | The type of state being managed |
| `M` | The type of moves/actions that can be applied |

## Constructor

```typescript
constructor(initialState: S, transition: StateTransition<S, M>)
```

Creates a new instance of the StateManager.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `initialState` | `S` | The initial state of the channel |
| `transition` | `StateTransition<S, M>` | The state transition rules |

## Methods

### applyMove

```typescript
applyMove(move: M): S
```

Applies a move to the current state and updates it if valid.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `move` | `M` | The move to apply |

#### Returns

Returns the new state after applying the move.

#### Throws

Throws an error if the state transition is invalid.

### updateState

```typescript
updateState(state: S): void
```

Updates the current state directly.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `state` | `S` | The new state |

### getState

```typescript
getState(): S
```

Gets the current state.

#### Returns

Returns the current state object.

### getStateHash

```typescript
getStateHash(): Field
```

Gets the hash of the current state.

#### Returns

Returns a Field representing the state hash.

### onStateUpdate

```typescript
onStateUpdate(callback: (state: S) => void): void
```

Subscribes to state changes.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | `(state: S) => void` | Function to call when state changes |

### verifyTransition

```typescript
verifyTransition(prevState: S, nextState: S, move: M): boolean
```

Verifies if a state transition is valid.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `prevState` | `S` | The previous state |
| `nextState` | `S` | The proposed next state |
| `move` | `M` | The move being applied |

#### Returns

Returns `true` if the transition is valid, `false` otherwise.

### serialize

```typescript
serialize(): string
```

Serializes the current state.

#### Returns

Returns a string representation of the current state.

### verifyProof

```typescript
async verifyProof(proof: any): Promise<boolean>
```

Verifies a zero-knowledge proof.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `proof` | `any` | The proof to verify |

#### Returns

Returns a Promise that resolves to `true` if the proof is valid.

### verifySignature

```typescript
verifySignature(message: string, signature: string, publicKey: string): boolean
```

Verifies a signature.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `message` | `string` | The message that was signed |
| `signature` | `string` | The signature to verify |
| `publicKey` | `string` | The public key to verify against |

#### Returns

Returns `true` if the signature is valid.

## Example Usage

```typescript
import { StateManager, State, StateTransition } from '@yeshilabs/z2zlib';

// Define your state type
interface GameState extends State {
  counter: number;
  turn: 'alice' | 'bob';
}

// Define your move type
type Move = {
  type: 'increment' | 'decrement';
  player: 'alice' | 'bob';
};

// Create state transition rules
const transition: StateTransition<GameState, Move> = {
  apply: (state, move) => ({
    ...state,
    counter: move.type === 'increment' ? state.counter + 1 : state.counter - 1,
    turn: move.player === 'alice' ? 'bob' : 'alice'
  }),
  isValid: (prev, next, move) => {
    return move.player === prev.turn && 
           Math.abs(next.counter - prev.counter) === 1;
  }
};

// Initialize state manager
const stateManager = new StateManager<GameState, Move>(
  {
    counter: 0,
    turn: 'alice'
  },
  transition
);

// Subscribe to state changes
stateManager.onStateUpdate((state) => {
  console.log('New state:', state);
});

// Apply a move
const newState = stateManager.applyMove({
  type: 'increment',
  player: 'alice'
});
```

## Related Interfaces

### State

```typescript
interface State {
  hash(): Field;
  serialize(): string;
}
```

### StateTransition

```typescript
interface StateTransition<S extends State, M> {
  apply(state: S, move: M): S;
  isValid(prevState: S, nextState: S, move: M): boolean;
}
``` 