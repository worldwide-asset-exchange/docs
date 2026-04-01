---
title: WharfKit Session Management
---

# Session Management

Session handling is one of the main reasons to adopt a dedicated integration library.

## Goals

- restore the right account on reload
- keep signing state predictable
- support logout and account switching cleanly
- avoid confusing the user about which account is active

## Design Guidance

- treat the wallet as the source of signing authority
- treat your application as the source of UI state
- restore sessions deliberately instead of assuming the last session is always correct
- surface the active account and chain clearly in the UI

## Common Failure Cases

- stale session data
- endpoint mismatch
- wallet unavailable after restore
- app state assuming the wrong actor is active

Related pages:

- [Transactions and Signing](/build/developing-apps/sdks/wharfkit/transactions-and-signing)
- [Wallet and Session Issues](/build/troubleshooting/wallet-and-session-issues)
