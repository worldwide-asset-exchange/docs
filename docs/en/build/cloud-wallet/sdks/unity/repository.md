---
layout: doc
title: Unity SDK Repository
description: Unity SDK Repository
---

# Repository
URL: https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk

## Repository Structure

### Root Directory
The root directory contains the SDK source code and configuration files:

- `Assets/` - Unity project assets
  - `CloudWalletPlugin/` - Core SDK implementation
    - `Components/` - Main functional components
      - `WalletConnection/` - Activation and Deactivation functionalities
      - `SignTransaction/` - Transaction signing functionality
      - `CloudWalletAppInteraction/` - Service for Cloud Wallet app interaction
    - `Common/` - Common models and shared code
    - `Infrastructure/` - HTTP requests and GraphQL client
    - `BuildProcesses/` - Build-time scripts and utilities
  - `CloudWalletDemo/` - Example implementation
    - `Scenes/` - Demo scenes
    - `Plugin/` - Plugin-specific files
      - `Android/` - Android-specific configurations

- Configuration files:
  - `package.json` - UPM package configuration
  - `manifest.json` - Unity package dependencies
  - `README.md` - Project documentation
  - `LICENSE` - License information

### Example Application
The `Assets/CloudWalletDemo/` directory contains a complete example application demonstrating how to use the SDK:

- `Assets/CloudWalletDemo/` - Example Unity application
  - Contains a working implementation of the SDK
  - Demonstrates common use cases and best practices
  - Includes example scenes for different platforms
  - Shows proper configuration for Android and iOS
  - Can be used as a reference for implementing the SDK in your own applications

### Dependencies
The SDK requires several internal dependencies to function properly:

- GraphQL-related libraries
  - GraphQL.Client.Abstractions.dll
  - GraphQL.Client.Abstractions.Websocket.dll
  - GraphQL.Client.Serializer.Newtonsoft.dll
  - GraphQL.Client.dll
  - GraphQL.Primitives.dll

- System libraries
  - Microsoft.Bcl.AsyncInterfaces.dll
  - Newtonsoft.Json.dll
  - System.Reactive.dll
  - System.Reactive.* 