---
title: Server Side Auth
order: 100
---

# Server Side Auth

Server-side auth on WAX is about validating wallet-driven identity and signature flows on the backend without weakening the client signing model.

## When You Need It

- account-linked backend sessions
- protected APIs
- game backends and inventory services
- identity proof flows that must survive beyond a single browser action

## Important Design Rule

Backend verification should complement wallet signing, not replace it.

## Existing Pattern

The current tutorial focuses on proof-based verification for backend validation and is most useful when you need an example of how wallet-issued proof data can be checked server-side.
