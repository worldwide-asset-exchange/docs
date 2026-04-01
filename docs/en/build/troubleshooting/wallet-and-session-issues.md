---
title: Wallet and Session Issues
---

# Wallet and Session Issues

These issues usually come from state mismatch between your app, wallet, and endpoint configuration.

## Common Problems

- wallet popup opens but the session does not restore
- the wrong account appears active after reload
- login succeeds but signing fails
- the wallet is connected to a different network or environment than the app expects

## First Checks

- confirm the active account
- confirm the target chain and endpoint
- clear stale local session state if your app stores it
- verify the wallet you selected is actually available in the current environment
