---
title: cleos and keosd
---

# cleos and keosd

Command-line problems often come from wallet state, endpoint configuration, or tool/version mismatch.

## Common Problems

- wallet not unlocked
- wrong API endpoint
- command aimed at the wrong chain
- key imported into the wrong wallet
- local tooling assumptions that no longer match the environment

## Checks

- confirm which wallet is active
- confirm whether the wallet is unlocked
- confirm which endpoint `cleos` is targeting
- verify the account and permission you are trying to use
