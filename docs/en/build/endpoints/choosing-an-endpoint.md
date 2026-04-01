---
title: Choosing an Endpoint
---

# Choosing an Endpoint

Choose endpoints based on your application workload, not just convenience.

## Questions to Answer

- do you need only chain RPC or also history/indexing
- are you building for development, production, or both
- can the app tolerate public endpoint rate limits
- do you need SLAs or provider support

## Common Patterns

### Public Endpoint First

Good for prototypes, testing, and low-volume tools.

### Managed Provider

Good for production apps that need stronger reliability guarantees.

### Mixed Strategy

Use separate endpoints for read, write, and history workloads when the app justifies the complexity.
