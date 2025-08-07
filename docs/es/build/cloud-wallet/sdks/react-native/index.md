---
layout: doc
title: SDK de React Native
description: SDK de React Native
---

# SDK de React Native
## Descripción general del SDK de WAX Cloud Wallet

El SDK de React Native para WAX Cloud Wallet permite una integración fluida entre aplicaciones descentralizadas (dApps) y la aplicación móvil de WAX Cloud Wallet. Este SDK proporciona a los desarrolladores una solución robusta para implementar transacciones en la blockchain dentro de sus aplicaciones React Native, ofreciendo dos modos de conexión flexibles:
   1. **Modo WebSocket**: Permite la comunicación entre dispositivos entre tu dApp y la aplicación WAX Cloud Wallet. Este modo es ideal para escenarios donde los usuarios desean firmar transacciones usando su app de WAX Cloud Wallet en un dispositivo diferente al que ejecuta la dApp.
   2. **Modo Directo**: Proporciona integración directa cuando tanto la dApp como la app de WAX Cloud Wallet están instaladas en el mismo dispositivo, ofreciendo una experiencia fluida y nativa mediante deep linking.

El SDK abstrae la complejidad de las interacciones con la blockchain, permitiendo a los desarrolladores centrarse en crear excelentes experiencias de usuario mientras se garantiza la firma segura de transacciones y la autenticación de usuarios.

## Características principales

### Flexibilidad de conexión

Múltiples modos de conexión

- Comunicación entre dispositivos basada en WebSocket
- Integración directa para escenarios en el mismo dispositivo

### Gestión de transacciones
**1. Firma segura de transacciones**
  - Comunicación cifrada de extremo a extremo
  - Seguimiento del estado de la transacción

**2. Autenticación y seguridad**
  - Autenticación segura de usuarios
  - Transferencia de datos cifrada

**3. Experiencia para desarrolladores**
  - Integración sencilla
    - Configuración mínima requerida
    - Soporte completo para TypeScript
  - Sistema de eventos
    - Actualizaciones en tiempo real del estado de la conexión
    - Notificaciones de eventos de transacción

**4. Soporte multiplataforma**
   - Compatibilidad con iOS y Android
   - API consistente en todas las plataformas
   - Rendimiento nativo