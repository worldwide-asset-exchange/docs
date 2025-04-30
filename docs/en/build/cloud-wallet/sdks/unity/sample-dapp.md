# Cloud Wallet Unity SDK DEMO

## Project Structure

Contains the demo implementation of the Cloud Wallet plugin to showcase its features and usage.

| Folder               | Description                                             |
|----------------------|---------------------------------------------------------|
| `Assets/Scenes` | Contains the main scene of the Demo. |
| `Assets/CloudWalletDemo` | Contains the assets and scripts for the demo implementation. |
| `Assets/CloudWalletDemo/Plugin/Android` | Contains the AndroidManifest.xml file, which is important to allow the Plugin work. |

## Demo of each functionality

### Wallet Connection

#### Mobile Platforms

| Activation | Deactivation |
|-----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| <img src="../../../../../public/assets/sdks/unity/sample-dapp/mobile-activation-success.gif" with="284" /> | <img src="../../../../../public/assets/sdks/unity/sample-dapp/mobile-deactivation.gif" width=284 />|

#### Non-Mobile Platforms

| Activation | Activation with time out |Deactivation |
|--------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| ![Activation](../../../../../public/assets/sdks/unity/sample-dapp/desktop-activation-success.gif)         | ![Activation](../../../../../public/assets/sdks/unity/sample-dapp/desktop-activation-timeout-newcode.gif) | ![Deactivation](../../../../../public/assets/sdks/unity/sample-dapp/desktop-deactivation.gif)                         |


### Sign Transaction

#### Mobile Platforms
| Approved | Rejected |
|---------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| ![Approved](../../../../../public/assets/sdks/unity/sample-dapp/mobile-sign-transaction-success.gif) | ![Rejected](../../../../../public/assets/sdks/unity/sample-dapp/mobile-sign-transaction-rejected.gif) |


#### Non-Mobile Platforms
| Approved | Rejected |
|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| ![Approved](../../../../../public/assets/sdks/unity/sample-dapp/desktop-sign-transaction-success.gif) | ![Rejected](../../../../../public/assets/sdks/unity/sample-dapp/desktop-sign-transaction-rejected.gif) |