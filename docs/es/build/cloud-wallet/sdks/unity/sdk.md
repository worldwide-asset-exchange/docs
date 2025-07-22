# SDK de Cloud Wallet Unity

## Introducción

El plugin **CloudWallet** para Unity permite a los desarrolladores de dApps establecer de manera fluida la conexión entre la dapp y Cloud Wallet. Este plugin proporciona características esenciales como la activación del wallet, desactivación del wallet y firma de transacciones.

Este repositorio contiene el Plugin de Unity y una Demo que muestra cómo implementarlo.

## Estructura del Proyecto

| Carpeta                    | Descripción                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `Assets/CloudWalletDemo`   | Contiene la dapp que usa el SDK como ejemplo de implementación |
| `Assets/CloudWalletPlugin` | Contiene el SDK en sí                                          |

### Resumen

#### Dependencias

El Plugin de Cloud Wallet requiere las siguientes dependencias:

Las dependencias internas requeridas para que el plugin de Cloud Wallet funcione correctamente.

| Dependencia                                 | Descripción                                                                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `GraphQL.Client.Abstractions.dll`           | Proporciona abstracciones para manejar consultas GraphQL, mutaciones y suscripciones.                                                  |
| `GraphQL.Client.Abstractions.Websocket.dll` | Agrega soporte WebSocket al cliente GraphQL para manejar suscripciones.                                                                |
| `GraphQL.Client.Serializer.Newtonsoft.dll`  | Integra Newtonsoft JSON como el serializador para el cliente GraphQL.                                                                  |
| `GraphQL.Client.dll`                        | Biblioteca principal para realizar solicitudes GraphQL, incluyendo consultas y mutaciones.                                             |
| `GraphQL.Primitives.dll`                    | Contiene tipos primitivos utilizados en GraphQL para soportar las operaciones del cliente.                                             |
| `Microsoft.Bcl.AsyncInterfaces.dll`         | Proporciona interfaces asíncronas como `IAsyncEnumerable<T>` para compatibilidad con .NET Framework.                                   |
| `Newtonsoft.Json.dll`                       | Biblioteca JSON ampliamente utilizada para serialización y deserialización en aplicaciones .NET.                                       |
| `System.Reactive.dll`                       | Permite la programación reactiva mediante la composición de programas asincrónicos y basados en eventos usando secuencias observables. |
| `System.Reactive.*`                         | Bibliotecas adicionales en la suite de Reactive Extensions, que soportan varios patrones de programación reactiva.                     |

> ⚠️ **Advertencia**: Asegúrate de tener estas dependencias instaladas; el plugin no funcionará sin ellas.

## Seguridad de la Información del Usuario

El plugin CloudWallet está diseñado con un fuerte enfoque en la seguridad para proteger la información sensible del usuario.

Todos los datos sensibles del usuario, como tokens y claves, están encapsulados dentro de la clase del plugin. Esto asegura que estos detalles no sean directamente accesibles desde fuera del plugin, reduciendo el riesgo de exposición.

Durante las interacciones con la aplicación Cloud Wallet, el plugin utiliza protocolos de comunicación seguros para proteger los datos del usuario. Por ejemplo, todos los datos transmitidos entre la dApp y la aplicación wallet están cifrados para prevenir interceptación y manipulación.

## Pre-Condiciones

### Plataforma Android

Para que el Plugin funcione correctamente en Android, asegúrate de tener la siguiente estructura en AndroidManifest.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.unity3d.player"
    xmlns:tools="http://schemas.android.com/tools">

	<!-- El Plugin requiere tener este bloque en su lugar para funcionar -->
	<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
	<queries>
		<intent>
			<action android:name="android.intent.action.VIEW" />
			<data android:scheme="mycloudwallet" android:host="*" />
		</intent>
	</queries>
	<!-- Fin del bloque -->

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

### Plataforma iOS - Resuelto automáticamente

Para iOS, el plugin requiere permiso para interactuar con el esquema URL mycloudwallet para abrir enlaces o verificar si las aplicaciones que usan este esquema están instaladas. En iOS, los esquemas URL específicos deben declararse en el archivo Info.plist para permitir que la aplicación los consulte e interactúe con ellos.

Este desafío se resuelve automáticamente a través del script PostProcessBuild proporcionado en el plugin. Este script modifica automáticamente el archivo Info.plist cuando el proyecto Unity se compila para iOS, agregando la entrada LSApplicationQueriesSchemes necesaria para el esquema mycloudwallet. Esto asegura que la aplicación pueda usar exitosamente el método canOpenURL: para verificar si la aplicación correspondiente está instalada o abrir enlaces usando el esquema mycloudwallet.

