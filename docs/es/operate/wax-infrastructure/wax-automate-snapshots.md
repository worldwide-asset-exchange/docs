---
title: Automatizar Snapshots de WAX
---

Ya sea reiniciando un nodo que se apagó incorrectamente, iniciando un nodo ligero o utilizando la [estrategia de memoria tmpfs](https://developer.wax.io/es/operate/wax-infrastructure/wax-ram-disk-utilisation) para un mejor rendimiento, se necesitan **snapshots de nodeos** para devolver la base de datos de estado de la cadena a un punto válido en el tiempo para que el nodo pueda volver a unirse y sincronizarse con la red.

_La base de datos de estado de la cadena_ `shared_memory.bin` _es necesaria para que `nodeos` funcione; es un archivo mapeado en memoria que contiene el estado asociado con cada bloque, incluidos los datos de contratos inteligentes, detalles de cuentas y transacciones diferidas._

Si estás familiarizado con el ecosistema de WAX Guild, sabrás que existen numerosos proveedores de snapshots confiables. Sin embargo, la mejor práctica sería que un Guild de primer nivel creara sus propios snapshots y potencialmente los compartiera con el resto de la comunidad.

Esta guía compartirá el método de scripting que utiliza EOSphere Guild para crear y gestionar snapshots. En el momento de escribir esto, Leap v5.0.3 está disponible con [funcionalidad de snapshot ampliada](https://github.com/eosnetworkfoundation/product/blob/main/api-http/proposals/snapshot-api.md) integrada en el `eosio::producer_api_plugin` que puede lograr lo mismo que el método de EOSphere; esto se cubrirá en una guía futura.

# Automatizar Snapshots de WAX

Antes de crear un snapshot, debe mencionarse que el nodo esencialmente se pausará durante el proceso; dependiendo del tamaño de la base de datos de estado de la cadena (actualmente 90 GB en WAX Mainnet), esto puede llevar algún tiempo.

Con esto en mente, se recomienda utilizar un servidor dedicado que no esté en producción para crear snapshots.

# Instalación, Configuración y Ejecución

En este ejemplo, el objetivo es:

- Configurar nodeos
- Configurar script de snapshot
- Configurar script de eliminación
- Configurar un CronJob

## Configurar nodeos

Se utiliza un nodo WAX sincronizado con el `eosio::producer_api_plugin` habilitado como servidor de snapshots. Configúralo como se indica a continuación:

```ini
> nano config.ini

plugin = eosio::producer_api_plugin
```

Los snapshots se guardarán en la carpeta `/snapshots`. Asegúrate de que haya suficiente espacio en disco disponible.

Consulta [Cómo Configurar un Nodo Sólido WAX Mainnet](https://developer.wax.io/es/operate/wax-infrastructure/wax-mainnet-node) para obtener una guía sobre la construcción, configuración y operación de nodos WAX.

## **Configurar script de snapshot**

Este script logrará lo siguiente en el nodo de snapshot:

- Tomar Snapshot
- Etiquetar snapshot con el número de bloque actual
- Archivar snapshot
- Transferir snapshot al repositorio

Añadir aplicaciones de dependencia:

```bash
> sudo apt update

# jq es un procesador JSON de línea de comandos ligero y flexible
> sudo apt install jq

# Compresión de datos sin pérdida Zstandard
> sudo apt install zstd
```

Crea el script de snapshot como se indica a continuación, ajustándolo a tu entorno:

```bash
> nano snapshot.sh

#!/bin/bash

logs='/home/eosphere/scripts/logs'
now=$(date +"%Y-%d-%m_%H-%M")
logfile="$logs/$now.txt"

echo $logfile
echo "Crear snapshot" >> $logfile

result=$(curl -X POST http://127.0.0.1:8888/v1/producer/create_snapshot) >> $logfile

head_block=$(echo "$result" | jq -r '.head_block_id')
snap_name=$(echo "$result" | jq -r '.snapshot_name')

echo $head_block >> $logfile
echo $snap_name >> $logfile

block_num=$(/home/eosphere/wax-leap/build/programs/cleos/cleos -u https://wax.eosphere.io get block "$head_block" | jq '.block_num')

echo $block_num >> $logfile

outfile="/home/eosphere/scripts/snapshot-wax-$block_num-$now.bin.zst"

echo "Crear imagen comprimida" >> $logfile

/usr/bin/zstd -z -T1 "$snap_name" -o "$outfile" >> $logfile

echo "Copiar al repositorio" >> $logfile

/usr/bin/rsync -e "ssh -i /home/eosphere/.ssh/mrsnapshot.pem" -a --progress "$outfile" "mrsnapshot@10.0.0.101:/home/mrsnapshot/snapshots/wax/" >> $logfile

echo "Completo" >> $logfile

> chmod +x snapshot.sh
```

En el script de ejemplo anterior:

- Los logs se almacenan aquí `/home/eosphere/scripts/logs`
- El binario de cleos se encuentra aquí `/home/eosphere/wax-leap/build/programs/cleos/cleos`
- El snapshot comprimido y etiquetado se almacena aquí `/home/eosphere/scripts`
- El snapshot comprimido y etiquetado creado se copia a un repositorio `10.0.0.101` utilizando un certificado ssh `mrsnapshot.pem` y un nombre de usuario `mrsnapshot`

El script se ejecuta como se indica a continuación:

```bash
> ./snapshot.sh
```

## Configurar script de eliminación

Para garantizar que el nodo de snapshot no se quede sin espacio en disco, los snapshots antiguos se eliminan con el siguiente script:

```bash
> nano delete.sh

#! /bin/bash
/usr/bin/find /home/eosphere/datavolume1/waxdata1/snapshots -name "*.bin" -type f -mtime +1 -exec rm -f {} \;
/usr/bin/find /home/eosphere/scripts -name "*.zst" -type f -mtime +2 -exec rm -f {} \;

> chmod +x delete.sh
```

En el script anterior:

- Los snapshots .bin sin procesar de nodeos se eliminan después de un día (-mtime +1)
- Los snapshots comprimidos y etiquetados se eliminan después de 2 días (-mtime +2)

El script se ejecuta como se indica a continuación:

```bash
> ./delete.sh
```

## Configurar un CronJob

Ejecutar un CronJob es una excelente manera de programar regularmente los scripts de snapshot y eliminación. Para ejecutar una vez al día, configúralo como se indica a continuación:

```cron
> crontab -e

0 12 * * * /home/eosphere/scripts/snapshot.sh
0 16 * * * /home/eosphere/scripts/delete.sh
```

En el CronJob anterior:

- snapshot.sh se ejecuta una vez al día a las 12h00
- delete.sh se ejecuta una vez al día a las 16h00

La colección de snapshots comprimidos y etiquetados se puede compartir con la comunidad desde el repositorio utilizando una página web HTML básica como [EOSphere Snapshot and Backups](https://snapshots.eosphere.io/)

---

Estas **Guías Técnicas para Desarrolladores de WAX** se crean utilizando material fuente de la [Serie de Guías Técnicas de WAX de EOSphere](https://medium.com/eosphere/wax-technical-how-to/home)

Asegúrate de hacer cualquier pregunta en el [Telegram de EOSphere](https://t.me/eosphere_io) 