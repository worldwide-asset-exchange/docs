---
title: Guía rápida de WaxJS
order: 3
---

::: warning
WaxJS ya no cuenta con soporte. Usa [WharfKit](/build/developing-apps/sdks/wharfkit/) para integrar billeteras en tu aplicación.
:::

# Guía rápida de WaxJS

Cuando los usuarios se registran o inician sesión en Cloud Wallet, automáticamente se crea una Cuenta de Blockchain de WAX. Los usuarios pueden gestionar fácilmente sus recursos, transacciones de blockchain, NFTs y dApps en la lista blanca desde el panel de Cloud Wallet.

En esta guía, aprenderás cómo usar **WaxJS** para conectarte a Cloud Wallet, lo que te permitirá:

* Iniciar sesión de usuarios con Google, Facebook, Twitter, KakaoTalk, Reddit y otras plataformas sociales
* Obtener nombres de cuentas de blockchain, claves públicas y permisos
* Ejecutar fácilmente transacciones de contratos inteligentes desde tu cliente

:::tip 📝 Nota
En las siguientes secciones, repasaremos cómo funciona todo. Si deseas ir directamente al código y ejecutar nuestro ejemplo en vivo de WaxJS, consulta [Demostración de WaxJS](/es/build/cloud-wallet/waxjs/waxjs_demo).
:::

## Antes de Comenzar

* Crea una [Cuenta de Cloud Wallet](http://all-access.wax.io).
* Familiarízate con la API de JavaScript eosjs. Consulta la documentación de [eosjs](https://eosio.github.io/eosjs/latest) para más información.
* Para consejos sobre construcción y despliegue de contratos inteligentes en la Blockchain de WAX, consulta nuestra sección de [Desarrollo de dApp](/es/build/dapp-development/).
