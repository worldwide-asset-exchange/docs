---
title: WharfKit Transactions and Signing
---

# Transactions and Signing

Good signing UX is a product requirement, not just a code requirement.

## Principles

- tell the user what action they are about to sign
- keep the action scope as narrow as practical
- surface the active wallet and account clearly
- treat transaction failures as normal product cases that need recovery paths

## What to Validate

- actor and permission
- chain and endpoint selection
- action payload shape
- expected result or post-signing state

## Common App Responsibilities

- prepare transactions consistently
- handle rejected signatures
- detect endpoint and session issues
- avoid repeat prompts caused by state bugs

Related pages:

- [Transactions](/build/core-concepts/transactions)
- [Signing and User Experience](/build/developing-apps/signing-and-user-experience)
