---
title: Contract Deploy and ABI
---

# Contract Deploy and ABI

Contract deployment issues usually come from mismatches between compiled code, ABI output, permissions, and the target account state.

## Typical Failure Modes

- wrong signing authority
- stale or incompatible ABI
- deployment to the wrong account or environment
- endpoint assumptions that hide the real failure

## Checks

- verify the deploying account and permission
- verify the target environment
- rebuild contract artifacts cleanly when the ABI changes
- confirm the toolchain you used matches the workflow you intended
