# Demo del SDK de Cloud Wallet Unity

## Estructura del Proyecto

Contiene la implementación de demostración del plugin de Cloud Wallet para mostrar sus características y uso.

| Carpeta                                 | Descripción                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| `Assets/Scenes`                         | Contiene la escena principal de la Demo.                                             |
| `Assets/CloudWalletDemo`                | Contiene los assets y scripts para la implementación de demostración.                |
| `Assets/CloudWalletDemo/Plugin/Android` | Contiene el archivo AndroidManifest.xml, que es importante para el funcionamiento del Plugin. |

## Demostración de cada funcionalidad

### Conexión del Wallet

#### Plataformas Móviles

| Activación                                                                                                 | Desactivación                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <img src="../../../../../public/assets/sdks/unity/sample-dapp/mobile-activation-success.gif" with="284" /> | <img src="../../../../../public/assets/sdks/unity/sample-dapp/mobile-deactivation.gif" width=284 /> |

#### Plataformas No Móviles

| Activación                                                                                        | Activación con tiempo de espera agotado                                                                | Desactivación                                                                                  |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![Activación](../../../../../public/assets/sdks/unity/sample-dapp/desktop-activation-success.gif) | ![Activación](../../../../../public/assets/sdks/unity/sample-dapp/desktop-activation-timeout-newcode.gif) | ![Desactivación](../../../../../public/assets/sdks/unity/sample-dapp/desktop-deactivation.gif) |

### Firma de Transacción

#### Plataformas Móviles

| Aprobada                                                                                             | Rechazada                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ![Aprobada](../../../../../public/assets/sdks/unity/sample-dapp/mobile-sign-transaction-success.gif) | ![Rechazada](../../../../../public/assets/sdks/unity/sample-dapp/mobile-sign-transaction-rejected.gif) |

#### Plataformas No Móviles

| Aprobada                                                                                              | Rechazada                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ![Aprobada](../../../../../public/assets/sdks/unity/sample-dapp/desktop-sign-transaction-success.gif) | ![Rechazada](../../../../../public/assets/sdks/unity/sample-dapp/desktop-sign-transaction-rejected.gif) |
