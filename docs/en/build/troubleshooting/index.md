---
title: Troubleshooting
order: 200
---

# Troubleshooting

This section collects common WAX builder failures across wallets, sessions, endpoints, contract deployment, and command-line tooling.

## Topics

- [Wallet and Session Issues](/build/troubleshooting/wallet-and-session-issues)
- [Network and Endpoints](/build/troubleshooting/network-and-endpoints)
- [Contract Deploy and ABI](/build/troubleshooting/contract-deploy-and-abi)
- [cleos and keosd](/build/troubleshooting/cleos-and-keosd)

## Legacy Build Issue

The older Ubuntu 18.04 build note is still preserved below for reference.

### Build Error in Function `fork_once_func'

**Error Description:** WAX Source Code Repository Build Issue

After running `sudo ./wax_install.sh` to build the WAX Source Code Repository on **Ubuntu 18.04**, the command line reports an error "In function 'fork_once_func'" (around [90%]).

### Fix Summary

The legacy fix is to apply the FC patch in `patches/fc` and then resume the build from the `build` directory.
