---
id: getting-started
title: Getting Started
sidebar_position: 1
---

# Getting Started with Z2Zlib

Z2Zlib is a TypeScript library for building zero-knowledge state channels on the Mina Protocol. This guide will help you get started with using Z2Zlib in your project.

## Installation

```bash
npm install @yeshilabs/z2zlib
# or
yarn add @yeshilabs/z2zlib
```

## Basic Usage

```typescript
import { StateChannel, KeyExchangeManager } from '@yeshilabs/z2zlib';

// Initialize a new state channel
const channel = new StateChannel({
  participants: {
    alice: 'B62qiy32p8kAKnny8ZFwoMhYpBppM1DWVCqAPBYNcXnsAHhnfAAuXgg',
    bob: 'B62qiy32p8kAKnny8ZFwoMhYpBppM1DWVCqAPBYNcXnsAHhnfAAuXgg'
  },
  initialState: {
    // Your initial state here
  }
});

// Start the channel
await channel.initialize();
```

## Key Concepts

Z2Zlib is built around several key concepts:

1. **State Channels**: Off-chain communication channels between two parties
2. **Zero-Knowledge Proofs**: Privacy-preserving state transition verifications
3. **State Management**: Handling state transitions and synchronization
4. **Network Stack**: Managing peer-to-peer communication

## Next Steps

- Read the [full specification](./z2zlib-specification)
- Check out the [API Reference](./api/state-manager)
- Follow the [Quick Start Guide](./guides/quick-start) 