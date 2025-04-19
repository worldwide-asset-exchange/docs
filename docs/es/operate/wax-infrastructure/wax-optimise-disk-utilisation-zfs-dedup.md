---
title: Optimizar la Utilización del Disco con Deduplicación ZFS
---

Ejecutar nodos de producción de WAX Mainnet puede consumir muchos recursos. Teniendo en cuenta que muchos operadores se esfuerzan por proporcionar Nodos Completos con un historial completo de bloques, los requisitos de almacenamiento pueden ser un desafío ya que están en constante expansión.

Esta guía explicará cómo optimizar la utilización del disco utilizando la Deduplicación ZFS en múltiples nodos WAX.

# Optimizar la Utilización del Disco con Deduplicación ZFS

En su mayor parte, el software de WAX está diseñado para usar solo un hilo y no necesariamente utilizará todos los recursos disponibles. Si tu hardware operativo tiene suficiente CPU, RAM y almacenamiento, puede ser bastante económico ejecutar múltiples nodos WAX en un solo servidor físico. Esto se puede lograr utilizando Máquinas Virtuales, Contenedores o Baremetal puro con diferentes puertos TCP de servicio.

Con múltiples nodos ejecutándose en el mismo servidor, el primer desafío suele ser la cantidad de espacio en disco requerida, ya que todos los datos deben duplicarse. Los datos de bloques son actualmente 4TB y los datos de state-history son actualmente 11TB (octubre de 2024), duplicar esto en un solo servidor requeriría una cantidad sustancial de disco.

Afortunadamente, esto se puede mitigar utilizando la Deduplicación ZFS.

## Zettabyte File System (ZFS)

