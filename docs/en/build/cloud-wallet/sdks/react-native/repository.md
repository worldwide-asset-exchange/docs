---
layout: doc
title: React Native SDK Repository
description: React Native SDK Repository
---

# Repository
URL: https://github.com/worldwide-asset-exchange/sdk-react-native

## Repository Structure

### Root Directory
The root directory contains the SDK source code and configuration files:

- `src/` - Core SDK source code
  - `base/` - Base components and utilities
  - `config/` - Configuration files
  - `constants/` - Constant values and enums
  - `contexts/` - React contexts for state management
  - `services/` - Service layer implementations
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `__tests__/` - Test files
  - `index.tsx` - Main entry point

- Configuration files:
  - `package.json` - Project dependencies and scripts
  - `tsconfig.json` - TypeScript configuration
  - `rollup.config.js` - Build configuration
  - `babel.config.js` - Babel configuration
  - `jest.config.ts` - Testing configuration

### Example Application
The `packages/dapp-example/` directory contains a complete example application demonstrating how to use the SDK:

- `packages/dapp-example/` - Example React Native application
  - Contains a working implementation of the SDK
  - Demonstrates common use cases and best practices
  - Can be used as a reference for implementing the SDK in your own applications