---
id: signaling-server
title: SignalingServer
sidebar_position: 4
---

# SignalingServer

The `SignalingServer` class implements WebRTC signaling functionality using Socket.IO. It manages room-based peer connections and handles WebRTC signaling events for establishing peer-to-peer connections.

## Constructor

```typescript
constructor(httpServer: HTTPServer)
```

Creates a new instance of SignalingServer.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `httpServer` | `HTTPServer` | An HTTP server instance to attach the Socket.IO server to |

## Static Properties

### io

```typescript
static get io(): Server | null
```

Gets the singleton instance of the Socket.IO server.

#### Returns

Returns the Socket.IO server instance or null if not initialized.

## Methods

### broadcastEvent

```typescript
public broadcastEvent(roomName: string, event: keyof SignalingEvents, data: any): void
```

Broadcasts an event to all clients in a specific room.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `roomName` | `string` | The name of the room to broadcast to |
| `event` | `keyof SignalingEvents` | The event type to emit |
| `data` | `any` | The data to send with the event |

## Events

The SignalingServer handles the following WebRTC signaling events:

### join

```typescript
socket.on("join", (roomName: string) => void)
```

Handles a client joining a room.
- If room doesn't exist: Creates room and emits "created"
- If room has one client: Joins room and emits "joined"
- If room is full: Emits "full"

### ready

```typescript
socket.on("ready", (roomName: string) => void)
```

Handles a client indicating they're ready to establish a connection.
- Broadcasts "ready" event to other clients in the room

### ice-candidate

```typescript
socket.on("ice-candidate", (candidate: RTCIceCandidate, roomName: string) => void)
```

Handles ICE candidate exchange between peers.
- Forwards ICE candidates to other clients in the room

### offer

```typescript
socket.on("offer", (offer: any, roomName: string) => void)
```

Handles WebRTC offer from initiating peer.
- Forwards offer to other clients in the room

### answer

```typescript
socket.on("answer", (answer: any, roomName: string) => void)
```

Handles WebRTC answer from responding peer.
- Forwards answer to other clients in the room

### leave

```typescript
socket.on("leave", (roomName: string) => void)
```

Handles a client leaving a room.
- Removes client from room
- Notifies other clients in the room

## Example Usage

```typescript
import { createServer } from 'http';
import { SignalingServer } from '@yeshilabs/z2zlib';

// Create HTTP server
const httpServer = createServer();

// Initialize signaling server
const signalingServer = new SignalingServer(httpServer);

// Start server
httpServer.listen(3000, () => {
  console.log('Signaling server running on port 3000');
});

// Broadcast custom event to a room
signalingServer.broadcastEvent('game-room', 'ready', {
  message: 'Both peers connected'
});
```

## Implementation Details

The SignalingServer uses Socket.IO for WebRTC signaling and implements:

- Room-based connection management
- Automatic room creation and cleanup
- Event forwarding between peers
- CORS support for cross-origin connections

## Security Considerations

1. **Room Management**
   - Rooms are limited to two peers
   - Automatic cleanup when peers leave
   - Room names should be properly sanitized

2. **CORS Configuration**
   - Currently allows all origins (`"*"`)
   - Should be restricted in production

3. **Event Validation**
   - Events are typed using SignalingEvents interface
   - Data validation should be implemented based on use case

## Types

### SignalingEvents

```typescript
interface SignalingEvents {
  "join": (roomName: string) => void;
  "ready": (roomName: string) => void;
  "ice-candidate": (candidate: RTCIceCandidate, roomName: string) => void;
  "offer": (offer: any, roomName: string) => void;
  "answer": (answer: any, roomName: string) => void;
  "leave": (roomName: string) => void;
}
```

### RTCIceCandidate

Standard WebRTC ICE candidate interface used for peer connection negotiation. 