---
id: state
title: State Types
sidebar_position: 2
---

# State Types

The state system provides interfaces and base classes for implementing state management in zero-knowledge state channels.

## State Interface

The base interface for any state that can be used in the state channel.

```typescript
interface State {
    toFields(): Field[];
    hash(): Field;
    serialize(): string;
    equals(other: State): boolean;
    toString(): string;
}
```

### Methods

#### toFields

```typescript
toFields(): Field[]
```

Converts the state into an array of Fields for on-chain use.

#### Returns

Returns an array of `Field` values representing the state.

#### hash

```typescript
hash(): Field
```

Computes a hash representation of the state.

#### Returns

Returns a `Field` containing the state hash.

#### serialize

```typescript
serialize(): string
```

Serializes the state for transmission.

#### Returns

Returns a string representation of the state.

#### equals

```typescript
equals(other: State): boolean
```

Checks if the state is equal to another state.

##### Parameters

| Name | Type | Description |
|------|------|-------------|
| `other` | `State` | The state to compare against |

##### Returns

Returns `true` if the states are equal, `false` otherwise.

#### toString

```typescript
toString(): string
```

Gets a human-readable string representation of the state.

#### Returns

Returns a string describing the state.

## StateConstructor Interface

Interface for state constructors that can deserialize states.

```typescript
interface StateConstructor<T extends State> {
    deserialize(serialized: string): T;
}
```

### Methods

#### deserialize

```typescript
deserialize(serialized: string): T
```

Creates a state instance from its serialized form.

##### Parameters

| Name | Type | Description |
|------|------|-------------|
| `serialized` | `string` | The serialized state string |

##### Returns

Returns a new instance of the state.

## StateTransition Interface

Interface for defining state transitions.

```typescript
interface StateTransition<S extends State, M> {
    apply(state: S, move: M): S;
    isValid(state: S, nextState: S, move: M): boolean;
    generateProof?(state: S, nextState: S, move: M): Promise<void>;
    verifyProof?(state: S, nextState: S, move: M): Promise<boolean>;
}
```

### Methods

#### apply

```typescript
apply(state: S, move: M): S
```

Applies a move to the current state to get the next state.

##### Parameters

| Name | Type | Description |
|------|------|-------------|
| `state` | `S` | The current state |
| `move` | `M` | The move to apply |

##### Returns

Returns the new state after applying the move.

#### isValid

```typescript
isValid(state: S, nextState: S, move: M): boolean
```

Validates if a transition is valid.

##### Parameters

| Name | Type | Description |
|------|------|-------------|
| `state` | `S` | The current state |
| `nextState` | `S` | The proposed next state |
| `move` | `M` | The move being applied |

##### Returns

Returns `true` if the transition is valid, `false` otherwise.

#### generateProof (Optional)

```typescript
generateProof?(state: S, nextState: S, move: M): Promise<void>
```

Generates a proof for this transition.

##### Parameters

| Name | Type | Description |
|------|------|-------------|
| `state` | `S` | The current state |
| `nextState` | `S` | The next state |
| `move` | `M` | The move being applied |

#### verifyProof (Optional)

```typescript
verifyProof?(state: S, nextState: S, move: M): Promise<boolean>
```

Verifies a proof for this transition.

##### Parameters

| Name | Type | Description |
|------|------|-------------|
| `state` | `S` | The current state |
| `nextState` | `S` | The next state |
| `move` | `M` | The move being applied |

##### Returns

Returns a Promise that resolves to `true` if the proof is valid.

## BaseState Class

Abstract base class for implementing game states.

```typescript
abstract class BaseState implements State {
    abstract toFields(): Field[];
    abstract hash(): Field;
    abstract serialize(): string;
    abstract toString(): string;
    
    equals(other: State): boolean {
        return this.hash().equals(other.hash()).toBoolean();
    }
}
```

The `BaseState` class provides a default implementation of the `equals` method and requires implementing classes to define the other abstract methods.

## Example Usage

```typescript
import { BaseState, StateTransition, Field } from '@yeshilabs/z2zlib';

// Define a concrete state class
class GameState extends BaseState {
    constructor(
        public counter: number,
        public turn: 'alice' | 'bob'
    ) {
        super();
    }

    toFields(): Field[] {
        return [
            Field(this.counter),
            Field(this.turn === 'alice' ? 0 : 1)
        ];
    }

    hash(): Field {
        return Field.hash(this.toFields());
    }

    serialize(): string {
        return JSON.stringify({
            counter: this.counter,
            turn: this.turn
        });
    }

    toString(): string {
        return `GameState(counter: ${this.counter}, turn: ${this.turn})`;
    }
}

// Define state transition rules
const gameTransition: StateTransition<GameState, string> = {
    apply(state, move) {
        return new GameState(
            state.counter + 1,
            state.turn === 'alice' ? 'bob' : 'alice'
        );
    },
    
    isValid(state, nextState, move) {
        return nextState.counter === state.counter + 1 &&
               nextState.turn !== state.turn;
    }
};
``` 