---
title: Monitorizar y Desregistrar Productor WAX con systemd Mientras Duermes
original: https://bountyblok.medium.com/monitor-and-unregister-wax-producer-with-systemd-while-you-sleep-a97b45a45449
---

# Monitorizar y Desregistrar Productor WAX con systemd Mientras Duermes

![image](https://github.com/user-attachments/assets/3270300b-e1ac-4c20-919a-ec1c42fbc5d6)

## Introducción

Monitorizar un productor de bloques por rondas perdidas es crucial para mantener la integridad y el rendimiento de una red blockchain. Los productores de bloques son responsables de validar y producir nuevos bloques, asegurando que la red funcione sin problemas y de forma segura. Si un productor pierde rondas, puede provocar retrasos en la creación de bloques, posibles vulnerabilidades de seguridad y una pérdida de reputación dentro de la red.

En este artículo, configuraremos un sistema para monitorizar un productor de bloques WAX y desregistrarlo si deja de firmar bloques. Lograremos esto creando un script bash y ejecutándolo como un servicio systemd.

Antes de comenzar, es importante entender por qué un productor de bloques podría perder rondas. Hay varias causas posibles, incluidas las interrupciones del centro de datos, que pueden interrumpir el funcionamiento continuo de los servidores. Los problemas de suministro eléctrico, como un fusible disparado (nos pasó a nosotros), pueden desconectar equipos esenciales como routers y redes, lo que provoca problemas de conectividad.

Además, fallos de hardware, errores de software o errores de configuración también pueden resultar en rondas perdidas.

## VALE, VAMOS ALLÁ

Cuando un productor de bloques se desconecta, ya no aparece en los logs, por lo que podemos usar esto como un mecanismo de seguimiento para detectar el tiempo de inactividad.

Agradecimientos especiales a Mike D | WAXDAO ❤

### Paso 1: Crear el Script Bash

Primero, necesitamos crear un script bash que monitorizará el archivo nodeos.log y comprobará si nuestro productor aparece en los logs.

1. Crea el script `/usr/local/bin/monitor_producer.sh`:

```bash
sudo nano /usr/local/bin/monitor_producer.sh 
```

Sí, nano 💀

2. Añade el siguiente contenido al script:

```bash
#!/bin/bash

# Usar variables de entorno pasadas desde el archivo de servicio systemd
LOG_FILE=${LOG_FILE}
PRODUCER_NAME=${PRODUCER_NAME}
UNREG_SCRIPT=${UNREG_SCRIPT}
MAX_COUNT=${MAX_COUNT}

# Inicializar un contador para el productor
count=0

# Función para ejecutar el script de desregistro
unregister_producer() {
    echo "$(date): El productor $PRODUCER_NAME perdió una ronda. Ejecutando script de desregistro."
    $UNREG_SCRIPT
    exit 0
}

# Validar la existencia del archivo de log
if [ ! -f "$LOG_FILE" ]; then
    echo "Archivo de log $LOG_FILE no encontrado. Saliendo."
    exit 1
fi

tail -f "$LOG_FILE" | while read -r line; do
    if [[ $line == *"producer_plugin"* && $line == *"on_incoming_block"* ]]; then
        ((count++))
        echo "$(date): Contador actual = $count"

        if [[ $line == *"$PRODUCER_NAME"* ]]; then
            count=0
            echo "$(date): Reiniciando contador, bloque firmado por $PRODUCER_NAME"
        fi

        if [ $count -ge $MAX_COUNT ]; then
            unregister_producer
        fi
    fi
done
```

3. Haz el script ejecutable:

```bash
sudo chmod +x /usr/local/bin/monitor_producer.sh
```

### Paso 2: Crear el Archivo de Servicio Systemd

A continuación, crearemos un archivo de servicio systemd para gestionar el script.

1. Crea el archivo de servicio:

```bash
sudo nano /etc/systemd/system/monitor_producer.service
```

Sigue siendo nano 💀💀 

2. Añade el siguiente contenido al archivo de servicio:

```ini
[Unit]
Description=Script de Monitorización de Productor
After=network.target

[Service]
Environment="LOG_FILE=/ruta/a/nodeos.log"
Environment="PRODUCER_NAME=tu_nombre_de_productor"
Environment="UNREG_SCRIPT=/ruta/a/unregprod.sh"
Environment="WAX_API_URL=https://api.waxsweden.org"
Environment="MAX_COUNT=350"
ExecStart=/usr/local/bin/monitor_producer.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

**WAX_API_URL**: Puedes encontrar una lista de Endpoints de API WAX aquí: https://validate.eosnation.io/wax/reports/endpoints.html

**MAX_COUNT**: La justificación de 350 líneas es porque hay alrededor de otros 20 productores de bloques que producirán 12 bloques cada uno en 1 ronda, lo que equivale aproximadamente a 240 líneas en los logs. Así que 350 es solo un número mayor que 240 pero menor que 480, lo que implica que queremos desregistrar después de perder 1 ronda.

Si quieres desregistrar solo después de perder 3 rondas, necesitarías aumentar este número a algo más alto como 750+.

### Paso 3: Habilitar e Iniciar el Servicio

Después de crear el archivo de servicio, necesitamos habilitar e iniciar el servicio.

1. Recarga systemd e inicia el nuevo servicio:

```bash
sudo systemctl daemon-reload
sudo systemctl enable monitor_producer.service
sudo systemctl start monitor_producer.service # Añadido para iniciar el servicio
sudo systemctl status monitor_producer.service
```

2. Visualiza los logs del servicio en tiempo real:

```bash
sudo journalctl -u monitor_producer.service -f
```

### Paso 4: Script Unregprod

En este punto, estás escuchando los logs por rondas perdidas, pero ahora necesitamos configurar el script `unregprod`.

Este script hará 2 cosas: desbloquear tu cleos y desregistrar a tu productor.

1. Crea el script:

```bash
sudo nano /usr/local/bin/unregprod.sh
```

2. Añade el siguiente contenido al script:

```bash
#!/bin/bash

# Lee la contraseña de la wallet desde un archivo seguro
WALLET_PASSWORD=$(cat /ruta/a/wallet_password.txt)
WAX_API_URL=${WAX_API_URL}
PRODUCER_NAME=${PRODUCER_NAME}

# Desbloquear la wallet
cleos wallet unlock --password $WALLET_PASSWORD

# Desregistrar al productor
cleos --url $WAX_API_URL system unregprod $PRODUCER_NAME
```

Asegúrate de que solo el propietario (el usuario que ejecuta el servicio) pueda leer el archivo de contraseña de la wallet; para este ejemplo, lo establecemos como root:

```bash
sudo chown root:root /ruta/a/wallet_password.txt # Actualizado la ruta
sudo chmod 600 /ruta/a/wallet_password.txt # Actualizado la ruta
```

3. Haz el script ejecutable:

```bash
sudo chmod +x /usr/local/bin/unregprod.sh
```

## Otras Soluciones

Existen otras herramientas disponibles como unregbot de sentnl.io, otro Productor de Bloques de WAX Mainnet. [Unregbot](https://github.com/ankh2054/unregbot) es una herramienta automatizada de desregistro de productores que monitoriza bloques perdidos para productores de mainnet y testnet. Si se detectan rondas perdidas, desregistrará automáticamente al productor y opcionalmente enviará un mensaje a través de Pushover. Se puede ejecutar a través de Docker o ejecutando el código JavaScript, requiriendo una clave privada de desregistro configurada (no la clave de propietario o activa).

Puedes encontrar más información aquí: https://github.com/ankh2054/unregbot ❤

## Resumen

Siguiendo estos pasos, configurarás un servicio systemd que monitoriza a tu productor de bloques WAX y lo desregistra si deja de firmar bloques.

La contraseña de la wallet se almacena de forma segura en un archivo con permisos restringidos y es leída por el script, garantizando una mejor seguridad y mantenibilidad.

Esta configuración asegura que si tu productor de bloques ya no firma o produce bloques, procederá a desregistrarse del top 21 para minimizar el impacto en la red y darte a ti y a tu equipo tiempo para averiguar la causa.

Siéntete libre de ajustar las rutas y variables para que se ajusten a tu entorno y requisitos específicos. 