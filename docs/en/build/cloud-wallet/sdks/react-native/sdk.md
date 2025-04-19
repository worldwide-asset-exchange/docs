---
layout: doc
title: Installation and Usage
description: Installation and Usage
---

# Installation & usage of React Native SDK

## Prerequisites
- Required development environment
- WAX Cloud Wallet App installed
  - iOS: https://apps.apple.com/us/app/my-cloud-wallet/id6473984457
  - Android: https://play.google.com/store/apps/details?id=com.waxcloudwalletmobile
- Backend requirements (for WebSocket mode)

## Getting Started

Install the SDK package using npm:
```sh
npm install @waxio/sdk-react-native
```
or yarn
```sh
yarn add @waxio/sdk-react-native
```

## Setup Instructions

### 1. Configure Deep Linking
First, set up your application to handle deep links across different platforms. Follow the React Navigation [deep linking documentation](https://reactnavigation.org/docs/deep-linking/).

### 2. Configure Platform-Specific Settings
**iOS Configuration**
Add MyCloudWallet to `LSApplicationQueriesSchemes` in your `Info.plist`:
```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>mycloudwallet</string>
</array>
```

**Android Configuration**
Add the necessary query intent to your `AndroidManifest.xml`:
```xml
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="mycloudwallet" android:host="*" />
  </intent>
</queries>
```

### 3. Implement the Provider
Wrap your application with the `WaxDeeplinkProvider`:
```ts
import { WaxDeeplinkProvider } from "@waxio/sdk-react-native";

const getSingleUseToken = async () => {
  try {
    // Make API call to your auth endpoint to get a token
    const response = await fetch('https://your-auth-endpoint.com/token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Failed to get single use token:', error);
    throw error;
  }
};

export default function App() {
  return (
    <WaxDeeplinkProvider
      opts={{ pollingInterval: 2000 }}
      metadata={{
        name: "YourAppName",
        origin: "yourappscheme",
        description: "Description of your application",
        scheme: "yourappscheme",
        icon: "https://yourapp.com/icon.png",
      }}
      getSingleUseToken={getSingleUseToken}
      activationEndpoint="https://your-activation-endpoint.com"
      relayEndpoint="https://queue-relay.mycloudwallet.com/graphql"
      relayRegion="us-east-2"
    >
      {/* Your app components */}
    </WaxDeeplinkProvider>
  );
}
```

**Provider Configuration Parameters**

| Parameter           | Type     | Description                                  |
|---------------------|----------|----------------------------------------------|
| `opts`              | Object   | Configuration options like polling interval  |
| `metadata`          | Object   | Information about your application           |
| `getSingleUseToken` | Function | Function to retrieve authentication token    |
| `activationEndpoint`| String   | Endpoint for wallet activation               |
| `relayEndpoint`     | String   | Endpoint for transaction relay               |
| `relayRegion`       | String   | Region for the relay service                 |

## Using the SDK

### Connecting to WAX Wallet

Use the `useWaxSDK` hook in your components to interact with the WAX blockchain:

```ts
...
import { useWaxSDK } from "@waxio/sdk-react-native";
...
export default function YourComponent() {
  const {
    connect,
    directConnect,
    canDirectConnect,
    user,
    transact,
    directTransact,
    disconnect,
    getQRCode,
  } = useWaxSDK();

  return (
    <View>
      // Your applicaton is here
    </View>
  );
}
```

### SDK Core Functions

| Function                   | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `connect()`                | Initiates connection to the WAX wallet in a different device                |
| `directConnect()`          | Initiates connection to the WAX wallet on the same device                   |
| `disconnect()`             | Terminates the connection with the WAX wallet                               |
| `transact(actions)`        | Sends transaction to the blockchain via different devices                   |
| `directTransaction(actions)` | Sends transaction to the blockchain to the wallet app on the same device   |
| `user`                     | Object containing user information when connected                           |

## Implementation Steps Summary
1. Install the SDK package
2. Configure deep linking for your application
3. Add necessary platform-specific configurations (Info.plist and AndroidManifest.xml)
4. Implement the WaxDeeplinkProvider in your app
5. Use the useWaxSDK hook in your components to connect and transact with the WAX blockchain

## Troubleshooting Tips
1. Ensure you're using React Native v0.71.4 or higher to avoid performance issues on Android
2. Verify that deep linking is properly configured
3. Check that the app scheme is correctly set up in both your provider and platform configurations
4. Confirm that your endpoints for activation and relay are accessible and working correctly