ZFS ([Zettabyte File System](https://docs.oracle.com/cd/E19253-01/819-5461/index.html)) es un sistema de archivos avanzado y altamente escalable que fue desarrollado originalmente por Sun Microsystems (ahora propiedad de Oracle Corporation) para el sistema operativo Solaris. Está diseñado para abordar las limitaciones de los sistemas de archivos tradicionales y proporcionar características como integridad de datos, protección de datos y alta capacidad de almacenamiento.

Debido a sus características avanzadas y robustez, ZFS ha ganado popularidad en diversos entornos, incluidos centros de datos, servidores de archivos y dispositivos de almacenamiento. También se ha portado a otros sistemas operativos como Linux y FreeBSD, proporcionando una solución de almacenamiento versátil y confiable.

## Deduplicación ZFS

La función de deduplicación ofrecida por ZFS permite la eliminación de datos redundantes dentro de los pools/sistemas de archivos ZFS. En nuestro caso, tenemos una cantidad considerable de datos duplicados almacenados en las carpetas de bloques y state-history, solo se conservará una única copia de estos archivos. Las instancias restantes funcionarán como referencias a esa copia de datos original. Este enfoque conserva significativamente el espacio en disco dentro del pool ZFS de tu servidor físico configurado.

Desde una perspectiva técnica, cuando copias, mueves o creas nuevos datos dentro de tu pool/sistema de archivos ZFS, ZFS los divide en fragmentos más pequeños y compara estos fragmentos con los existentes almacenados. Al identificar coincidencias entre los fragmentos, incluso si solo partes de los datos corresponden, la función de deduplicación reduce eficazmente el consumo de espacio en disco.

En nuestro caso de uso, el consumo de espacio en disco de las carpetas de bloques y state-history se reducirá a la mitad al ejecutar dos nodos en un solo servidor.

## Configuración

Este ejemplo cubrirá dos instancias de nodos WAX en un solo servidor baremetal y, de manera similar a la [Guía de Configuración de un Nodo Sólido WAX Mainnet](https://developer.wax.io/es/operate/wax-infrastructure/wax-mainnet-node.html), utiliza **2 Sistemas de Discos Discretos** en este servidor para equilibrar la E/S del disco.

**Disco 1** es el SSD o NVMe de grado empresarial de alta velocidad y será el disco del SO utilizado para el software WAX, toda la configuración y los archivos de estado. Se requiere que cada instancia de nodo tenga sus propios archivos de estado, normalmente es más fácil colocar todos los archivos para cada instancia de nodo en un directorio separado y ejecutarlos con diferentes puertos TCP de servicio.

**Disco 2** es una matriz de discos SAS de 4 unidades de 4TB (ajusta el tamaño del disco a una capacidad adecuada para las condiciones actuales de la cadena) que alojará un directorio `\blocks` separado para cada instancia de nodo.

El Disco 2 ejecutará el **Sistema de Archivos ZFS**, lo que nos dará tres beneficios principales. ZFS nos permitirá usar la **compresión LZ4** para ahorrar espacio, la E/S del disco se mejorará con **Adaptive Replacement Cache** (ARC) y la utilización del disco se optimizará con **Deduplicación**.

Implementa ZFS en el Disco 2 con la siguiente configuración:

```bash
# Instalar ZFS
$ sudo apt-get install zfsutils-linux

# Localizar los nombres de dispositivo del Disco 2
$ lsblk

# Crear Pool ZFS llamado "datavolume" en los dispositivos localizados
$ sudo zpool create -f -o ashift=12 datavolume /dev/sde /dev/sdf /dev/sdg /dev/sdh

# Habilitar compresión LZ4
$ sudo zfs set compression=lz4 datavolume

# Deshabilitar actualizaciones de tiempo de acceso ZFS
$ sudo zfs set atime=off datavolume

# Establecer Atributos Extendidos ZFS a Atributo de Sistema para Rendimiento
$ sudo zfs set xattr=sa datavolume

# Establecer ARC para almacenar en caché solo metadatos
$ sudo zfs set primarycache=all datavolume

# Habilitar Deduplicación ZFS
$ sudo zfs set dedup=on datavolume

# Establecer la ubicación del punto de montaje en tu ubicación preferida
$ sudo zfs set mountpoint=/home/eosphere/datavolume datavolume
```

## Verificación

Ahora que se ha creado un pool de 16TB, copia o sincroniza tus `/blocks` en el punto de montaje `/datavolume`, asegurándote de usar dos carpetas separadas para cada instancia de nodo, como `/datavolume/node1blocks` y `datavolume/node2blocks`, obviamente referenciadas correctamente en el `config.ini` de nodeos. ZFS Dedup reconocerá la duplicación de datos en los dos directorios en el pool datavolume.

**Verificar Compresión LZ4:**

```bash
$ zfs get ratio

NAME                             PROPERTY       VALUE  SOURCE
datavolume                       compressratio  1.25x  -
```

La compresión ZFS LZ4 funciona como se esperaba con un saludable 1.25x en un `blocks.log` de nodeos.

**Verificar Rendimiento de Deduplicación:**

```bash
$ zpool list

NAME        SIZE   ALLOC  FREE   CKPOINT   EXPANDSZ    FRAG    CAP  DEDUP    HEALTH  ALTROOT
datavolume  14.5T  2.57T  11.9T        -         -     5%      17%  2.00x    ONLINE  -
```

La deduplicación funciona como se anuncia, esencialmente deduplicando ambas instancias de nodo de datos de bloques comprimidos LZ4 de 2.57TB -> **DEDUP 2.00x**

**Verificar Utilización de Memoria de Deduplicación:**

```bash
$ zpool status -D datavolume

  pool: datavolume
 state: ONLINE
  scan: scrub repaired 0B in 00:02:40 with 0 errors on Sun May 14 00:26:43 2023
config:

 NAME               STATE     READ WRITE CKSUM
          datavolume       ONLINE       0     0     0
          sde              ONLINE       0     0     0
          sdf              ONLINE       0     0     0
          sdg              ONLINE       0     0     0
          sdh              ONLINE       0     0     0
errors: No known data errors

dedup: DDT entries 25353378, size 1.06K on disk, 350B in core

bucket              allocated                       referenced
______   ______________________________   ______________________________
refcnt   blocks   LSIZE   PSIZE   DSIZE   blocks   LSIZE   PSIZE   DSIZE
------   ------   -----   -----   -----   ------   -----   -----   -----
     1    2.47K    317M   24.7M   24.7M    2.47K    317M   24.7M   24.7M
     2    24.2M   3.02T   2.45T   2.45T    48.3M   6.04T   4.91T   4.91T
     4    6.75K    864M    544M    544M    27.0K   3.38G   2.13G   2.13G
     8        1    128K      4K      4K       10   1.25M     40K     40K
    16        5    640K     20K     20K      136     17M    544K    544K
    32       24      3M    924K    924K    1.01K    129M   38.8M   38.8M
    2K        2    256K      8K      8K    5.82K    745M   23.3M   23.3M
 Total    24.2M   3.02T   2.45T   2.45T    48.4M   6.05T   4.91T   4.91T
```

La utilización de la memoria se puede determinar mediante la siguiente ecuación:

Entradas DDT x Core / 1024²

25353378 * 350 / (1024²) = **8462MB RAM Usados**

**Verificar la E/S del disco del pool ZFS:**

```bash
$ zpool iostat
              capacity     operations     bandwidth
pool        alloc   free   read  write   read  write
----------  -----  -----  -----  -----  -----  -----
datavolume  2.57T  11.9T      9     27  1.39M  2.39M
----------  -----  -----  -----  -----  -----  -----
```

La salida anterior corresponde a ambos nodos ejecutándose y sincronizados con la red.

Mientras investigaba y realizaba pruebas para esta guía, parece haber bastante desinformación sobre la Deduplicación ZFS. A menudo se descarta Dedup por ser intensiva en CPU, RAM y E/S de disco.

En nuestra experiencia, funciona muy bien para aliviar el uso innecesario de disco del directorio `/blocks`, especialmente en entornos de Máquinas Virtuales en servidores más grandes. La sobrecarga parece ser bastante manejable, siendo la mayor la RAM, que es de alrededor de 1GB / TB de disco, la CPU y la E/S del disco no se vieron afectadas.

También es posible usar la [clonación ZFS](https://docs.oracle.com/cd/E19253-01/819-5461/gbcxz/index.html) para esencialmente clonar datos sin duplicarlos en el disco. Sin embargo, la clonación ZFS es un proceso manual a menos que se automatice y requiere que se ejecute una reclonación cada cierto tiempo para recuperar datos duplicados.

---

Estas **Guías Técnicas para Desarrolladores de WAX** se crean utilizando material fuente de la [Serie de Guías Técnicas de WAX de EOSphere](https://medium.com/eosphere/wax-technical-how-to/home)

Asegúrate de hacer cualquier pregunta en el [Telegram de EOSphere](https://t.me/eosphere_io) 