---
title: Accounts
---

# Accounts

WAX accounts are named on-chain identities used to hold assets, sign transactions, deploy contracts, and own data.

## What Makes WAX Accounts Different

- They use human-readable names instead of long hexadecimal addresses.
- They work with a permission system rather than a single flat signing authority.
- They interact directly with on-chain resources such as CPU, NET, and RAM.

## Common Account Roles

- user accounts for holding tokens and NFTs
- contract accounts for smart-contract deployment
- service accounts for automation, integrations, and operations

## Account Name Validation

WAX account names follow this regex pattern:

```txt
(^[a-z1-5.]{1,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)
```

## What an Account Owns

A WAX account can control:

- token balances
- NFTs and other digital assets
- permissions and keys
- smart-contract code and tables
- on-chain configuration and metadata

Read next:

- [Permissions](/build/core-concepts/permissions)
- [Resources](/build/core-concepts/resources)
