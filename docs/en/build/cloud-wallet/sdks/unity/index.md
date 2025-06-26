---
layout: doc
title: Unity SDK
description: Unity SDK
---

# Unity SDK
## Overview of WAX Cloud Wallet SDK

The WAX Cloud Wallet Unity SDK enables seamless integration between Unity applications and the WAX Cloud Wallet mobile app. This SDK provides developers with a robust solution for implementing blockchain transactions in their Unity applications, offering cross-platform support and secure transaction signing capabilities.

The SDK abstracts the complexity of blockchain interactions, allowing developers to focus on building great user experiences while ensuring secure transaction signing and user authentication.

## Key Features

### Cross-Platform Support
- **Mobile Platforms**: Android and iOS support with native integration
- **Desktop Platforms**: QR code-based authentication for desktop applications
- **WebGL**: Remote signing support for web-based applications
- **Automatic Platform Configuration**: Handles platform-specific setup automatically

> ⚠️ **Note**: WebGL is now supported but only for remote signing. Stay tuned for additional WebGL features in upcoming updates!

### Transaction Management
**1. Secure Transaction Signing**
  - End-to-end encrypted communication
  - Transaction status tracking
  - Timeout handling

**2. Authentication & Security**
  - Secure user authentication
  - Encrypted data transfer
  - Single-use token implementation
  - Secure wallet session management

**3. Developer Experience**
  - Simple Integration
    - Minimal configuration required
    - Comprehensive C# support
  - Event System
    - Real-time connection status updates
    - Transaction event notifications

**4. Platform-Specific Features**
  - Android: Automatic manifest configuration
  - iOS: Automatic URL scheme registration
  - Desktop: QR code scanning support

## Installation

### Via UPM (Unity Package Manager)

#### Using Git URL
Add the following line to your `Packages/manifest.json`:

```json
{
  "dependencies": {
    "com.wax.cloudwallet": "https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk.git?path=Assets/CloudWalletPlugin"
  }
}
```

For specific versions:
```json
{
  "dependencies": {
    "com.wax.cloudwallet": "https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk.git?path=Assets/CloudWalletPlugin#1.0.0"
  }
}
```

#### Using OpenUPM
```bash
openupm add com.wax.cloudwallet
```

### Via Unity Package
1. Download the latest `CloudWalletPlugin.*.*.*.unitypackage` from the [releases page](https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk/releases)
2. In Unity, go to `Assets > Import Package > Custom Package`
3. Select the downloaded `.unitypackage` file
4. Click "Import" to import all the necessary files

## Getting Started

### Initialization
Initialize the plugin with your dApp information:

```csharp
using CloudWalletPlugin;

public class YourMonoBehaviour : MonoBehaviour
{
    private CloudWalletPluginConnector connector;

    private void Start()
    {
        connector = CloudWalletPluginConnector.Initialize(
            dappName: "YourDAppName",
            origin: "yourdapp.com",
            icon: "https://your-icon-url.com/icon.png",
            description: "Your dApp description",
            schema: "yourdapp",
            sutGenerationUrl: "https://your-backend.com/sut/generate",
            sdkClientId: "your-client-id"
        );
    }
}
```

### Wallet Connection
```csharp
// Activate wallet
public async void ConnectWallet()
{
    try
    {
        string nonce = Guid.NewGuid().ToString();
        await connector.Activate(nonce);
        Debug.Log("Wallet connected successfully");
    }
    catch (Exception e)
    {
        Debug.LogError($"Connection failed: {e.Message}");
    }
}

// Deactivate wallet
public async void DisconnectWallet()
{
    try
    {
        await connector.Deactivate();
        Debug.Log("Wallet disconnected successfully");
    }
    catch (Exception e)
    {
        Debug.LogError($"Disconnection failed: {e.Message}");
    }
}
```

### Transaction Signing
```csharp
public async void SignTransaction()
{
    try
    {
        var transaction = new Transaction
        {
            // Configure your transaction here
        };

        var signedTransaction = await connector.SignTransaction(transaction);
        Debug.Log("Transaction signed successfully");
    }
    catch (Exception e)
    {
        Debug.LogError($"Transaction signing failed: {e.Message}");
    }
}
```

## Security Considerations

- All sensitive data is encrypted during transmission
- Single-use tokens are required for authentication
- Wallet sessions are managed securely
- Platform-specific security measures are implemented automatically

## Best Practices

1. Always initialize the SDK before use
2. Handle exceptions appropriately
3. Implement proper error messaging for users
4. Use the singleton pattern for SDK access
5. Follow platform-specific guidelines for deployment

## Support

For support, please:
1. Check the [GitHub Issues](https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk/issues)
2. Review the documentation
3. Contact support at support@wax.io
