---
id: ecdsa-crypto-manager
title: ECDSACryptoManager
sidebar_position: 3
---

# ECDSACryptoManager

The `ECDSACryptoManager` class provides ECDSA cryptographic operations for secure message signing and verification using the Secp256k1 curve. This is particularly useful for secure communication in state channels.

## Constructor

```typescript
constructor()
```

Creates a new instance of ECDSACryptoManager and automatically generates a keypair.

## Methods

### signMessage

```typescript
signMessage(m: string): { r: string, s: string }
```

Signs a message using the local private key.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `m` | `string` | The message to sign |

#### Returns

Returns an object containing the signature components:
- `r`: The r component of the ECDSA signature
- `s`: The s component of the ECDSA signature

#### Throws

- Throws an error if the private key hasn't been generated

### verifySignature

```typescript
verifySignature(sig: { r: string, s: string }, m: string): Boolean
```

Verifies a signature using the peer's public key.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `sig` | `{ r: string, s: string }` | The signature to verify |
| `m` | `string` | The original message |

#### Returns

Returns `true` if the signature is valid, `false` otherwise.

#### Throws

- Throws an error if the peer's public key hasn't been set

### setPeerPublicKey

```typescript
setPeerPublicKey(x: string, y: string): void
```

Sets the public key of the peer for signature verification.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `x` | `string` | The x-coordinate of the public key point |
| `y` | `string` | The y-coordinate of the public key point |

#### Throws

- Throws an error if the provided coordinates are invalid

### getMyPublicKey

```typescript
getMyPublicKey(): { x: string, y: string }
```

Gets the local public key coordinates.

#### Returns

Returns an object containing:
- `x`: The x-coordinate of the public key point
- `y`: The y-coordinate of the public key point

#### Throws

- Throws an error if the local public key hasn't been initialized

## Example Usage

```typescript
import { ECDSACryptoManager } from '@yeshilabs/z2zlib';

// Create crypto managers for both parties
const aliceCrypto = new ECDSACryptoManager();
const bobCrypto = new ECDSACryptoManager();

// Exchange public keys
const alicePublicKey = aliceCrypto.getMyPublicKey();
const bobPublicKey = bobCrypto.getMyPublicKey();

// Set peer public keys
aliceCrypto.setPeerPublicKey(bobPublicKey.x, bobPublicKey.y);
bobCrypto.setPeerPublicKey(alicePublicKey.x, alicePublicKey.y);

// Alice signs a message
const message = "Hello Bob!";
const signature = aliceCrypto.signMessage(message);

// Bob verifies Alice's signature
const isValid = bobCrypto.verifySignature(signature, message);
console.log('Signature valid:', isValid); // true
```

## Implementation Details

The ECDSACryptoManager uses o1js's cryptographic primitives for ECDSA operations on the Secp256k1 curve. It includes:

- Automatic keypair generation on instantiation
- ECDSA signature generation and verification
- Public key exchange functionality
- Secure message signing using Secp256k1

## Security Considerations

1. **Key Management**
   - Private keys are generated securely using random values
   - Private keys never leave the instance
   - Public keys should be exchanged securely

2. **Signature Verification**
   - Always verify the peer's public key is set before verification
   - Uses standard ECDSA verification on Secp256k1 curve

3. **Message Handling**
   - Messages are converted to bytes using a consistent encoding
   - Signatures are represented as strings for easy transmission 