---
title: Uso de instantáneas de WAX
order: 143
---

### Uso de instantáneas (snapshots) de WAX

Probablemente hayas notado que sincronizar con una cadena de bloques que ha estado funcionando durante millones de bloques puede llevar bastante tiempo. Afortunadamente, la sincronización puede acelerarse utilizando una instantánea válida existente de la base de datos del estado de la cadena.

En este artículo aprenderás cómo hacer uso de las instantáneas y cómo crearlas tú mismo.

## Cómo usar las instantáneas de WAX

Una instantánea válida se puede utilizar para sincronizar un proceso de `nodeos` de WAX hasta un bloque deseado en el inicio mediante el uso de un archivo de instantánea para recrear una base de datos de estado de cadena válida.

Esto evita la necesidad de construir la base de datos de estado bloque por bloque desde el bloque #1, lo cual lleva tiempo para ponerse al día con el bloque de cabecera de la cadena, que puede estar en los millones o más.

### Explicación

La base de datos de estado de cadena `shared_memory.bin` es necesaria por `nodeos` para ejecutarse. Es un archivo mapeado en memoria que contiene el estado asociado con cada bloque, incluidos los datos de contratos inteligentes, detalles de cuentas y transacciones diferidas.

Sin embargo, hay una advertencia. Dependiendo de la función que requieras de tu nodo, por ejemplo, ejecutarlo como un nodo semilla P2P o como un nodo API completamente funcional, también necesitarás los correspondientes `blocks.log` completos desde el bloque #1 para poder proporcionar la cadena "completa".

También se debe mencionar que la funcionalidad de Historial V1, ahora depreciada, no se conserva en una instantánea y requerirá una reproducción completa.

Es posible ejecutar `nodeos` sin ningún `blocks.log` con un archivo de instantánea actual, pero este nodo no se consideraría "completo" y típicamente solo se utilizaría para consultar información de cadena actual y enviar acciones.

Idealmente, las instantáneas deben usarse con un `blocks.log` asociado que contenga un número de bloque de cabecera más alto. Por lo tanto, un bloque inferior en la instantánea y un bloque superior en `blocks.log` cuando inicies `nodeos`.

#### Escenario común

El uso más común para una instantánea es recuperarse de un nodo detenido incorrectamente... fallo de energía, falta de memoria, proceso interrumpido, etc.

`nodeos` debe salirse de manera grácil, de lo contrario, la base de datos de estado puede corromperse mostrando este error desagradable: "Bandera de suciedad de la base de datos establecida (probablemente debido a un apagado incorrecto): se requiere reproducción".

### Localización de una instantánea

En primer lugar, necesitas obtener un archivo de instantánea válido de una fuente confiable. Hay varios servicios de instantáneas de WAX proporcionados por los Gremios de WAX, incluido [EOSphere](https://snapshots.eosphere.io/), sin embargo, no todos proporcionan instantáneas de la red de prueba, así que es posible que necesites buscar un poco.

::: tip 📝 Nota
En el [directorio de snapshots de WAX Mainnet de EOSphere](https://store3.eosphere.io/wax/snapshots/), elige un archivo compatible con tu versión de `nodeos`.
:::

### Uso

Utilizando el ejemplo de construcción de `nodeos` en el [anterior](/operate/wax-infrastructure/wax-testnet-node) WAX Technical How To, todos los archivos relevantes se encuentran en `~/waxdata`.

Descarga y descomprime el archivo de instantánea deseado:

```sh
sudo apt install zstd
cd ~/waxdata/snapshots
wget http://snapshots.eosphere.io/snapshots/wax/snapshot.bin.zst
unzstd snapshot.bin.zst
```

Elimina la base de datos de estado existente (si la hay) y los bloques reversibles:

```sh
rm -r ~/waxdata/state
rm -r ~/waxdata/blocks/reversible
```

Inicia `nodeos` desde la instantánea descargada (observa que no se especifica el `genesis.json`):

```sh
nodeos --data-dir ~/waxdata --config-dir ~/waxdata --snapshot ~/waxdata/snapshots/snapshot.bin
```

`nodeos` ahora se iniciará desde una instantánea e intentará sincronizarse con la cadena activa desde el bloque de cab

ecera capturado en el archivo de instantánea utilizado. El `blocks.log` también se continuará desde el número de bloque de la instantánea, por eso es importante asegurarse de que haya un bloque inferior en la instantánea y un bloque superior en `blocks.log` para evitar lagunas.

### Generación de instantáneas

La forma más consciente de la seguridad de usar instantáneas es crear y usar las tuyas propias. Tal vez incluso proporcionar un servicio de hospedaje de archivos de instantáneas para el resto del ecosistema de WAX para que lo utilice.

`nodeos` requiere un complemento de API del productor configurado para habilitar la generación de instantáneas. Agrega lo siguiente al final de tu `config.ini`:

```ini
plugin = eosio::producer_api_plugin
```

:::warning
Exponer el complemento `producer_api_plugin` públicamente es un riesgo de seguridad y puede ser explotado, el nodo utilizado para crear una instantánea no debe ser consultable públicamente.
:::

Genera una instantánea localmente usando la siguiente sintaxis, el archivo de instantánea se guardará por defecto en la carpeta de instantáneas:

```sh
curl -X POST http://127.0.0.1:8888/v1/producer/create_snapshot
```

Con esto, ahora sabes cómo utilizar y generar instantáneas en la red de WAX.