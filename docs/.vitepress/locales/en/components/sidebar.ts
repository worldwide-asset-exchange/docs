export default [
    {
        text: 'Learn',
        items: [
            {
                text: 'Overview',
                link: '/learn/',
            },
            {
                text: 'About WAX',
                link: '/learn/about-wax/',
                collapsed: true,
                items: [
                    {
                        text: 'What is WAX?',
                        link: '/learn/about-wax/what-is-wax',
                    },
                    {
                        text: 'Why WAX?',
                        link: '/learn/about-wax/why-wax',
                    },
                    {
                        text: 'What is WAXP Token?',
                        link: '/learn/about-wax/what-is-waxp-token',
                    },
                    {
                        text: 'How does WAX Work?',
                        link: '/learn/about-wax/wax-consensus',
                    },
                    {
                        text: 'WAX Interoperability',
                        link: '/learn/about-wax/wax-interoperability',
                    },
                ],
            },
            {
                text: 'Getting Started',
                link: '/learn/getting-started/',
                collapsed: true,
                items: [
                    { text: 'Wallets', link: '/learn/getting-started/wallets' },
                    {
                        text: 'Choosing a Wallet',
                        link: '/learn/getting-started/choosing-a-wallet',
                    },
                    {
                        text: 'My Cloud Wallet',
                        link: '/learn/getting-started/mycloudwallet/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Migration Guide',
                                link: '/learn/getting-started/mycloudwallet/migration',
                            },
                            {
                                text: 'Troubleshooting',
                                link: '/learn/getting-started/mycloudwallet/troubleshooting',
                            },
                            {
                                text: 'Claim Account',
                                link: '/learn/getting-started/mycloudwallet/claim-account',
                            },
                        ],
                    },
                    {
                        text: 'Anchor',
                        link: '/learn/getting-started/anchor/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Importing Accounts',
                                link: '/learn/getting-started/anchor/importing-accounts',
                            },
                        ],
                    },
                    {
                        text: 'Security and Recovery',
                        link: '/learn/getting-started/security-and-recovery',
                    },
                    {
                        text: 'Get WAXP and Fund an Account',
                        link: '/learn/getting-started/get-waxp-and-fund-account',
                    },
                    {
                        text: 'PowerUp and Resources',
                        link: '/learn/getting-started/powerup-and-resources',
                    },
                    {
                        text: 'Staking and Governance',
                        link: '/learn/getting-started/staking-and-governance',
                    },
                    {
                        text: 'Marketplaces',
                        link: '/learn/getting-started/marketplaces',
                    },
                ],
            },
            {
                text: 'Ecosystem',
                link: '/learn/ecosystem/',
                collapsed: true,
            },
        ],
    },
    {
        text: 'Build',
        items: [
            {
                text: 'Overview',
                link: '/build/',
            },
            {
                text: 'Core Concepts',
                link: '/build/core-concepts/',
                collapsed: true,
                items: [
                    {
                        text: 'Accounts',
                        link: '/build/core-concepts/accounts',
                    },
                    {
                        text: 'Permissions',
                        link: '/build/core-concepts/permissions',
                    },
                    {
                        text: 'Resources',
                        link: '/build/core-concepts/resources',
                    },
                    {
                        text: 'Transactions',
                        link: '/build/core-concepts/transactions',
                    },
                    {
                        text: 'Smart Contracts',
                        link: '/build/core-concepts/smart-contracts',
                    },
                    {
                        text: 'Tokens',
                        link: '/build/core-concepts/tokens',
                    },
                    {
                        text: 'NFTs',
                        link: '/build/core-concepts/nfts',
                    },
                ],
            },
            {
                text: 'Quick Start',
                link: '/build/quick-start/',
                collapsed: true,
                items: [
                    {
                        text: 'Set Up a Local dApp Environment',
                        link: '/build/dapp-development/setup-local-dapp-environment/',
                    },
                    {
                        text: 'WAX Blockchain Setup',
                        link: '/build/dapp-development/wax-blockchain-setup/',
                    },
                    {
                        text: 'Docker Setup',
                        link: '/build/dapp-development/docker-setup/',
                    },
                    {
                        text: 'Installation',
                        link: '/build/quick-start/installation',
                    },
                    {
                        text: 'Supported Operating Systems',
                        link: '/build/quick-start/supported-operating-systems',
                    },
                    {
                        text: 'Blockchain Tools',
                        link: '/build/tools/blockchain_tools',
                    },
                ],
            },
            {
                text: 'Developing Smart Contracts',
                link: '/build/developing-smart-contracts/',
                collapsed: true,
                items: [
                    {
                        text: 'CDT',
                        link: '/build/developing-smart-contracts/cdt',
                    },
                    {
                        text: 'Ricardian Contracts',
                        link: '/build/developing-smart-contracts/ricardian-contracts',
                    },
                    {
                        text: 'Ricardian Clauses',
                        link: '/build/developing-smart-contracts/ricardian-clauses',
                    },
                    {
                        text: 'Custom Permissions',
                        link: '/build/developing-smart-contracts/custom-permissions',
                    },
                    {
                        text: 'Install WAX-CDT',
                        link: '/build/dapp-development/wax-cdt/cdt_install',
                    },
                    {
                        text: 'Sample Contracts',
                        link: '/build/dapp-development/wax-cdt/cdt_use',
                    },
                    {
                        text: 'Build Tools',
                        link: '/build/dapp-development/wax-cdt/cdt_cpp',
                    },
                    {
                        text: 'Deploy with WAX-CDT',
                        link: '/build/dapp-development/deploy-dapp-on-wax/deploy_source',
                    },
                    {
                        text: 'WAX-CDT Options',
                        link: '/build/tools/cdt_options',
                    },
                    {
                        text: 'Legacy Ricardian Contracts Guide',
                        link: '/build/tools/ricardian_contract',
                    },
                ],
            },
            {
                text: 'Developing Apps',
                link: '/build/developing-apps/',
                collapsed: true,
                items: [
                    {
                        text: 'SDKs',
                        link: '/build/developing-apps/sdks/',
                        collapsed: true,
                        items: [
                            {
                                text: 'WharfKit',
                                link: '/build/developing-apps/sdks/wharfkit/',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'Getting Started',
                                        link: '/build/developing-apps/sdks/wharfkit/getting-started',
                                    },
                                    {
                                        text: 'Session Management',
                                        link: '/build/developing-apps/sdks/wharfkit/session-management',
                                    },
                                    {
                                        text: 'Transactions and Signing',
                                        link: '/build/developing-apps/sdks/wharfkit/transactions-and-signing',
                                    },
                                    {
                                        text: 'Wallet Support',
                                        link: '/build/developing-apps/sdks/wharfkit/wallet-support',
                                    },
                                    {
                                        text: 'Network Configuration',
                                        link: '/build/developing-apps/sdks/wharfkit/network-configuration',
                                    },
                                ],
                            },
                            {
                                text: 'Unity',
                                link: '/build/developing-apps/sdks/unity/',
                            },
                        ],
                    },
                    {
                        text: 'Signing and User Experience',
                        link: '/build/developing-apps/signing-and-user-experience',
                    },
                    {
                        text: 'Migrating from WaxJS',
                        link: '/build/developing-apps/migrating-from-waxjs',
                    },
                    {
                        text: 'WaxJS Archive',
                        link: '/build/cloud-wallet/waxjs/',
                    },
                ],
            },
            {
                text: 'Tutorials',
                link: '/build/tutorials/',
                collapsed: true,
                items: [
                    {
                        text: 'Tic-Tac-Toe Game',
                        link: '/build/tutorials/tic-tac-toe-game/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Game Client',
                                link: '/build/tutorials/tic-tac-toe-game/client',
                            },
                            {
                                text: 'Smart Contract',
                                link: '/build/tutorials/tic-tac-toe-game/smart-contract',
                            },
                        ],
                    },
                    {
                        text: 'How to Create a Farming Game',
                        link: '/build/tutorials/howto-create_farming_game/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Part 1',
                                link: '/build/tutorials/howto-create_farming_game/Part1',
                            },
                            {
                                text: 'Part 2',
                                link: '/build/tutorials/howto-create_farming_game/Part2',
                            },
                            {
                                text: 'Part 3',
                                link: '/build/tutorials/howto-create_farming_game/Part3',
                            },
                            {
                                text: 'Part 4',
                                link: '/build/tutorials/howto-create_farming_game/Part4',
                            },
                            {
                                text: 'Part 5',
                                link: '/build/tutorials/howto-create_farming_game/Part5',
                            },
                            {
                                text: 'Part 6',
                                link: '/build/tutorials/howto-create_farming_game/Part6',
                            },
                            {
                                text: 'Part 7',
                                link: '/build/tutorials/howto-create_farming_game/Part7',
                            },
                            {
                                text: 'Part 8',
                                link: '/build/tutorials/howto-create_farming_game/Part8',
                            },
                            {
                                text: 'Part 9',
                                link: '/build/tutorials/howto-create_farming_game/Part9',
                            },
                            {
                                text: 'Part 10',
                                link: '/build/tutorials/howto-create_farming_game/Part10',
                            },
                            {
                                text: 'Part 11',
                                link: '/build/tutorials/howto-create_farming_game/Part11',
                            },
                            {
                                text: 'Part 12',
                                link: '/build/tutorials/howto-create_farming_game/Part12',
                            },
                            {
                                text: 'Part 13',
                                link: '/build/tutorials/howto-create_farming_game/Part13',
                            },
                            {
                                text: 'Part 14',
                                link: '/build/tutorials/howto-create_farming_game/Part14',
                            },
                            {
                                text: 'Part 15',
                                link: '/build/tutorials/howto-create_farming_game/Part15',
                            },
                            {
                                text: 'Part 16',
                                link: '/build/tutorials/howto-create_farming_game/Part16',
                            },
                            {
                                text: 'Part 17',
                                link: '/build/tutorials/howto-create_farming_game/Part17',
                            },
                            {
                                text: 'Part 18',
                                link: '/build/tutorials/howto-create_farming_game/Part18',
                            },
                        ],
                    },
                    {
                        text: 'AtomicAssets Guide',
                        link: '/build/tutorials/howto_atomicassets/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Collection Structure',
                                link: '/build/tutorials/howto_atomicassets/collection_struct',
                            },
                            {
                                text: 'Collections',
                                link: '/build/tutorials/howto_atomicassets/collection_js',
                            },
                            {
                                text: 'Schemas',
                                link: '/build/tutorials/howto_atomicassets/schemas_js',
                            },
                            {
                                text: 'Templates',
                                link: '/build/tutorials/howto_atomicassets/templates_js',
                            },
                            {
                                text: 'Mint NFT',
                                link: '/build/tutorials/howto_atomicassets/mint_nft',
                            },
                            {
                                text: 'Transfer NFT',
                                link: '/build/tutorials/howto_atomicassets/transfer_nft',
                            },
                            {
                                text: 'Mutable Data',
                                link: '/build/tutorials/howto_atomicassets/mutabledata',
                            },
                        ],
                    },
                    {
                        text: 'WAX RNG',
                        link: '/build/tutorials/wax-rng/',
                    },
                    {
                        text: 'Create RNG Contract',
                        link: '/build/tutorials/create-wax-rng-smart-contract/',
                        collapsed: true,
                        items: [
                            {
                                text: 'RNG Basics',
                                link: '/build/tutorials/create-wax-rng-smart-contract/rng_basics',
                            },
                            {
                                text: 'Calling RNG Contract',
                                link: '/build/tutorials/create-wax-rng-smart-contract/rng_sample',
                            },
                            {
                                text: 'Test Your RNG Contract',
                                link: '/build/tutorials/create-wax-rng-smart-contract/rng_test',
                            },
                            {
                                text: 'Deploy Your Smart Contract',
                                link: '/build/tutorials/create-wax-rng-smart-contract/rng_deploy',
                            },
                        ],
                    },
                    {
                        text: 'WharfKit Tutorial',
                        link: '/build/tutorials/wharfkit/',
                    },
                    {
                        text: 'Create/Issue a Fungible Token',
                        link: '/build/tutorials/create-issue-token/',
                    },
                    {
                        text: 'Server Side Auth',
                        link: '/build/tutorials/server-side-verification/',
                    },
                    {
                        text: 'How to Airdrop Tokens and NFTs',
                        link: '/build/tutorials/howto_airdrop',
                    },
                ],
            },
            {
                text: 'Oracles',
                link: '/build/oracles/',
                collapsed: true,
            },
            {
                text: 'API Reference',
                link: '/build/api-reference/',
                collapsed: true,
                items: [
                    { text: 'Chain API', link: '/apis/chain-api.htm' },
                    { text: 'AtomicAssets API', link: '/apis/atomic-api.htm' },
                    {
                        text: 'Hyperion History API',
                        link: '/build/api-reference/hyperion-history-api',
                    },
                    {
                        text: 'Light API',
                        link: '/build/api-reference/light-api',
                    },
                ],
            },
            {
                text: 'Endpoints',
                link: '/build/endpoints/',
                collapsed: true,
                items: [
                    {
                        text: 'Choosing an Endpoint',
                        link: '/build/endpoints/choosing-an-endpoint',
                    },
                    {
                        text: 'Rate Limits and Failover',
                        link: '/build/endpoints/rate-limits-and-failover',
                    },
                    {
                        text: 'Reference Architectures',
                        link: '/build/endpoints/reference-architectures',
                    },
                ],
            },
            {
                text: 'WAX API Services',
                link: '/build/wax-api-services/',
                collapsed: true,
            },
            {
                text: 'Troubleshooting',
                link: '/build/troubleshooting/',
                collapsed: true,
                items: [
                    {
                        text: 'Wallet and Session Issues',
                        link: '/build/troubleshooting/wallet-and-session-issues',
                    },
                    {
                        text: 'Network and Endpoints',
                        link: '/build/troubleshooting/network-and-endpoints',
                    },
                    {
                        text: 'Contract Deploy and ABI',
                        link: '/build/troubleshooting/contract-deploy-and-abi',
                    },
                    {
                        text: 'cleos and keosd',
                        link: '/build/troubleshooting/cleos-and-keosd',
                    },
                ],
            },
        ],
    },
    {
        text: 'Create',
        items: [
            {
                text: 'Overview',
                link: '/create/',
            },
            {
                text: 'Tokens',
                link: '/create/tokens/',
                collapsed: true,
            },
            {
                text: 'NFTs',
                link: '/create/nfts/',
                collapsed: true,
            },
            {
                text: 'Tools and Services',
                link: '/create/tools-and-services/',
                collapsed: true,
            },
            {
                text: 'WAX Labs',
                link: '/create/wax-labs/',
                collapsed: true,
                items: [
                    {
                        text: 'How to Submit a Proposal',
                        link: '/create/wax-labs/how-to-submit',
                    },
                ],
            },
            {
                text: 'Community',
                link: '/create/community/',
                collapsed: true,
            },
        ],
    },
    {
        text: 'Operate',
        items: [
            {
                text: 'Overview',
                link: '/operate/',
            },
            {
                text: 'Basics',
                link: '/operate/basics/',
                collapsed: true,
                items: [
                    {
                        text: 'chains.json',
                        link: '/operate/wax-bp/chains-json',
                    },
                    {
                        text: 'bp.json',
                        link: '/operate/wax-bp/bp-json',
                    },
                ],
            },
            {
                text: 'Leap',
                link: '/operate/leap/',
                collapsed: true,
                items: [
                    {
                        text: 'nodeos',
                        link: '/operate/leap/nodeos',
                    },
                    {
                        text: 'cleos',
                        link: '/operate/leap/cleos',
                    },
                    {
                        text: 'keosd',
                        link: '/operate/leap/keosd',
                    },
                ],
            },
            {
                text: 'Hyperion History API',
                link: '/operate/wax-hyperion/',
                collapsed: true,
                items: [
                    {
                        text: 'Introduction',
                        link: '/operate/wax-hyperion/wax-intro-to-hyperion-full-history',
                    },
                    {
                        text: 'Hyperion Components',
                        link: '/operate/wax-hyperion/wax-build-hyperion-software-components',
                    },
                    {
                        text: 'Configure Hyperion Components',
                        link: '/operate/wax-hyperion/wax-config-hyperion-software-components',
                    },
                    {
                        text: 'Running Hyperion',
                        link: '/operate/wax-hyperion/wax-running-hyperion',
                    },
                    {
                        text: 'Set Up Hyperion Cluster',
                        link: '/operate/wax-hyperion/wax-clustering-elasticsearch-for-hyperion',
                    },
                    {
                        text: 'Rectify Missing Blocks',
                        link: '/operate/wax-hyperion/wax-rectify-missing-blocks-in-hyperion',
                    },
                    {
                        text: 'History Indexer Scaling',
                        link: '/operate/wax-hyperion/wax-hyperion-indexer-scaling',
                    },
                    {
                        text: 'Streaming with a Load Balancer',
                        link: '/operate/wax-hyperion/wax-hyperion-streaming-load-balancer',
                    },
                    {
                        text: 'Repair Indexed Data',
                        link: '/operate/wax-hyperion/wax-hyperion-repair-indexed-data',
                    },
                    {
                        text: 'Using Data Tiers',
                        link: '/operate/wax-hyperion/wax-hyperion-data-tiers',
                    },
                ],
            },
            {
                text: 'Atomic Assets API',
                link: '/operate/atomic-assets/',
                collapsed: true,
                items: [
                    {
                        text: 'Set Up a WAX Atomic API Node',
                        link: '/operate/atomic-assets/setup-wax-atomic-api-node',
                    },
                    {
                        text: 'Optimise and Restore a WAX Atomic API Node',
                        link: '/operate/atomic-assets/optimise-restore-wax-atomic-api-node',
                    },
                ],
            },
            {
                text: 'Light API',
                link: '/operate/light-api/',
                collapsed: true,
            },
            {
                text: 'Guides',
                link: '/operate/wax-infrastructure/',
                collapsed: true,
                items: [
                    {
                        text: 'Set Up a Testnet Node',
                        link: '/operate/wax-infrastructure/wax-testnet-node',
                    },
                    {
                        text: 'Set Up a Mainnet Node',
                        link: '/operate/wax-infrastructure/wax-mainnet-node',
                    },
                    {
                        text: 'Set Up a Testnet Producer Node',
                        link: '/operate/wax-infrastructure/wax-testnet-block-producer',
                    },
                    {
                        text: 'Set Up a State History Node',
                        link: '/operate/wax-infrastructure/wax-mainnet-ship-node',
                    },
                    {
                        text: 'Using Snapshots',
                        link: '/operate/wax-infrastructure/wax-snapshots',
                    },
                    {
                        text: 'Set Up a Load Balancer',
                        link: '/operate/wax-infrastructure/wax-mainnet-node-load-balancer',
                    },
                    {
                        text: 'Visualise Load Balancer Metrics',
                        link: '/operate/wax-infrastructure/wax-visualise-load-balancer-metrics',
                    },
                    {
                        text: 'Mitigate API Abuse',
                        link: '/operate/wax-infrastructure/wax-mainnet-node-mitigate-abuse',
                    },
                    {
                        text: 'WAX Files and Folders',
                        link: '/operate/wax-infrastructure/working-with-wax-software-files',
                    },
                    {
                        text: 'Optimise RAM and Disk',
                        link: '/operate/wax-infrastructure/wax-ram-disk-utilisation',
                    },
                    {
                        text: 'Custom Permissions',
                        link: '/operate/wax-infrastructure/wax-account-custom-permissions',
                    },
                    {
                        text: 'Optimise Disk Utilisation with ZFS Deduplication',
                        link: '/operate/wax-infrastructure/wax-optimise-disk-utilisation-zfs-dedup',
                    },
                    {
                        text: 'Route API Queries',
                        link: '/operate/wax-infrastructure/wax-route-specific-api-queries',
                    },
                    {
                        text: 'Websocket Support on a Load Balancer',
                        link: '/operate/wax-infrastructure/wax-websocket-load-balancer',
                    },
                    {
                        text: 'Set Up Full or Partial History with Hyperion',
                        link: '/operate/wax-infrastructure/hyperion-guide',
                    },
                    {
                        text: 'Securely Peer with WireGuard',
                        link: '/operate/wax-infrastructure/wax-securely-peer-with-wireguard',
                    },
                    {
                        text: 'Automate WAX Snapshots',
                        link: '/operate/wax-infrastructure/wax-automate-snapshots',
                    },
                    {
                        text: 'Managing WAX Blocks with Strides',
                        link: '/operate/wax-infrastructure/wax-managing-blocks-with-strides',
                    },
                    {
                        text: 'Implement TCP BBR',
                        link: '/operate/wax-infrastructure/wax-implement-tcp-bbr',
                    },
                    {
                        text: 'Creating a WAX Price Oracle Service',
                        link: '/operate/wax-infrastructure/creating-a-wax-price-oracle-service-bash-python',
                    },
                    {
                        text: 'Monitor and Unregister a Producer',
                        link: '/operate/wax-infrastructure/monitor-and-unregister-wax-producer-with-systemd-while-you-sleep',
                    },
                ],
            },
        ],
    },
    {
        text: 'Improve These Docs',
        link: '/docs',
        collapsed: true,
    },
];
