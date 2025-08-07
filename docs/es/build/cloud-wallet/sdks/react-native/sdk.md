---
layout: doc
title: Instalación y Uso
description: Instalación y Uso
---

# Instalación y uso del SDK de React Native

## Prerrequisitos

-   Entorno de desarrollo requerido
-   Aplicación WAX Cloud Wallet instalada
    -   iOS: https://apps.apple.com/us/app/my-cloud-wallet/id6473984457
    -   Android: https://play.google.com/store/apps/details?id=com.waxcloudwalletmobile
-   Requisitos de backend (para el modo WebSocket)

## Primeros pasos

Instala el paquete del SDK usando npm:

```sh
npm install @waxio/sdk-react-native
```

o yarn

```sh
yarn add @waxio/sdk-react-native
```

## Instrucciones de configuración

### 1. Configura Deep Linking

Primero, configura tu aplicación para manejar deep links en las diferentes plataformas. Sigue la documentación de React Navigation sobre [deep linking](https://reactnavigation.org/docs/deep-linking/).

### 2. Configuración específica por plataforma

**Configuración en iOS**
Agrega MyCloudWallet a `LSApplicationQueriesSchemes` en tu `Info.plist`:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>mycloudwallet</string>
</array>
```

**Configuración en Android**
Agrega la intent query necesaria en tu `AndroidManifest.xml`:

```xml
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="mycloudwallet" android:host="*" />
  </intent>
</queries>
```

### 3. Implementa el Provider

Envuelve tu aplicación con el `WaxDeeplinkProvider`:

```ts
import { WaxDeeplinkProvider } from '@waxio/sdk-react-native';

const getSingleUseToken = async () => {
    try {
        // Realiza una llamada a tu endpoint de autenticación para obtener un token
        const response = await fetch('https://your-auth-endpoint.com/token');
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('No se pudo obtener el token de un solo uso:', error);
        throw error;
    }
};

export default function App() {
    return (
        <WaxDeeplinkProvider
            opts={{ pollingInterval: 2000 }}
            metadata={{
                name: 'NombreDeTuApp',
                origin: 'tuappscheme',
                description: 'Descripción de tu aplicación',
                scheme: 'tuappscheme',
                icon: 'https://tuapp.com/icon.png',
            }}
            getSingleUseToken={getSingleUseToken}
            activationEndpoint="https://your-activation-endpoint.com"
            relayEndpoint="https://queue-relay.mycloudwallet.com/graphql"
            relayRegion="us-east-2"
        >
            {/* Tus componentes de la app */}
        </WaxDeeplinkProvider>
    );
}
```

**Parámetros de configuración del Provider**

| Parámetro            | Tipo    | Descripción                                           |
| -------------------- | ------- | ----------------------------------------------------- |
| `opts`               | Objeto  | Opciones de configuración como el intervalo de sondeo |
| `metadata`           | Objeto  | Información sobre tu aplicación                       |
| `getSingleUseToken`  | Función | Función para obtener el token de autenticación        |
| `activationEndpoint` | String  | Endpoint para la activación de la wallet              |
| `relayEndpoint`      | String  | Endpoint para el relay de transacciones               |
| `relayRegion`        | String  | Región para el servicio de relay                      |

## Uso del SDK

### Conexión con WAX Wallet

Utiliza el hook `useWaxSDK` en tus componentes para interactuar con la blockchain de WAX:

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
      // Tu aplicación aquí
    </View>
  );
}
```

### Funciones principales del SDK

| Función                      | Descripción                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `connect()`                  | Inicia la conexión con la wallet de WAX en otro dispositivo                      |
| `directConnect()`            | Inicia la conexión con la wallet de WAX en el mismo dispositivo                  |
| `disconnect()`               | Termina la conexión con la wallet de WAX                                         |
| `transact(actions)`          | Envía una transacción a la blockchain desde diferentes dispositivos              |
| `directTransaction(actions)` | Envía una transacción a la blockchain a la app de wallet en el mismo dispositivo |
| `user`                       | Objeto que contiene la información del usuario cuando está conectado             |

## Resumen de pasos de implementación

1. Instala el paquete del SDK
2. Configura deep linking para tu aplicación
3. Agrega las configuraciones necesarias por plataforma (Info.plist y AndroidManifest.xml)
4. Implementa el WaxDeeplinkProvider en tu app
5. Usa el hook useWaxSDK en tus componentes para conectar y realizar transacciones con la blockchain de WAX

## Consejos para resolución de problemas

1. Asegúrate de estar usando React Native v0.71.4 o superior para evitar problemas de rendimiento en Android
2. Verifica que el deep linking esté correctamente configurado
3. Comprueba que el scheme de la app esté correctamente definido tanto en el provider como en las configuraciones de plataforma
4. Confirma que tus endpoints de activación y relay sean accesibles y funcionen correctamente
