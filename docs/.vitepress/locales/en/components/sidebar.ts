export default [
    {
        text: 'Learn',
        items: [
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
                ],
            },
            {
                text: 'WAX Ecosystem',
                link: '/learn/ecosystem/',
                collapsed: true,
            },
        ],
    },
    {
        text: 'Build',
        items: [
            {
                text: 'Core Concepts',
                link: '/build/core-concepts/',
                collapsed: true,
            },
            {
                text: 'dApp Development',
                link: '/build/dapp-development/',
                collapsed: true,
                items: [
                    {
                        text: 'Setup local Environment',
                        link: '/build/dapp-development/setup-local-dapp-environment/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Start a Local Node',
                                link: '/build/dapp-development/setup-local-dapp-environment/dapp_local',
                            },
                            {
                                text: 'Blockchain Environments',
                                link: '/build/dapp-development/setup-local-dapp-environment/dapp_environments',
                            },
                            {
                                text: 'Create a Wallet',
                                link: '/build/dapp-development/setup-local-dapp-environment/dapp_wallet',
                            },
                            {
                                text: 'Access Local API',
                                link: '/build/dapp-development/setup-local-dapp-environment/dapp_api',
                            },
                        ],
                    },
                    {
                        text: 'Docker Setup',
                        link: '/build/dapp-development/docker-setup/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Run a WAX Container',
                                link: '/build/dapp-development/docker-setup/docker_qstart_getstarted',
                            },
                            {
                                text: 'Run Commands',
                                link: '/build/dapp-development/docker-setup/docker_qstart_use',
                            },
                            {
                                text: 'Manage Container',
                                link: '/build/dapp-development/docker-setup/docker_qstart_manage',
                            },
                        ],
                    },
                    {
                        text: 'WAX Blockchain Setup',
                        link: '/build/dapp-development/wax-blockchain-setup/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Install WAX Blockchain',
                                link: '/build/dapp-development/wax-blockchain-setup/blockchain_install',
                            },
                            {
                                text: 'Uninstall WAX',
                                link: '/build/dapp-development/wax-blockchain-setup/blockchain_uninstall',
                            },
                            {
                                text: 'Verify Your Install',
                                link: '/build/dapp-development/wax-blockchain-setup/blockchain_verify',
                            },
                        ],
                    },
                    {
                        text: 'Smart Contract Development',
                        link: '/build/dapp-development/smart-contract-quickstart/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Smart Contract Basics',
                                link: '/build/dapp-development/smart-contract-quickstart/smart_contract_basics',
                            },
                            {
                                text: 'Create Accounts',
                                link: '/build/dapp-development/smart-contract-quickstart/dapp_account',
                            },
                            {
                                text: 'Create a Smart Contract',
                                link: '/build/dapp-development/smart-contract-quickstart/dapp_hello_world',
                            },
                            {
                                text: 'Deploy to Blockchain',
                                link: '/build/dapp-development/smart-contract-quickstart/dapp_dev_deploy',
                            },
                            {
                                text: 'Custom Permissions',
                                link: '/build/dapp-development/smart-contract-quickstart/custom_permission',
                            },
                        ],
                    },
                    {
                        text: 'WAX CDT',
                        link: '/build/dapp-development/wax-cdt/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Install WAX-CDT',
                                link: '/build/dapp-development/wax-cdt/cdt_install',
                            },
                            {
                                text: 'Uninstall WAX-CDT',
                                link: '/build/dapp-development/wax-cdt/cdt_uninstall',
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
                                text: 'WAX-CDT Options',
                                link: '/build/tools/cdt_options',
                            },
                        ],
                    },
                    {
                        text: 'Deploy on WAX',
                        link: '/build/dapp-development/deploy-dapp-on-wax/',
                        collapsed: true,
                        items: [
                            {
                                text: 'WAX-CDT Deploy',
                                link: '/build/dapp-development/deploy-dapp-on-wax/deploy_source',
                            },
                            {
                                text: 'Docker Deploy',
                                link: '/build/dapp-development/deploy-dapp-on-wax/deploy_docker',
                            },
                            {
                                text: 'Deploy an EOS dApp on WAX',
                                link: '/build/dapp-development/deploy-dapp-on-wax/convert_eos',
                            },
                        ],
                    },
                ],
            },
            {
                text: 'Developing Apps',
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
                            },
                            {
                                text: 'Unity',
                                link: '/build/developing-apps/sdks/unity/',
                            },
                        ],
                    },
                ],
            },
            {
                text: 'My Cloud Wallet',
                collapsed: true,
                items: [
                    {
                        text: 'SDKs',
                        link: '/build/cloud-wallet/sdks/',
                        collapsed: true,
                        items: [
                            {
                                text: 'WharfKit',
                                link: '/build/developing-apps/sdks/wharfkit/',
                            },
                            {
                                text: 'Unity',
                                link: '/build/developing-apps/sdks/unity/',
                            },
                            {
                                text: 'WaxJS (Deprecated)',
                                link: '/build/cloud-wallet/waxjs/',
                                collapsed: true,
                                items: [
                                    {
                                        text: 'WaxJS Quickstart',
                                        link: '/build/cloud-wallet/waxjs/waxjs_qstart',
                                    },
                                    {
                                        text: 'Install WaxJS',
                                        link: '/build/cloud-wallet/waxjs/waxjs_install',
                                    },
                                    {
                                        text: 'Use WaxJS',
                                        link: '/build/cloud-wallet/waxjs/waxjs_use',
                                    },
                                    {
                                        text: 'WaxJS Demo',
                                        link: '/build/cloud-wallet/waxjs/waxjs_demo',
                                    },
                                    {
                                        text: 'Temp Accounts (Retired)',
                                        link: '/build/cloud-wallet/waxjs/waxjs_tempaccounts',
                                    },
                                ],
                            },
                            {
                                text: 'React Native (Retired)',
                                link: '/build/cloud-wallet/sdks/react-native/',
                            },
                        ],
                    },
                    {
                        text: 'boost.wax (Retired)',
                        link: '/build/cloud-wallet/boost-wax',
                        collapsed: true,
                    },
                ],
            },
            {
                text: 'Tutorials',
                link: '/build/tutorials/',
                collapsed: true,
                items: [
                    {
                        text: 'How to create farming game',
                        link: '/build/tutorials/howto-create_farming_game/',
                        collapsed: true,
                        items: [
                            {
                                text: 'How to make a game on WAX. General concepts',
                                link: '/build/tutorials/howto-create_farming_game/Part1',
                            },
                            {
                                text: 'Creating a farmable object or item in AtomicAssets standard',
                                link: '/build/tutorials/howto-create_farming_game/Part2',
                            },
                            {
                                text: 'Farming NFT creation on Atomic Hub',
                                link: '/build/tutorials/howto-create_farming_game/Part3',
                            },
                            {
                                text: 'What are resources and tokens in our game creation process',
                                link: '/build/tutorials/howto-create_farming_game/Part4',
                            },
                            {
                                text: 'NFT Staking',
                                link: '/build/tutorials/howto-create_farming_game/Part5',
                            },
                            {
                                text: 'Types of Farming and farming process',
                                link: '/build/tutorials/howto-create_farming_game/Part6',
                            },
                            {
                                text: 'Creating GUI for WAX game, staking and farming',
                                link: '/build/tutorials/howto-create_farming_game/Part7',
                            },
                            {
                                text: 'Upgrades of game items in WAX games',
                                link: '/build/tutorials/howto-create_farming_game/Part8',
                            },
                            {
                                text: 'Blends of NFTs for WAX games',
                                link: '/build/tutorials/howto-create_farming_game/Part9',
                            },
                            {
                                text: 'Implementing avatars in WAX games',
                                link: '/build/tutorials/howto-create_farming_game/Part10',
                            },
                            {
                                text: 'UI for Blends, upgrades and avatars',
                                link: '/build/tutorials/howto-create_farming_game/Part11',
                            },
                            {
                                text: 'Token and resource swaps',
                                link: '/build/tutorials/howto-create_farming_game/Part12',
                            },
                            {
                                text: 'Token Staking and Voting in games',
                                link: '/build/tutorials/howto-create_farming_game/Part13',
                            },
                            {
                                text: 'Governance in games',
                                link: '/build/tutorials/howto-create_farming_game/Part14',
                            },
                            {
                                text: 'GUI for swaps, staking and governance',
                                link: '/build/tutorials/howto-create_farming_game/Part15',
                            },
                            {
                                text: 'Leaderboards in games',
                                link: '/build/tutorials/howto-create_farming_game/Part16',
                            },
                            {
                                text: 'Quest systems in game',
                                link: '/build/tutorials/howto-create_farming_game/Part17',
                            },
                            {
                                text: 'GUI for quests and leaderboards',
                                link: '/build/tutorials/howto-create_farming_game/Part18',
                            },
                        ],
                    },
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
                        text: 'SimpleAssets Guide',
                        link: '/build/tutorials/howto_simpleassets/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Structure',
                                link: '/build/tutorials/howto_simpleassets/nft_basics',
                            },
                            {
                                text: 'Mint NFT',
                                link: '/build/tutorials/howto_simpleassets/nft_use',
                            },
                            {
                                text: 'Deploy NFT Smart Contract',
                                link: '/build/tutorials/howto_simpleassets/nft_deploy',
                            },
                            {
                                text: 'Test NFT Smart Contract',
                                link: '/build/tutorials/howto_simpleassets/nft_test',
                            },
                        ],
                    },
                    {
                        text: 'WAX RNG',
                        link: '/build/tutorials/wax-rng/',
                        items: ['/build/tutorials/wax-rng/rng_install'],
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
                        text: 'WharfKit',
                        link: '/build/tutorials/wharfkit/',
                        collapsed: true,
                        items: [
                            {
                                text: 'Wharfkit in React',
                                link: '/build/tutorials/wharfkit/howto_react',
                            },
                            {
                                text: 'Wharfkit Multi-Session',
                                link: '/build/tutorials/wharfkit/multisession',
                            },
                        ],
                    },
                    {
                        text: 'SS verification',
                        link: '/build/tutorials/server-side-verification',
                    },
                    {
                        text: 'How To Explore WAX Blockchain',
                        link: '/build/tutorials/howto_blockexplorer',
                    },
                    {
                        text: 'How to Airdrop Tokens and NFTs',
                        link: '/build/tutorials/howto_airdrop',
                    },
                ],
            },
            {
                text: 'Tools',
                link: '/build/tools/',
                collapsed: true,
                items: [
                    {
                        text: 'Blockchain Tools',
                        link: '/build/tools/blockchain_tools',
                    },
                    { text: 'Supported OS', link: '/build/tools/os' },
                    {
                        text: 'WAX-CDT Options',
                        link: '/build/tools/cdt_options',
                    },
                    {
                        text: 'Ricardian Contracts',
                        link: '/build/tools/ricardian_contract',
                    },
                    {
                        text: 'Ricardian Clauses',
                        link: '/build/tools/ricardian_clause',
                    },
                ],
            },
            {
                text: 'API Reference',
                link: '/build/api-reference/',
                collapsed: true,
                items: [
                    { text: 'Chain API', link: '/apis/chain-api.htm' },
                    { text: 'AtomicAssets API', link: '/apis/atomic-api.htm' },
                    { text: 'CDT', link: '/build/api-reference/cdt_api' },
                ],
            },
            {
                text: 'WAX API Services',
                link: '/build/wax-api-services',
                collapsed: true,
            },
        ],
    },
    {
        text: 'Create',
        items: [
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
                link: '/create/community',
                collapsed: true,
            },
        ],
    },
    {
        text: 'Operate',
        items: [
            {
                text: 'Basics',
                link: '/operate/wax-bp/',
                collapsed: true,
                items: [
                    {
                        text: 'chains.json',
                        link: '/operate/wax-bp/chains-json',
                    },
                    { text: 'bp.json', link: '/operate/wax-bp/bp-json' },
                ],
            },
            {
                text: 'AtomicAssets API',
                link: '/operate/atomic-assets/',
                collapsed: true,
                items: [
                    {
                        text: 'Setup',
                        link: '/operate/atomic-assets/setup-wax-atomic-api-node',
                    },
                    {
                        text: 'Optimize',
                        link: '/operate/atomic-assets/optimise-restore-wax-atomic-api-node',
                    },
                ],
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
                        text: 'Set Up a Testnet Producer Node',
                        link: '/operate/wax-infrastructure/wax-testnet-block-producer',
                    },
                    {
                        text: 'Set Up a Mainnet Node',
                        link: '/operate/wax-infrastructure/wax-mainnet-node',
                    },
                    {
                        text: 'Set Up a State-Hisory Node',
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
                        text: 'Visualise Metrics from a WAX Load Balancer',
                        link: '/operate/wax-infrastructure/wax-visualise-load-balancer-metrics',
                    },
                    {
                        text: 'How To Mitigate API Abuse',
                        link: '/operate/wax-infrastructure/wax-mainnet-node-mitigate-abuse',
                    },
                    {
                        text: 'WAX Files and Folders',
                        link: '/operate/wax-infrastructure/working-with-wax-software-files',
                    },
                    {
                        text: 'Optimising RAM and Disk',
                        link: '/operate/wax-infrastructure/wax-ram-disk-utilisation',
                    },
                    {
                        text: 'Optimise Disk Utilisation with ZFS Deduplication',
                        link: '/operate/wax-infrastructure/wax-optimise-disk-utilisation-zfs-dedup',
                    },
                    {
                        text: 'Custom Permissions',
                        link: '/operate/wax-infrastructure/wax-account-custom-permissions',
                    },
                    {
                        text: 'How To Route API Queries',
                        link: '/operate/wax-infrastructure/wax-route-specific-api-queries',
                    },
                    {
                        text: 'Set Up Websocket Support on a Load Balancer',
                        link: '/operate/wax-infrastructure/wax-websocket-load-balancer',
                    },
                    {
                        text: 'Set Up Full/Partial History Nodes (Hyperion)',
                        link: '/operate/wax-infrastructure/hyperion-guide',
                    },
                    {
                        text: 'Set Up an Atomic API Node',
                        link: '/operate/wax-infrastructure/atomic-api-guide',
                    },
                    {
                        text: 'Securely peer with WireGuard',
                        link: '/operate/wax-infrastructure/wax-securely-peer-with-wireguard',
                    },
                    {
                        text: 'Automate WAX Snapshots',
                        link: '/operate/wax-infrastructure/wax-automate-snapshots',
                    },
                    {
                        text: 'Managing WAX Blocks Data with Strides',
                        link: '/operate/wax-infrastructure/wax-managing-blocks-with-strides',
                    },
                    {
                        text: 'Implement TCP BBR Congestion Control',
                        link: '/operate/wax-infrastructure/wax-implement-tcp-bbr',
                    },
                    {
                        text: 'Creating a WAX Price Oracle Service',
                        link: '/operate/wax-infrastructure/creating-a-wax-price-oracle-service-bash-python',
                    },
                    {
                        text: 'Monitor/Unregister WAX Producer with systemd',
                        link: '/operate/wax-infrastructure/monitor-and-unregister-wax-producer-with-systemd-while-you-sleep',
                    },
                ],
            },
            {
                text: 'WAX Hyperion History',
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
        ],
    },
    {
        text: 'Improve These Docs',
        link: '/docs',
        collapsed: true,
    },
];
