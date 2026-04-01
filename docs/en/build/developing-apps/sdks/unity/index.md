---
title: Unity SDK
description: Unity integration on WAX
---

# Unity SDK

Unity projects on WAX need a clear decision about wallet support, platform targets, and how much blockchain logic belongs in the client.

## Use Unity When

- your core experience is a game client
- you need in-engine wallet-aware UX
- you are prepared to validate wallet compatibility and session behavior early

## Planning Checklist

- decide which WAX wallets you will support
- decide whether signing happens entirely client-side
- test restore, reconnect, and transaction prompts on your target platforms
- keep environment and endpoint configuration outside hard-coded gameplay logic

## Existing Material

External Unity ecosystem material can still be useful, but treat this section as the WAX-side entry point for support expectations and integration planning.
