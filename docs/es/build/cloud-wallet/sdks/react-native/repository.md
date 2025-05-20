---
layout: doc
title: Repositorio del SDK de React Native
description: Repositorio del SDK de React Native
---

# Repositorio
URL: https://github.com/worldwide-asset-exchange/sdk-react-native

## Estructura del repositorio

### Directorio raíz
El directorio raíz contiene el código fuente del SDK y los archivos de configuración:

- `src/` - Código fuente principal del SDK
  - `base/` - Componentes base y utilidades
  - `config/` - Archivos de configuración
  - `constants/` - Valores constantes y enums
  - `contexts/` - Contextos de React para la gestión de estado
  - `services/` - Implementaciones de la capa de servicios
  - `types/` - Definiciones de tipos TypeScript
  - `utils/` - Funciones utilitarias
  - `__tests__/` - Archivos de pruebas
  - `index.tsx` - Punto de entrada principal

- Archivos de configuración:
  - `package.json` - Dependencias y scripts del proyecto
  - `tsconfig.json` - Configuración de TypeScript
  - `rollup.config.js` - Configuración de build
  - `babel.config.js` - Configuración de Babel
  - `jest.config.ts` - Configuración de pruebas

### Aplicación de ejemplo
El directorio `packages/dapp-example/` contiene una aplicación de ejemplo completa que demuestra cómo usar el SDK:

- `packages/dapp-example/` - Aplicación de ejemplo en React Native
  - Contiene una implementación funcional del SDK
  - Demuestra casos de uso comunes y buenas prácticas
  - Puede usarse como referencia para implementar el SDK en tus propias aplicaciones