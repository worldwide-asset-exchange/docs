---
title: Core Concepts
---

# Core Concepts of the WAX Blockchain

Understanding these fundamental concepts is essential for developing on the WAX blockchain. This guide covers the core building blocks that make WAX function.

## Accounts

Accounts are the fundamental identity system on WAX. Every account has:

- **Account Name**: A unique 12-character identifier (e.g., `myaccount123`)
- **Public/Private Key Pairs**: Cryptographic keys for authentication and signing
- **Permissions**: Hierarchical permission system for security
- **Resources**: CPU, NET, and RAM allocations

### Account Structure

```
Account Name: myaccount123
├── Owner Permission (highest authority)
├── Active Permission (daily operations)
└── Custom Permissions (specific actions)
```

### Account Name Validation

Account names follow this regex pattern:

```
(^[a-z1-5.]{1,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)
```

### Key Features

- **Human-readable names**: Unlike Ethereum addresses, WAX uses readable account names
- **Permission system**: Granular control over account actions
- **Resource management**: Each account manages its own CPU, NET, and RAM
- **Multi-signature support**: Require multiple signatures for sensitive operations

## Resources

WAX uses a unique resource model to prevent spam and ensure network stability:

### CPU
- **Purpose**: Processing power for smart contract execution
- **Acquisition**: Rent via PowerUp or stake WAXP tokens
- **Usage**: Consumed when executing transactions
- **Recovery**: Automatically regenerates over time

### NET
- **Purpose**: Bandwidth for transaction data transmission
- **Acquisition**: Rent via PowerUp or stake WAXP tokens
- **Usage**: Consumed based on transaction size
- **Recovery**: Automatically regenerates over time

### RAM
- **Purpose**: Storage for account data and smart contract state
- **Acquisition**: Purchase with WAXP tokens (not rentable)
- **Usage**: Permanent storage for account data
- **Recovery**: Must be sold back to reclaim WAXP

### Resource Management Strategies

**PowerUp (Recommended)**
- Rent CPU/NET for 1-day periods
- Pay only for what you use
- Instant access without staking

**Staking**
- Stake WAXP for long-term resource allocation
- Earn voter rewards
- Predictable resource availability

## Transactions

Transactions are the fundamental operations on WAX:

### Transaction Structure

```json
{
  "expiration": "2024-01-01T12:00:00.000Z",
  "ref_block_num": 12345,
  "ref_block_prefix": 67890,
  "max_net_usage_words": 0,
  "max_cpu_usage_ms": 0,
  "delay_sec": 0,
  "context_free_actions": [],
  "actions": [
    {
      "account": "eosio.token",
      "name": "transfer",
      "authorization": [{"actor": "myaccount123", "permission": "active"}],
      "data": {
        "from": "myaccount123",
        "to": "recipient123",
        "quantity": "1.00000000 WAXP",
        "memo": "Payment"
      }
    }
  ],
  "transaction_extensions": [],
  "signatures": ["SIG_K1_..."],
  "context_free_data": []
}
```

### Actions

Actions are the fundamental operations within transactions. Each action specifies:

- **Account**: The contract account to execute the action
- **Name**: The specific action to perform
- **Authorization**: Required permissions to execute the action
- **Data**: Parameters passed to the action

### Multiple Actions in Transactions

A single transaction can contain multiple actions, allowing for complex operations:

```json
{
  "actions": [
    {
      "account": "eosio.token",
      "name": "transfer",
      "authorization": [{"actor": "alice", "permission": "active"}],
      "data": {
        "from": "alice",
        "to": "bob",
        "quantity": "10.00000000 WAXP",
        "memo": "Payment"
      }
    },
    {
      "account": "mycontract",
      "name": "updatebalance",
      "authorization": [{"actor": "alice", "permission": "active"}],
      "data": {
        "user": "bob",
        "amount": 10
      }
    }
  ]
}
```

This transaction performs two actions atomically:
1. Transfer 10 WAXP from Alice to Bob
2. Update Bob's balance in a custom contract

If any action fails, the entire transaction is rolled back, ensuring data consistency.

## Contracts

Smart contracts are self-executing programs that run on the WAX blockchain:

### Contract Structure

```cpp
#include <eosio/eosio.hpp>

class [[eosio::contract]] mycontract : public eosio::contract {
public:
    using contract::contract;
    
    // Table definition
    struct [[eosio::table]] user {
        eosio::name account;
        uint64_t balance;
        uint64_t primary_key() const { return account.value; }
    };
    typedef eosio::multi_index<"users"_n, user> users_table;
    
    [[eosio::action]]
    void setbalance(eosio::name user, uint64_t balance) {
        users_table users(get_self(), get_self().value);
        auto itr = users.find(user.value);
        if (itr == users.end()) {
            users.emplace(get_self(), [&](auto& row) {
                row.account = user;
                row.balance = balance;
            });
        } else {
            users.modify(itr, get_self(), [&](auto& row) {
                row.balance = balance;
            });
        }
    }
};
```

### Key Features

- **C++ Based**: Written in C++ using the WAX CDT (officially supported)
- **Account-based**: Each contract has its own account
- **Action-based**: Functions are called "actions"
- **State Storage**: Contracts can store persistent data
- **Permission System**: Actions require proper authorization

### Language Support

While C++ is the officially supported language for WAX smart contracts, there are community-led initiatives for extending language support:

- **[AssemblyScript](https://github.com/uuosio/ascdk)**
- **[Rust](https://github.com/uuosio/rscdk)**
- **[Golang](https://github.com/uuosio/gscdk)**
- **[Python](https://github.com/uuosio/pscdk)**

These alternative languages provide different development experiences and may be suitable for specific use cases, though C++ remains the most mature and fully-featured option for WAX development.

### Contract Development

1. **Write Contract**: Create C++ smart contract code
2. **Compile**: Use WAX CDT to compile to WebAssembly
3. **Deploy**: Upload contract to blockchain
4. **Test**: Execute actions and verify behavior
5. **Maintain**: Update contract as needed

### Common Contract Patterns

- **Token Contracts**: Create and manage custom tokens
- **Game Contracts**: Implement game logic and mechanics
- **DeFi Contracts**: Facilitate decentralized finance operations

## Tokens

Tokens are digital assets on the WAX blockchain:

### Native Token: WAXP

- **Symbol**: WAXP
- **Precision**: 8 decimal places
- **Supply**: 5% variable nflation for block producers and viter rewards
- **Uses**: Transaction fees, staking, governance

### Custom Tokens

Developers can create custom tokens with:

- **Unique Symbol**: Custom token symbol (e.g., "GAME", "NFT")
- **Precision**: Configurable decimal places
- **Supply**: Fixed or inflatable supply
- **Features**: Custom transfer logic, burning, minting

### Token Standards

- **EOSIO Token Standard**: Basic fungible tokens
- **AtomicAssets**: NFT standard for digital collectibles
- **SimpleAssets**: Alternative NFT standard
