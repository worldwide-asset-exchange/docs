---
title: Oracles
---

# Oracles

Oracle-style services bridge off-chain data and on-chain actions. On WAX, they are usually built as narrowly scoped services with clear operational and signing boundaries.

## DelphiOracle on WAX

The main oracle pattern builders are most likely to encounter on WAX is DelphiOracle.

DelphiOracle is an open-source oracle system used on Antelope-based chains to publish off-chain price and market data on-chain. On WAX, it is relevant anywhere an application or service depends on externally sourced values being written to chain in a structured way.

Primary source:

- [DelphiOracle repository](https://github.com/eostitan/delphioracle)

## Existing Guide

- [Creating a WAX Price Oracle Service](/operate/wax-infrastructure/creating-a-wax-price-oracle-service-bash-python)

## What to Think About

- data source quality
- endpoint redundancy
- signing and key isolation
- failure alerting
- rate limiting and retry behavior
- contract and write-frequency expectations
- how downstream apps will validate or consume oracle values
