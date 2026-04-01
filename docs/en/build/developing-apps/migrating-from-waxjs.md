---
title: Migrating from WaxJS
---

# Migrating from WaxJS

Older WaxJS-based material remains in the repo for reference, but new integrations should not start there.

## Recommended Direction

Move to a WharfKit-centered integration strategy for:

- login flow
- session management
- transaction signing
- wallet support abstraction

## Migration Checklist

- identify where WaxJS is responsible for login or signing
- replace those entry points with a modern session model
- review any assumptions about temporary accounts or legacy wallet behavior
- retest the full user flow across supported wallets

## Archived Material

The old WaxJS pages remain available as archive references:

- [WaxJS overview](/build/cloud-wallet/waxjs/)
- [Legacy My Cloud Wallet build landing page](/build/cloud-wallet/)
- [Legacy SDK routes](/build/cloud-wallet/sdks/)
- [Legacy Unity SDK route](/build/cloud-wallet/sdks/unity/)
- [Legacy React Native SDK route](/build/cloud-wallet/sdks/react-native/)
- [boost.wax](/build/cloud-wallet/boost-wax)
