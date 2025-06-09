# Cloud Wallet Unity SDK

## Introduction
The **CloudWallet** plugin for Unity enables dApp developers to seamlessly establish the connection between the dapp with the Cloud Wallet. This plugin provides essential features such as wallet activation, wallet deactivation, and transaction signing.

This repository has the Unity Plugin and a Demo that shows how to implement it.

## Project Structure

| Folder                            | Description                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| `Assets/CloudWalletDemo`          | Contains the dapp that uses the SDK as an example of the implementation     |
| `Assets/CloudWalletPlugin`        | Houses the SDK itself                                                       |

### Summary

#### Dependencies
The Cloud Wallet Plugin requires the following dependencies:

The internal dependencies required for the Cloud Wallet plugin to function properly.

| Dependency                               | Description                                                                |
|------------------------------------------|----------------------------------------------------------------------------|
| `GraphQL.Client.Abstractions.dll`        | Provides abstractions for handling GraphQL queries, mutations, and subscriptions. |
| `GraphQL.Client.Abstractions.Websocket.dll` | Adds WebSocket support to the GraphQL client for handling subscriptions.    |
| `GraphQL.Client.Serializer.Newtonsoft.dll` | Integrates Newtonsoft JSON as the serializer for the GraphQL client.        |
| `GraphQL.Client.dll`                     | Core library for making GraphQL requests, including queries and mutations.  |
| `GraphQL.Primitives.dll`                 | Contains primitive types used in GraphQL to support the client's operations.|
| `Microsoft.Bcl.AsyncInterfaces.dll`      | Provides asynchronous interfaces like `IAsyncEnumerable<T>` for .NET Framework compatibility. |
| `Newtonsoft.Json.dll`                    | Widely-used JSON library for serialization and deserialization in .NET applications. |
| `System.Reactive.dll`                    | Enables reactive programming by composing asynchronous and event-based programs using observable sequences. |
| `System.Reactive.*`                      | Additional libraries in the Reactive Extensions suite, supporting various reactive programming patterns. |

> ⚠️ **Warning**: Make sure to have these dependencies installed; the plugin will not work without them.

## User Information Security

The CloudWallet plugin is designed with a strong focus on security to protect the user's sensitive information.

All sensitive user data, such as tokens and keys, are encapsulated within the plugin class. This ensures that these details are not directly accessible from outside the plugin, reducing the risk of exposure.

During interactions with the Cloud Wallet app, the plugin uses secure communication protocols to protect user data. For instance, all data transmitted between the dApp and the wallet app is encrypted to prevent interception and tampering.

## Pre-Conditions

### Android Platform

To make the Plugin work correctly on Android, ensure having the following AndroidManifest.xml structure:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.unity3d.player"
    xmlns:tools="http://schemas.android.com/tools">

	<!-- The Plugin requires having this block in place to work -->
	<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
	<queries>
		<intent>
			<action android:name="android.intent.action.VIEW" />
			<data android:scheme="mycloudwallet" android:host="*" />
		</intent>
	</queries>
	<!-- End of the block -->

	<application>
		<activity android:name="com.unity3d.player.UnityPlayerActivity"
                  android:theme="@style/UnityThemeSelector">
			<intent-filter>
				<action android:name="android.intent.action.MAIN" />
				<category android:name="android.intent.category.LAUNCHER" />
			</intent-filter>
			<meta-data android:name="unityplayer.UnityActivity" android:value="true" />
		</activity>
	</application>
