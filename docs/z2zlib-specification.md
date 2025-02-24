---
id: z2zlib-specification
title: Z2Zlib Specification
sidebar_position: 2
---

# Z2Zlib: A Formal Specification

## Overview

Z2Zlib is a TypeScript library that implements zero-knowledge state channels for the Mina Protocol. It enables two participants to run an off-chain state machine, advancing the state optimistically without blockchain interaction. Disputes are resolved by submitting zero-knowledge proofs on-chain.

## Architecture

The library consists of two main stacks:

### Network Stack
- **KeyExchangeManager**: Handles secure key exchange between participants
- **SignalingServer**: Manages WebRTC connection establishment
- **WebRTCManager**: Provides peer-to-peer communication

### State Stack
- **StateManager**: Manages state transitions and synchronization
- **ProofGenerator**: Creates zero-knowledge proofs for state transitions
- **CircuitCompiler**: Compiles circuits for state transition verification

## Protocol Flow

1. **Setup Phase**
   - Participants exchange public keys
   - Initial state is agreed upon
   - WebRTC connection is established

2. **Operation Phase**
   - State transitions are proposed and verified
   - ZK proofs are generated when needed
   - State is synchronized between participants

3. **Settlement Phase**
   - Final state is agreed upon
   - Channel can be closed cooperatively or through on-chain dispute

## Security Properties

- **Privacy**: State transitions are kept private through ZK proofs
- **Safety**: Invalid state transitions are prevented
- **Liveness**: Channel progress is guaranteed for honest participants

## Implementation Details

### State Representation

```typescript
interface State {
  counter: number;
  turn: 'alice' | 'bob';
  // Additional state fields...
}
```

### State Transitions

```typescript
interface StateTransition {
  from: State;
  to: State;
  proof?: ZKProof;
}
```

### Circuit Structure

```typescript
interface Circuit {
  publicInputs: {
    previousStateHash: Field;
    newStateHash: Field;
  };
  privateInputs: {
    previousState: State;
    newState: State;
  };
}
```

## Usage Examples

Check out the [Getting Started](./getting-started) guide and [API Reference](./api/state-manager) for detailed usage instructions. 