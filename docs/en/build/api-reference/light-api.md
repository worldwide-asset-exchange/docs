---
title: Light API
---

# Light API

On WAX, “light API” typically refers to lighter-weight managed API access patterns that avoid the full cost of running broad archival or indexing infrastructure.

## External Reference

For the light API HTTP surface used by one common Antelope implementation, use:

- [eosio_light_api HTTP API reference](https://github.com/cc32d9/eosio_light_api#http-api)

## When It Fits

- read-heavy apps with simpler data needs
- environments that do not need deep indexed history
- services that want lower operational complexity than full history infrastructure

## Important Caveat

Provider offerings vary. Treat “light API” as a deployment and service category, not as a single universal WAX standard.

Related pages:

- [Choosing an Endpoint](/build/endpoints/choosing-an-endpoint)
- [WAX API Services](/build/wax-api-services)
