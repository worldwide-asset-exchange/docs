---
title: Network and Endpoints
---

# Network and Endpoints

Many WAX app issues are endpoint issues wearing a different label.

## Symptoms

- intermittent query failures
- signing succeeds but state appears stale
- history lookups fail while chain reads work
- rate-limit errors under modest traffic

## Checks

- confirm you are using the right endpoint type for the workload
- check whether the issue affects one provider or all of them
- separate chain RPC problems from history/indexing problems
- test with a fallback endpoint before blaming the app layer
