---
title: WAX Infrastructure Guides
order: 3
---

# Guides for Node and API Operators

WAX infrastructure can be split into a few broad service types:

- chain nodes for peer and API workloads
- state-history nodes for downstream consumers
- indexed history stacks such as Hyperion
- asset-oriented APIs for NFT and marketplace workloads
- supporting services such as load balancers, routing, storage, and monitoring

## Start With

- [Set Up a Mainnet Node](/operate/wax-infrastructure/wax-mainnet-node)
- [Set Up a Testnet Node](/operate/wax-infrastructure/wax-testnet-node)
- [Set Up a Testnet Producer Node](/operate/wax-infrastructure/wax-testnet-block-producer)
- [Set Up a State History Node](/operate/wax-infrastructure/wax-mainnet-ship-node)
- [Set Up Full or Partial History with Hyperion](/operate/wax-infrastructure/hyperion-guide)
- [Set Up an Atomic API Node](/operate/wax-infrastructure/atomic-api-guide)

## Operational Focus Areas

- performance and storage planning
- query routing and load balancing
- snapshot management and recovery
- endpoint abuse mitigation
- service-specific scaling

## More Guides

- [Optimise Disk Utilisation with ZFS Deduplication](/operate/wax-infrastructure/wax-optimise-disk-utilisation-zfs-dedup)
- [Securely Peer with WireGuard](/operate/wax-infrastructure/wax-securely-peer-with-wireguard)
- [Route API Queries](/operate/wax-infrastructure/wax-route-specific-api-queries)
- [Websocket Support on a Load Balancer](/operate/wax-infrastructure/wax-websocket-load-balancer)
- [API Full or Partial Archive Nodes](/operate/wax-infrastructure/api-archive-guide)
- [Creating a WAX Price Oracle Service](/operate/wax-infrastructure/creating-a-wax-price-oracle-service-bash-python)

If you prefer managed infrastructure instead of self-hosting, see [WAX API Services](/build/wax-api-services).
