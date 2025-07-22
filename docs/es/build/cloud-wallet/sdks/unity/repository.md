---
layout: doc
title: Repositorio del SDK de Unity
description: Repositorio del SDK de Unity
---

# Repositorio
URL: https://github.com/worldwide-asset-exchange/cloudwallet-unity-sdk

## Estructura del Repositorio

### Directorio Raíz
El directorio raíz contiene el código fuente del SDK y los archivos de configuración:

- `Assets/` - Activos del proyecto Unity
  - `CloudWalletPlugin/` - Implementación principal del SDK
    - `Components/` - Componentes funcionales principales
      - `WalletConnection/` - Funcionalidades de activación y desactivación
      - `SignTransaction/` - Funcionalidad de firma de transacciones
      - `CloudWalletAppInteraction/` - Servicio para la interacción con la aplicación Cloud Wallet
    - `Common/` - Modelos comunes y código compartido
    - `Infrastructure/` - Solicitudes HTTP y cliente GraphQL
    - `BuildProcesses/` - Scripts y utilidades para el proceso de compilación
  - `CloudWalletDemo/` - Implementación de ejemplo
    - `Scenes/` - Escenas de demostración
    - `Plugin/` - Archivos específicos del plugin
      - `Android/` - Configuraciones específicas para Android

- Archivos de configuración:
  - `package.json` - Configuración del paquete UPM
  - `manifest.json` - Dependencias del paquete Unity
  - `README.md` - Documentación del proyecto
  - `LICENSE` - Información de licencia

### Aplicación de Ejemplo
El directorio `Assets/CloudWalletDemo/` contiene una aplicación de ejemplo completa que demuestra cómo usar el SDK:

- `Assets/CloudWalletDemo/` - Aplicación Unity de ejemplo
  - Contiene una implementación funcional del SDK
  - Demuestra casos de uso comunes y mejores prácticas
  - Incluye escenas de ejemplo para diferentes plataformas
  - Muestra la configuración adecuada para Android e iOS
  - Puede usarse como referencia para implementar el SDK en tus propias aplicaciones

### Dependencias
El SDK requiere varias dependencias internas para funcionar correctamente:

- Bibliotecas relacionadas con GraphQL
  - GraphQL.Client.Abstractions.dll
  - GraphQL.Client.Abstractions.Websocket.dll
  - GraphQL.Client.Serializer.Newtonsoft.dll
  - GraphQL.Client.dll
  - GraphQL.Primitives.dll

- Bibliotecas del sistema
  - Microsoft.Bcl.AsyncInterfaces.dll
  - Newtonsoft.Json.dll
  - System.Reactive.dll
  - System.Reactive.* 