Al automatizar este proceso, los desarrolladores no necesitan modificar manualmente el archivo Info.plist, reduciendo las posibilidades de errores y asegurando que la aplicación funcione correctamente al interactuar con el esquema URL especificado.

Explicación del Script PostProcessBuild
Este script está diseñado para ejecutarse automáticamente después de que el proyecto Unity se compila para la plataforma iOS. Específicamente, se ejecuta durante el proceso de compilación en el Editor de Unity, una vez que se ha generado el proyecto Xcode.

**Funcionalidad**

El script modifica el archivo Info.plist, que es un archivo de configuración crucial para aplicaciones iOS. El script agrega un esquema URL específico (mycloudwallet) al array LSApplicationQueriesSchemes dentro de Info.plist. Esto permite que la aplicación verifique si otras aplicaciones que usan este esquema URL están instaladas en el dispositivo.

**Cuándo se Ejecuta**

El script se ejecuta como parte del paso de post-procesamiento de Unity. Esto significa que se ejecuta automáticamente después de que Unity termina de exportar el proyecto iOS pero antes de que abras el proyecto en Xcode.

**Código**

Por favor, consulta la [clase IOSPostProcessBuild](https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk/blob/main/Assets/CloudWalletPlugin/BuildProcesses/IOSPostBuildProcess.cs) para ver la implementación.

## Configuración Inicial

Inicializa el plugin con la información de tu dApp antes de usar cualquier funcionalidad.

Para configurar el plugin CloudWallet, necesitas inicializarlo con la información de tu dApp. Este proceso de inicialización debe realizarse antes de usar cualquier funcionalidad del plugin.

## Inicialización

A continuación se muestra un ejemplo de cómo inicializar el plugin CloudWallet en un script de Unity:

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

| Parámetro          | Descripción                                                  | Requerido | Valor por Defecto | Reglas de Validación |
| ------------------ | ------------------------------------------------------------ | --------- | ----------------- | -------------------- |
| `dappName`         | El nombre de tu aplicación descentralizada.                  | Sí        | N/A               | No debe ser nulo.    |
| `origin`           | El origen o dominio de tu aplicación.                        | Sí        | N/A               | No debe ser nulo.    |
| `icon`             | La URL del icono de tu aplicación.                           | Sí        | N/A               | No debe ser nulo.    |
| `description`      | Una breve descripción de tu aplicación.                      | Sí        | N/A               | No debe ser nulo.    |
| `schema`           | El esquema de tu aplicación.                                 | Sí        | N/A               | No debe ser nulo.    |
| `sutGenerationUrl` | La URL de la API backend para generar tokens de un solo uso. | Sí        | N/A               | No debe ser nulo.    |
| `sdkClientId`      | El ID de cliente para el SDK.                                | Sí        | N/A               | No debe ser nulo.    |

> ⚠️ **Importante**: El `sutGenerationUrl` y `sdkClientId` son requeridos para que el plugin funcione correctamente, ya que el plugin usa el token de un solo uso para obtener la Información de Requisición para inicializar el flujo de Activación.

### Endpoint de Generación de Token de Un Solo Uso (SUT)

Para que el plugin funcione correctamente, necesitas generar un token de un solo uso en tu backend.

Este endpoint debe seguir las siguientes pautas:

-   El endpoint debe ser una solicitud POST.
-   El endpoint debe devolver una cadena con el token de un solo uso.

