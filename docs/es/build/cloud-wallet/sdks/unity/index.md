---
layout: doc
title: SDK de Unity
description: SDK de Unity
---

# SDK de Unity
## Descripción general del SDK de WAX Cloud Wallet

El SDK de Unity para WAX Cloud Wallet permite una integración fluida entre aplicaciones Unity y la aplicación móvil de WAX Cloud Wallet. Este SDK proporciona a los desarrolladores una solución robusta para implementar transacciones blockchain en sus aplicaciones Unity, ofreciendo soporte multiplataforma y capacidades seguras de firma de transacciones.

El SDK abstrae la complejidad de las interacciones con la blockchain, permitiendo a los desarrolladores centrarse en crear excelentes experiencias de usuario mientras garantiza la firma segura de transacciones y la autenticación de usuarios.

## Características Principales

### Soporte Multiplataforma
- **Plataformas Móviles**: Soporte para Android e iOS con integración nativa
- **Plataformas de Escritorio**: Autenticación basada en códigos QR para aplicaciones de escritorio
- **WebGL**: Soporte de firma remota para aplicaciones web
- **Configuración Automática de Plataforma**: Maneja la configuración específica de cada plataforma automáticamente

> ⚠️ **Nota**: WebGL ahora es compatible pero solo para firma remota. ¡Estén atentos a características adicionales de WebGL en próximas actualizaciones!

### Gestión de Transacciones
**1. Firma Segura de Transacciones**
  - Comunicación cifrada de extremo a extremo
  - Seguimiento del estado de las transacciones
  - Manejo de tiempos de espera

**2. Autenticación y Seguridad**
  - Autenticación segura de usuarios
  - Transferencia de datos cifrada
  - Implementación de tokens de un solo uso
  - Gestión segura de sesiones de wallet

**3. Experiencia del Desarrollador**
  - Integración Simple
    - Configuración mínima requerida
    - Soporte completo de C#
  - Sistema de Eventos
    - Actualizaciones en tiempo real del estado de la conexión
    - Notificaciones de eventos de transacciones

**4. Características Específicas por Plataforma**
  - Android: Configuración automática del manifiesto
  - iOS: Registro automático del esquema URL
  - Escritorio: Soporte para escaneo de códigos QR

## Instalación

### Vía UPM (Unity Package Manager)

#### Usando URL de Git
Agrega la siguiente línea a tu `Packages/manifest.json`:

```json
{
  "dependencies": {
    "com.wax.cloudwallet": "https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk.git?path=Assets/CloudWalletPlugin"
  }
}
```

Para versiones específicas:
```json
{
  "dependencies": {
    "com.wax.cloudwallet": "https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk.git?path=Assets/CloudWalletPlugin#1.0.0"
  }
}
```

#### Usando OpenUPM
```bash
openupm add com.wax.cloudwallet
```

### Vía Paquete de Unity
1. Descarga el último `CloudWalletPlugin.*.*.*.unitypackage` desde la [página de releases](https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk/releases)
2. En Unity, ve a `Assets > Import Package > Custom Package`
3. Selecciona el archivo `.unitypackage` descargado
4. Haz clic en "Import" para importar todos los archivos necesarios

## Primeros Pasos

### Inicialización
Inicializa el plugin con la información de tu dApp:

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

### Conexión del Wallet
```csharp
// Activar wallet
public async void ConnectWallet()
{
    try
    {
        string nonce = Guid.NewGuid().ToString();
        await connector.Activate(nonce);
        Debug.Log("Wallet conectado exitosamente");
    }
    catch (Exception e)
    {
        Debug.LogError($"Conexión fallida: {e.Message}");
    }
}

// Desactivar wallet
public async void DisconnectWallet()
{
    try
    {
        await connector.Deactivate();
        Debug.Log("Wallet desconectado exitosamente");
    }
    catch (Exception e)
    {
        Debug.LogError($"Desconexión fallida: {e.Message}");
    }
}
```

### Firma de Transacciones
```csharp
public async void SignTransaction()
{
    try
    {
        var transaction = new Transaction
        {
            // Configura tu transacción aquí
        };

        var signedTransaction = await connector.SignTransaction(transaction);
        Debug.Log("Transacción firmada exitosamente");
    }
    catch (Exception e)
    {
        Debug.LogError($"Firma de transacción fallida: {e.Message}");
    }
}
```

## Consideraciones de Seguridad

- Todos los datos sensibles se cifran durante la transmisión
- Se requieren tokens de un solo uso para la autenticación
- Las sesiones del wallet se gestionan de forma segura
- Las medidas de seguridad específicas de cada plataforma se implementan automáticamente

## Mejores Prácticas

1. Siempre inicializa el SDK antes de usarlo
2. Maneja las excepciones apropiadamente
3. Implementa mensajes de error adecuados para los usuarios
4. Usa el patrón singleton para acceder al SDK
5. Sigue las pautas específicas de cada plataforma para el despliegue

## Soporte

Para obtener soporte, por favor:
1. Revisa los [Issues de GitHub](https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk/issues)
2. Consulta la documentación
3. Contacta con soporte en support@wax.io
