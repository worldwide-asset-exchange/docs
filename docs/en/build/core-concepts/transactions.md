---
title: Transactions
---

# Transactions

Transactions are the signed requests sent to the chain to execute one or more actions.

## What a Transaction Includes

- one or more actions
- the authorizing permission
- the chain context needed for validation
- signatures from the appropriate wallet or signer

## Actions

An action is a named call to a contract. Transactions can bundle several actions together so they succeed or fail as one unit.

## Why This Matters for Builders

Understanding transactions helps you design:

- safe signing flows
- wallet prompts that users can trust
- multi-action app workflows
- backend verification and retry behavior

Read next:

- [Smart Contracts](/build/core-concepts/smart-contracts)
- [Transactions and Signing](/build/developing-apps/sdks/wharfkit/transactions-and-signing)
