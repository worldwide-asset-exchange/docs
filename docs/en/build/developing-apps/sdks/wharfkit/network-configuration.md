---
title: WharfKit Network Configuration
---

# Network Configuration

Network configuration decides which chain and endpoints your app will talk to.

## Key Decisions

- mainnet vs testnet
- public vs managed endpoint
- single endpoint vs failover strategy
- client-side only vs backend-assisted routing

## Recommendations

- keep chain configuration explicit
- separate development and production environment settings
- make endpoint changes easy to roll out without rewriting app logic
- validate your app against degraded or unavailable endpoints

Related pages:

- [Choosing an Endpoint](/build/endpoints/choosing-an-endpoint)
- [Rate Limits and Failover](/build/endpoints/rate-limits-and-failover)
