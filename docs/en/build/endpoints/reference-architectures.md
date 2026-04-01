---
title: Reference Architectures
---

# Reference Architectures

Use endpoint architecture that matches your product maturity.

## Prototype

- single public endpoint
- client-side reads
- limited signing flow

## Production App

- managed primary endpoint
- secondary fallback endpoint
- explicit environment configuration
- backend mediation for sensitive or high-volume flows

## History-Heavy App

- separate chain and history endpoints
- indexed backend workloads
- monitoring for lag, throttling, and degraded providers