</manifest>
```

### iOS Platform - Solved automatically

For iOS, the plugin requires permission to interact with the mycloudwallet URL scheme to open links or check if apps using this scheme are installed. On iOS, specific URL schemes must be declared in the Info.plist file to allow the app to query and interact with them.

This challenge is solved automatically through the PostProcessBuild script provided in the plugin. This script automatically modifies the Info when the Unity project is built for the iOS .plist file, adding the necessary LSApplicationQueriesSchemes entry for the mycloudwallet scheme. This ensures that the app can successfully use the canOpenURL: method to check if the corresponding app is installed or open links using the mycloudwallet scheme.

By automating this process, developers don't need to modify the Info manually .plist file, reducing the chances of errors and ensuring the app functions correctly when interacting with the specified URL scheme.

PostProcessBuild Script Explanation
This script is designed to run automatically after the Unity project is built for the iOS platform. Specifically, it executes during the build process in the Unity Editor, once the Xcode project has been generated.

**Functionality**

The script modifies the Info.plist file, which is a crucial configuration file for iOS applications. The script adds a specific URL scheme (mycloudwallet) to the LSApplicationQueriesSchemes array within Info.plist. This allows the app to check if other apps that use this URL scheme are installed on the device.

**When it Executes**

The script runs as part of Unity's post-processing build step. This means it automatically executes after Unity finishes exporting the iOS project but before you open the project in Xcode.

**Code**

Please check the [IOSPostProcessBuild class](https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk/blob/main/Assets/CloudWalletPlugin/BuildProcesses/IOSPostBuildProcess.cs) to see the implementation.

## Initial Setup

Initialize the plugin with your dApp information before using any functionality.

To set up the CloudWallet plugin, you need to initialize it with your dApp information. This initialization process must be done before using any functionality of the plugin.

## Initialization

Below is an example of how to initialize the CloudWallet plugin in a Unity script:

```csharp
public sealed class DemoScript : MonoBehaviour
{
    public CloudWalletConnector cloudWalletConnector;
    private void Start()
    {
        connector = CloudWalletPluginConnector.Initialize(
            dappName: "DappUnityTestName",
            origin: "dappunitytestname.com",
            icon: "https://picsum.photos/200",
            description: "dapp integration using the Unity Cloud Wallet SDK",
            schema: "dappschema",
            sutGenerationUrl: "your-backend-api-url/single-use-token/generate",
            sdkClientId: "your-sdk-client-id"
        );
    }
}
```

| Parameter     | Description                                 | Required | Default Value | Validation Rules  |
| ------------- | ------------------------------------------- | -------- | ------------- | ----------------- |
| `dappName`    | The name of your decentralized application. | Yes      | N/A           | Must not be null. |
| `origin`      | The origin or domain of your application.   | Yes      | N/A           | Must not be null. |
| `icon`        | The URL of the icon for your application.   | Yes      | N/A           | Must not be null. |
| `description` | A brief description of your application.    | Yes      | N/A           | Must not be null. |
| `schema`      | The schema of your application.             | Yes      | N/A           | Must not be null. |
| `sutGenerationUrl` | The URL of the backend API for generating single-use tokens. | Yes      | N/A           | Must not be null. |
| `sdkClientId` | The client ID for the SDK. | Yes      | N/A           | Must not be null. |

> ⚠️ **Important**: The `sutGenerationUrl` and `sdkClientId` are required for the plugin to work correctly, since the plugin uses the single-use token to get the Requisition Info to initialize the Activation flow.

### Single-Use Token Generation (SUT) endpoint
To make the plugin work correctly, you need to generate a single-use token in your backend.

This endpoint must follow the following guidelines:

- The endpoint must be a POST request.
- The endpoint must return a string with the single-use token.

For more information about the SUT endpoint, please check the [Single-Use Token Generation](https://developer.wax.io/) documentation.

> ⚠️ **Important**: If your endpoint is not following the guidelines, the plugin will not work correctly.

### Singleton Pattern

The plugin implements the Singleton pattern to ensure that only one instance of the CloudWalletPlugin class exists throughout the application. This is important to manage the wallet's state and avoid multiple initializations consistently.

```csharp
public static CloudWalletPluginConnector Instance
{
    get
    {
        lock (_lock)
        {
            if (_instance == null)
            {
                throw new System.Exception("CloudWalletPluginConnector is not initialized. Call Initialize first.");
            }
            return _instance;
        }
    }
}
```

## Functionalities

### Activate Wallet

This process activates the user's wallet by connecting it to the dApp. The behavior varies depending on the platform:

- Mobile Platforms (Android, iOS): On mobile platforms, the activation function sends a request to the Cloud Wallet app installed on the same device to connect the wallet. If the app is not installed, the user is redirected to the appropriate app store (Google Play Store for Android, Apple App Store for iOS).

- Non-Mobile Platforms: For non-mobile platforms, a modal is opened, allowing the user to scan a QR code with the Cloud Wallet app on their mobile device. The activation is confirmed through the app.

**Timeout**: Implements a timeout of 2 minutes for the activation request.

```csharp
// DemoScript : MonoBehaviour Class
public async void ConnectWallet()
{
   try
   {
        string randomNonce = Guid.NewGuid().ToString();
        await connector.Activate(randomNonce);
   }
   catch (System.Exception e)
   {
       ShowErrors(e.Message);
   }
}
```

**Important**: the Random Nonce is optional and is only necessary in case you need to get the proof of login for any backend authentication.

### Deactivate Wallet

Deactivates the user's wallet, disconnecting it from the dApp. This function terminates the wallet session and clears the user login information.

If the dapp token is expired or invalid at the time of deactivating the wallet, then we detect the error and proceed with deactivating the wallet without notifying the error.

#### Errors

- Throws an exception if the user is not logged in.
- Throws an exception if there is an issue during the deactivation process.

```csharp
// DemoScript : MonoBehaviour Class
public async void DisconnectWallet()
{
    try
    {
        await cloudWalletConnector.Deactivate();
        UpdateUI();
    }
    catch (System.Exception e)
    {
        ShowErrors(e.Message);
    }
}
```

### Sign Transaction

Signs a transaction using the user's wallet.

This function constructs the transaction, sends it to the Cloud Wallet app for signing, and waits for the response.

If the dapp token is expired or invalid at the time of deactivating the wallet, then we detect the error and proceed with deactivating the wallet notifying the error.

#### Timeout

Implements a timeout for the transaction signing process.

#### Errors

- Throws an exception if the user is not logged in.
- Throws an exception if there is an issue during the transaction signing process.

```csharp
// DemoScript : MonoBehaviour Class
public async void SignTransaction()
{
    try
    {
        loadingIndicator.SetActive(true);
        object[] actions = new[]
        {
            new
            {
                account = "eosio.token",
                name = "transfer",
                authorization = new[]
                {
                    new
                    {
                        actor = connector.WalletAccount,
                        permission = "active"
                    }
                },
                data = new
                {
                    from = connector.WalletAccount,
                    to = "cc.wam",
                    quantity = "1.00000001 WAX",
                    memo = "WAX Transfer From Demo MCW Plugin"
                }
            }
        };
        /**
         * NamedParams is a class that contains the named parameters for the transaction.
         * It is used to pass the named parameters to the SignTransaction method.
         * The named parameters are optional and can be null, in that case, it will be initialized with default values.
         */
        NamedParams namedParams = new(
            BlocksBehind: 3,
            ExpireSeconds: 30000
        );
        Subscribe2ChannelDataMessageContent response = await connector.SignTransaction(actions, namedParams);
        loadingIndicator.SetActive(false);
    }
    catch (Exception e)
    {
        Debug.LogError(e.Message);
        loadingIndicator.SetActive(false);
        ShowErrors(e.Message);
        UpdateUI();
    }
}
```

#### Properties Available

| Property Name      | Description                                                                                                    |
| :----------------- | :------------------------------------------------------------------------------------------------------------- |
| **Instance**       | Returns the Cloud Wallet Plugin Connector instance if exists.                                                  |
| **IsLoggedIn**     | Returns true if the user is logged in, and false if not.                                                       |
| **IsUserTemp**     | Returns true if the logged-in user is a temporary user, and null if no user is logged in.                      |
| **ProofReferer**   | Returns the proof referer of the logged-in user, and null if no user is logged in or proof is not available.   |
| **ProofSignature** | Returns the proof signature of the logged-in user, and null if no user is logged in or proof is not available. |
| **UserAccount**    | Returns the account of the logged-in user, and null if no user is logged in.                                   |
| **UserAvatarUrl**  | Returns the avatar URL of the logged-in user, and null if no user is logged in.                                |
| **UserCreateDate** | Returns the creation date of the logged-in user, and null if no user is logged in.                             |
| **UserKeys**       | Returns a list of keys of the logged-in user, and null if no user is logged in.                                |
| **UserTrustScore** | Returns the trust score of the logged-in user, and null if no user is logged in.                               |

### Direct Connect

This function provides a direct connection to the Cloud Wallet without requiring the full activation flow. It's useful for scenarios where you want to quickly connect to a wallet without the full authentication process.

```csharp
// DemoScript : MonoBehaviour Class
public async void DirectConnect()
{
    try
    {
        string account = await cloudWalletPluginConnector.DirectConnect();
        if (!string.IsNullOrEmpty(account))
        {
            // Handle successful connection
            ShowSuccessMessage($"Connected to account: {account}");
        }
    }
    catch (Exception e)
    {
        ShowErrors(e.Message);
    }
}
```

### Direct Transact

This function allows for direct transaction signing without going through the full activation flow. It's particularly useful when you want to perform transactions quickly after a direct connection. The function takes the same parameters as `SignTransaction` but uses a more streamlined process.

```csharp
// DemoScript : MonoBehaviour Class
public async void DirectTransact()
{
    try
    {
        object[] actions = new[]
        {
            new
            {
                account = "eosio.token",
                name = "transfer",
                authorization = new[]
                {
                    new
                    {
                        actor = cloudWalletPluginConnector.UserAccount,
                        permission = "active"
                    }
                },
                data = new
                {
                    from = cloudWalletPluginConnector.UserAccount,
                    to = "recipient.account",
                    quantity = "1.00000001 WAX",
                    memo = "Direct transaction from Cloud Wallet"
                }
            }
        };

        NamedParams namedParams = new(
            BlocksBehind: 3,
            ExpireSeconds: 30000
        );

        TransactionApprovedResult response = await cloudWalletPluginConnector.DirectTransact(
            actions,
            namedParams
        );
    }
    catch (Exception e)
    {
        ShowErrors(e.Message);
    }
}
```