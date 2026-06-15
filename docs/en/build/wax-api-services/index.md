---
title: WAX API Services
order: 4
---

# WAX API Services

This section is for service discovery. If you need architecture guidance, start with [Endpoints](/build/endpoints/).

## Free / Public API Discovery

Public API availability changes over time. For current endpoint discovery, use:

- [Validationcore endpoint reports](https://wax.validationcore.io/reports/nodes/api)

## Managed and Commercial Services

Commercial providers can make sense when you need:

- predictable uptime
- stronger rate-limit guarantees
- support for history or asset APIs
- lower operational overhead than self-hosting

Below is the current list preserved from the earlier WAX docs:

| Provider Name | Website                                                                        | Offerings                  | Offerings Type                               | Contact Information                                          |
| ------------- | ------------------------------------------------------------------------------ | -------------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| binfra.one    | [https://binfra.one/](https://binfra.one/)                                     | FAH, AA, SH, LA            | Dedicated and Shared Servers                 | https://t.me/cc32d9                                          |
| EOS USA       | [https://www.eosusa.io/hosting/](https://www.eosusa.io/hosting/)               | FAH, SH, AA                | Dedicated Servers                            | https://www.eosusa.io/hosting/, Telegram ID: @EOSUSA_Michael |
| WAX Sweden    | [https://waxsweden.org/commercial-api/](https://waxsweden.org/commercial-api/) | SH, Contract Notifications | Dedicated Servers                            | https://t.me/eossweden                                       |
| EOSphere      | [https://eosphere.io/services/](https://eosphere.io/services/)                 | FAH, SH, AA                | Dedicated Servers, API Metered Subscriptions | info@eosphere.io, Telegram ID: @rossco99                     |

## Common Service Categories

- chain RPC
- Hyperion / history APIs
- state-history services
- AtomicAssets or market APIs
- lighter managed read endpoints

### Service Type Abbreviations

- `FAH`: Full Archive History
- `PAH`: Partial Archive History
- `SH`: State History nodes
- `AA`: AtomicAssets / market API nodes
- `LA`: Light API nodes

## Use This Section Together With

- [Choosing an Endpoint](/build/endpoints/choosing-an-endpoint)
- [Rate Limits and Failover](/build/endpoints/rate-limits-and-failover)

## Infra Community Link

If you want to communicate with infrastructure service providers, use:

- [https://t.me/waxapi](https://t.me/waxapi)
