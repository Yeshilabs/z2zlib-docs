---
id: webrtc-manager
title: WebRTCManager
sidebar_position: 5
---

# WebRTCManager

The `WebRTCManager` class handles WebRTC peer-to-peer connections, data channels, and state synchronization between peers. It integrates with the SignalingServer for connection establishment and the ECDSACryptoManager for secure message signing.

:::note
This class can only be used in a browser environment.
:::

## Constructor

```typescript
constructor(
  socket: Socket,
  roomName: string,
  stateManager: StateManager<any, any>,
  onDataChannelOpenCallback?: () => void,
  iceServers?: RTCConfiguration
)
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `socket` | `Socket` | Socket.IO client instance |
| `roomName` | `string` | Room identifier for signaling |
| `stateManager` | `StateManager<any, any>` | State manager instance |
| `onDataChannelOpenCallback` | `(() => void) \| null` | Optional callback when data channel opens |
| `iceServers` | `RTCConfiguration` | Optional ICE server configuration |

## Methods

### init

```typescript
init(): void
```

Initializes the WebRTC connection and sets up event listeners.

### sendSignedData

```typescript
sendSignedData(label: string, data: JsonData): void
```

Sends signed data through the data channel.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `label` | `string` | Message type identifier |
| `data` | `JsonData` | Data to send |

#### Throws

- Throws if KeyExchangeManager is not initialized

### sendData

```typescript
sendData(label: string, data: JsonData): void
```

Sends raw data through the data channel.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `label` | `string` | Message type identifier |
| `data` | `JsonData` | Data to send |

### close

```typescript
close(): void
```

Closes the WebRTC connection and data channel.

### setOnMessageCallback

```typescript
setOnMessageCallback(callback: (data: JsonData) => void): void
```

Sets a callback for handling incoming messages.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | `(data: JsonData) => void` | Message handler function |

## Message Types

The WebRTCManager handles several types of messages:

### PublicKeyExchange

Exchange of public keys between peers.

```typescript
interface PublicKeyMessage {
  publicKey: {
    x: string;
    y: string;
  }
}
```

### InitState

Initial state synchronization from host to peer.

```typescript
interface InitStateMessage {
  state: string; // Serialized state
}
```

### StateUpdate

State updates during operation.

```typescript
interface StateUpdateMessage {
  state: any;
  move: any;
}
```

## Example Usage

```typescript
import { WebRTCManager, StateManager, io } from '@yeshilabs/z2zlib';

// Create Socket.IO connection
const socket = io('http://localhost:3000');

// Initialize state manager
const stateManager = new StateManager(initialState, transition);

// Create WebRTC manager
const webrtcManager = new WebRTCManager(
  socket,
  'game-room',
  stateManager,
  () => console.log('Data channel opened')
);

// Initialize connection
webrtcManager.init();

// Send state update
webrtcManager.sendSignedData('StateUpdate', {
  state: currentState,
  move: playerMove
});

// Clean up
webrtcManager.close();
```

## Implementation Details

### Connection Flow

1. **Initialization**
   - Connects to signaling server
   - Joins or creates room
   - Sets up WebRTC peer connection

2. **Data Channel Setup**
   - Host creates data channel
   - Peer waits for data channel
   - Exchange public keys on open

3. **State Synchronization**
   - Host sends initial state
   - Peer acknowledges
   - Both parties exchange signed updates

### Security Features

1. **Message Signing**
   - Uses ECDSA for message signatures
   - Verifies all signed messages
   - Protects against tampering

2. **State Validation**
   - Verifies state transitions
   - Checks state consistency
   - Handles synchronization errors

## Types

### JsonData

```typescript
type JsonData = { [key: string]: any };
```

### RTCConfiguration

Standard WebRTC configuration object for ICE servers.

## Security Considerations

1. **Connection Security**
   - Uses STUN servers for NAT traversal
   - Implements secure WebRTC protocols
   - Validates peer identity through signatures

2. **State Security**
   - Signs all state updates
   - Verifies state transitions
   - Maintains state consistency

3. **Error Handling**
   - Handles connection failures
   - Manages state synchronization errors
   - Provides clean connection closure 