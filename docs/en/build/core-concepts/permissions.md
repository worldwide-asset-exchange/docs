---
title: Permissions
---

# Permissions

Permissions are one of the defining parts of the WAX and Antelope account model.

## Core Idea

Instead of using one signer for everything, a WAX account can define multiple permissions and decide which actions each permission can authorize.

## Common Permissions

### Owner

The highest-authority permission on an account. It should be protected carefully and used sparingly.

### Active

The standard day-to-day permission used for normal account activity.

### Custom Permissions

Custom permissions are created for narrower workflows such as:

- claim actions
- automation
- app integrations
- contract-specific approvals

## Why Permissions Matter

They let you reduce risk by avoiding unnecessary use of high-authority keys and by separating workflows across wallets, tools, or services.

Read more:

- [Custom Permissions](/build/developing-smart-contracts/custom-permissions)
- [Security and Recovery](/learn/getting-started/security-and-recovery)