Para más información sobre el endpoint SUT, por favor consulta la documentación de [Generación de Token de Un Solo Uso](https://developer.wax.io/).

> ⚠️ **Importante**: Si tu endpoint no sigue las pautas, el plugin no funcionará correctamente.

### Patrón Singleton

El plugin implementa el patrón Singleton para asegurar que solo exista una instancia de la clase CloudWalletPlugin en toda la aplicación. Esto es importante para gestionar el estado del wallet y evitar múltiples inicializaciones de manera consistente.

```csharp
public static CloudWalletPluginConnector Instance
{
    get
    {
        lock (_lock)
        {
            if (_instance == null)
            {
                throw new System.Exception("CloudWalletPluginConnector no está inicializado. Llama a Initialize primero.");
            }
            return _instance;
        }
    }
}
```

## Funcionalidades

### Activar Wallet

Este proceso activa el wallet del usuario conectándolo a la dApp. El comportamiento varía según la plataforma:

-   Plataformas Móviles (Android, iOS): En plataformas móviles, la función de activación envía una solicitud a la aplicación Cloud Wallet instalada en el mismo dispositivo para conectar el wallet. Si la aplicación no está instalada, el usuario es redirigido a la tienda de aplicaciones correspondiente (Google Play Store para Android, Apple App Store para iOS).

-   Plataformas No Móviles: Para plataformas no móviles, se abre un modal que permite al usuario escanear un código QR con la aplicación Cloud Wallet en su dispositivo móvil. La activación se confirma a través de la aplicación.

**Tiempo de espera**: Implementa un tiempo de espera de 2 minutos para la solicitud de activación.

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

**Importante**: el Nonce Aleatorio es opcional y solo es necesario en caso de que necesites obtener la prueba de inicio de sesión para cualquier autenticación backend.

### Desactivar Wallet

Desactiva el wallet del usuario, desconectándolo de la dApp. Esta función termina la sesión del wallet y limpia la información de inicio de sesión del usuario.

Si el token de la dapp está expirado o es inválido al momento de desactivar el wallet, entonces detectamos el error y procedemos con la desactivación del wallet sin notificar el error.

#### Errores

-   Lanza una excepción si el usuario no ha iniciado sesión.
-   Lanza una excepción si hay un problema durante el proceso de desactivación.

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

### Firmar Transacción

Firma una transacción usando el wallet del usuario.

Esta función construye la transacción, la envía a la aplicación Cloud Wallet para su firma y espera la respuesta.

Si el token de la dapp está expirado o es inválido al momento de desactivar el wallet, entonces detectamos el error y procedemos con la desactivación del wallet notificando el error.

#### Tiempo de espera

Implementa un tiempo de espera para el proceso de firma de transacción.

#### Errores

-   Lanza una excepción si el usuario no ha iniciado sesión.
-   Lanza una excepción si hay un problema durante el proceso de firma de la transacción.

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
         * NamedParams es una clase que contiene los parámetros nombrados para la transacción.
         * Se utiliza para pasar los parámetros nombrados al método SignTransaction.
         * Los parámetros nombrados son opcionales y pueden ser nulos, en ese caso, se inicializarán con valores predeterminados.
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

#### Propiedades Disponibles

| Nombre de Propiedad | Descripción                                                                                                           |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| **Instance**        | Devuelve la instancia del Conector del Plugin Cloud Wallet si existe.                                                 |
| **IsLoggedIn**      | Devuelve true si el usuario ha iniciado sesión, y false si no.                                                        |
| **IsUserTemp**      | Devuelve true si el usuario conectado es temporal, y null si no hay usuario conectado.                                |
| **ProofReferer**    | Devuelve el referente de prueba del usuario conectado, y null si no hay usuario conectado o no hay prueba disponible. |
| **ProofSignature**  | Devuelve la firma de prueba del usuario conectado, y null si no hay usuario conectado o no hay prueba disponible.     |
| **UserAccount**     | Devuelve la cuenta del usuario conectado, y null si no hay usuario conectado.                                         |
| **UserAvatarUrl**   | Devuelve la URL del avatar del usuario conectado, y null si no hay usuario conectado.                                 |
| **UserCreateDate**  | Devuelve la fecha de creación del usuario conectado, y null si no hay usuario conectado.                              |
| **UserKeys**        | Devuelve una lista de claves del usuario conectado, y null si no hay usuario conectado.                               |
| **UserTrustScore**  | Devuelve la puntuación de confianza del usuario conectado, y null si no hay usuario conectado.                        |

### Conexión Directa

Esta función proporciona una conexión directa a Cloud Wallet sin requerir el flujo completo de activación. Es útil para escenarios donde deseas conectarte rápidamente a un wallet sin el proceso completo de autenticación.

```csharp
// DemoScript : MonoBehaviour Class
public async void DirectConnect()
{
    try
    {
        string account = await cloudWalletPluginConnector.DirectConnect();
        if (!string.IsNullOrEmpty(account))
        {
            // Manejar conexión exitosa
            ShowSuccessMessage($"Conectado a la cuenta: {account}");
        }
    }
    catch (Exception e)
    {
        ShowErrors(e.Message);
    }
}
```

### Transacción Directa

Esta función permite la firma directa de transacciones sin pasar por el flujo completo de activación. Es particularmente útil cuando deseas realizar transacciones rápidamente después de una conexión directa. La función toma los mismos parámetros que `SignTransaction` pero usa un proceso más simplificado.

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
                    memo = "Transacción directa desde Cloud Wallet"
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
