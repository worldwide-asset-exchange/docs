---
title: Rate Limits and Failover
---

# Rate Limits and Failover

Endpoint failures are normal production events. Design for them upfront.

## Rate-Limit Planning

- assume public infrastructure has limits
- avoid bursty polling patterns when indexed alternatives exist
- separate heavy history workloads from simple chain reads where possible

## Failover Planning

- keep more than one endpoint available for critical workloads
- decide which calls can be retried automatically
- surface degraded service clearly in your app
- log endpoint-specific failures so you can spot provider issues quickly

## Avoid These Assumptions

- that all providers expose the same features
- that every public endpoint is suitable for production traffic
- that write and read traffic should always use the same backend
