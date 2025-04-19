---
title: Cómo Realizar Airdrops de Tokens y NFTs en WAX
order: 98
---

# Cómo Realizar Airdrops de Tokens y NFTs en la Blockchain de WAX

## Introducción

Los airdrops son una forma popular de compartir tokens o NFTs con una gran audiencia, a menudo utilizados para promociones, recompensas o regalos. Ayudan a los proyectos a ganar atención, involucrar a su comunidad o mostrar aprecio a sus seguidores. En la blockchain de WAX, este proceso se facilita con Disperse. Funciona tanto con tokens fungibles como WAX o TLM como con tokens no fungibles (NFTs), permitiéndote gestionar distribuciones a gran escala de forma rápida y eficiente.

## Características Clave

### Características de Distribución de Tokens
- Procesamiento por lotes de transferencias de tokens desde archivos CSV
- Parámetros de token configurables (símbolo, decimales)
- Seguimiento del éxito de la transacción con IDs de Transacción
- Protección incorporada contra limitación de velocidad (rate limiting)
- Agrupación automática de transacciones

### Características de Distribución de NFTs
- Dos modos de transferencia:
  - Transferencias directas de NFT (IDs de activo específicos)
  - Transferencias basadas en plantillas (distribuir NFTs desde una plantilla)
- Agrupación automática de hasta 15 NFTs por transacción
- Integración con la API de Atomic Assets
- Optimización de transferencias basada en el destinatario

## Prerrequisitos

Antes de comenzar, asegúrate de tener:
- El runtime de Bun instalado
- Una cuenta activa de WAX con suficientes tokens/NFTs para la distribución
- La clave privada de tu cuenta WAX con permisos de transferencia

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/yourusername/disperse.git
cd disperse
```

2. Instala las dependencias requeridas:
```bash
bun install eosjs papaparse
```

## Configuración del Airdrop de Tokens

Crea o modifica `config.js` con los detalles de tu cuenta:

```javascript
export const config = {
  rpcApi: "https://wax.qaraqol.com",
  privateKey: "",  // Tu clave privada
  senderName: "",  // Tu cuenta WAX
  contractName: "alien.worlds", // Usa eosio.token para tokens WAX
  tokenName: "TLM",
  tokenPrecision: 4, // 8 para WAX, 4 para TLM
  memo: "Disperse",
};
```

### Preparando el CSV de Distribución de Tokens

Crea un archivo CSV (ej., `receivers.csv`) con las cuentas de los destinatarios y las cantidades:

```csv
receiverName,amount
cuenta1,100
cuenta2,50
cuenta3,75
```

## Configuración del Airdrop de NFTs

Para distribuciones de NFT, usa esta configuración:

```javascript
export const config = {
  rpcApi: "https://wax.greymass.com",
  atomicApi: "https://atomic-wax.qaraqol.com",
  privateKey: "",
  senderName: "",
  contractName: "atomicassets",
  memo: "",
  useTemplateMode: false,  // true para distribución basada en plantillas
  collection_name: "", 	// Requerido para el modo plantilla
  template_id: "",    	// Requerido para el modo plantilla
};
```

### Preparando el CSV de Distribución de NFTs

Para transferencias directas de NFT (`useTemplateMode: false`):
```csv
receiverName,asset_id
cuenta1,1099554645488
cuenta2,1099583135618
```

Para transferencias basadas en plantillas (`useTemplateMode: true`):
```csv
receiverName,amount
cuenta1,5
cuenta2,3
```

## Ejecutando el Airdrop

Ejecuta el script de distribución:
```bash
bun run app.js
```

El script hará lo siguiente:
1. Cargar y validar los datos del CSV
2. Agrupar transferencias para optimización
3. Procesar transacciones con retrasos incorporados
4. Registrar IDs de transacción y estado

## Uso Avanzado

### Configuración de Token Personalizada
Puedes modificar los parámetros del token para diferentes tokens:
- WAX: precisión 8, contrato "eosio.token"
- TLM: precisión 4, contrato "alien.worlds"

### Distribución por Plantilla de NFT
Cuando uses el modo plantilla:
1. Establece `useTemplateMode: true`
2. Especifica `collection_name` y `template_id`
3. Asegúrate de que haya suficientes activos de la plantilla disponibles
