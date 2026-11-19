---
título: Creando un bp.json
orden: 142
---

# Creando un bp.json

:::tip 📝 Nota
El estándar actual de bp.json está actualizado en el Repositorio de GitHub. Esta guía explicará todo lo que necesitas para empezar. Puedes encontrar las últimas actualizaciones en el [Repositorio](https://github.com/eosrio/bp-info-standard)
:::

## ¿Qué es un bp.json?

El bp.json contiene las piezas de información más importantes sobre el productor de bloques y sus nodos, como los puntos finales de la API, la ubicación geográfica, los contactos de emergencia y más. La forma estandarizada del bp.json facilita que empresas e individuos usen los nodos e información del productor de bloques. A través de este método, sitios como (bloks.io) pueden, por ejemplo, obtener la foto de perfil de tu gremio. Aquí hay algunos ejemplos de bp.json para la red principal de WAX:

- [https://eosnation.io/wax.json](https://eosnation.io/wax.json)
- [https://blacklusion.io/wax.json](https://blacklusion.io/wax.json)
- [https://waxsweden.org/wax.json](https://waxsweden.org/wax.json)

## Creando el bp.json

Puedes copiar el [bp.json de plantilla](https://github.com/eosrio/bp-info-standard/blob/master/bp.json) en tu editor de texto de elección.
Toda la información que debes completar debería ser bastante clara, sin embargo, cubriremos lo más importante de todos modos. Si necesitas más información, echa un vistazo al repositorio de GitHub mencionado anteriormente y lee algunos bp.json de otros gremios:

### Información General:

- **producer_account_name**: <br />
  Autoexplicativo. Sin embargo, si no estás familiarizado con el esquema de nombres en el ecosistema Antelope: Es importante notar que debes usar el nombre que también has usado (o planeas usar) para la acción “regproducer”. Esto significa que el nombre oficial de tu gremio puede diferir del nombre del gremio que usas en la cadena.

- **candidate_name**:<br />
  Este es el campo donde puedes llenar el nombre oficial de tu gremio. Se permiten espacios.

- **github_user**:<br />
  Importante: Lista al menos una cuenta de GitHub de tu equipo aquí. Estas cuentas podrían usarse potencialmente para darte acceso a repositorios privados.

- **chain_resources**:<br />
  Puedes listar un sitio web aquí, que contenga enlaces a tus recursos relacionados con la cadena, como sitios de snapshots o respaldos. No se permite un arreglo aquí.
- **other_resources**:<br />
  ¿Tienes herramientas o servicios impresionantes que estás proporcionando? Genial, puedes listar un arreglo que contenga todos los enlaces a los servicios bajo esta sección.

- **Cuentas sociales**:<br />
  Creo que no tenemos que explicar cómo llenar tu información social aquí. Sin embargo, es importante que alguien de tu gremio revise regularmente estas cuentas ya que así es como alguien puede contactarte en caso de emergencia.

### Nodos

- **Ubicación del Nodo**:<br />
  ¿Cómo obtener las coordenadas de los nodos? La forma más sencilla es usar [Google Maps](https://www.google.com/maps). Solo haz clic con el ratón en el mapa donde quieras tener la ubicación del nodo. Debería aparecer un pequeño popup, que contiene dos números. El primer número es la latitud y el segundo la longitud.
- **Tipo de Nodo**:<br />
  Elige **producer**, si estás listando un nodo productor. Elige **seed** si estás listando un nodo p2p. Elige **query** si estás listando un nodo API.

- **Características (solo si el tipo de nodo es query)**:<br />
  Es probable que no solo estés alojando una API de cadena “normal”, sino que también estés alojando servicios adicionales como Historial. Puedes especificar qué servicios estás alojando con la sección de características. Echa un vistazo aquí a las características disponibles y enuméralas en consecuencia. Tu configuración típica con Historial v1 & Hyperion & Wallet Api habilitado tendrá las siguientes características:

```json
["chain-api", "account-query", "history-v1", "hyperion-v2"]
```

Alojar una API de

Atomic Assets tendría el siguiente arreglo de características:

```json
["atomic-assets-api"]
```

- **Puntos finales**:<br />
  Autoexplicativo. Sin embargo, ten en cuenta que es posible que quieras producir en múltiples cadenas, por lo tanto, elegir dominios como “peer.waxproducer.io” no es adecuado. En su lugar, usa un dominio que contenga el nombre de la cadena. Como “peer1.wax.waxproducer.io”. Para tener una idea de qué dominios usar, echa un vistazo a los puntos finales en el [HerdCheck](https://herdcheck.blocdraig.com/wax/lists) de otros productores de bloques.

## bp.json para la red principal Y la red de pruebas

Dado que muchos productores de bloques están activos en múltiples cadenas (esto también es el caso cuando produces tanto en la red principal como en la red de pruebas), el bp.json no se llama realmente bp.json sino según el nombre de la cadena (nombres diferentes para la red de pruebas y la red principal). Entonces, para la red principal de WAX, esto sería “wax.json” y para la red de pruebas, por ejemplo, “wax-testnet.json” o "waxtest.json".

## Alojando tu bp.json

Ahora que hemos escrito y nombrado tu bp.json. Todo lo que queda por hacer es alojar el JSON en tu sitio web. Esto debe ser en la misma URL que has usado (o planeas usar) para la acción “regproducer”. Básicamente, solo tu dominio estándar. Por favor, no uses algo como “resources.example.com”, simplemente quédate con, por ejemplo, “example.com”.

Simplemente aloja el bp.json en la raíz de ese dominio. Por ejemplo, "example.com/wax.json".

# Publicando el bp.json en la cadena

Si has creado y alojado con éxito tu [bp.json](/operate/wax-bp/bp-json), el siguiente paso sería publicar ese bp.json en la cadena.

## ¿Por qué publicar en la cadena?

Los bp.json que se publican en la cadena ofrecen varios beneficios sobre aquellos que se alojan en un sitio web:

El bp.json seguirá estando disponible incluso si el sitio web está temporalmente fuera de línea. Las dapps pueden encontrar fácilmente todos los producerjsons en un solo lugar. La firma de la cuenta del productor de bloques ofrece verificación del bp.json y la historia con más información sobre los cambios en un producerjson está disponible.

## 1. Publicando a través de Cleos

Si tienes Cleos instalado en tu máquina y has agregado ya sea tu llave de permiso activa o de permiso personalizado (más sobre esto más adelante) a tu billetera, puedes publicar el producerjson con un solo comando.

### Variables:

- **URL** = (opcionalmente) Si tienes problemas para conectarte a un nodo local o no has alojado un nodo localmente, usa esta opción con uno de los puntos finales disponibles públicamente:
  p.ej. `-u https://wax.blacklusion.io`
- **OWNER** = Nombre de la cuenta del productor:
  p.ej. `blacklusionx`
- **FILE** = Nombre del archivo del producerjson. Tendrás que:
  p.ej. `wax.json`
- **KEY** = El nombre del permiso que deseas usar para la autenticación:
  p.ej. `active` o `producerjson`

```bash
cleos URL push action producerjson set '{"owner":"OWNER", "json": "'printf %q $(cat FILE | tr -d "\r")'"}' -p OWNER@KEY
```

Simplemente sustituye las variables con tus valores.

```bash
cleos -u https://wax.blacklusion.io push action producerjson set '{"owner":"blacklusionx", "json": "'printf %q $(cat wax.json | tr -d "\r")'"}' -p blacklusionx@producerjson
```

## 2. Publicando a través de bloks.io

Especialmente cuando estás comenzando, bloks.io es una gran opción, ya que ofrece una forma más amigable para el usuario que un comando CLI.

### Ve al contrato de producerjson:

Haz clic en este [enlace](https://waxblock.io/account/producerjson?action=set#contract-actions) para acceder al smartcontract de producerjson.

![](/assets/images/wax-bp/bp-json/img01

.png)

### Completa la información y envía

Selecciona “set” y llena tu información. Como nombre de la cuenta, solo usa el nombre de la cuenta con la que te has registrado como productor y para el campo json simplemente copia el contenido real de tu bp.json. No uses la URL de tu bp.json alojado aquí. Finalmente, haz clic en “Enviar Transacción” y elige tu billetera de preferencia.

![](/assets/images/wax-bp/bp-json/img02.png)

Si has hecho todo correctamente, bloks.io confirmará tu transacción exitosa. Puedes echar un vistazo a esta transacción de muestra [aquí](https://waxblock.io/transaction/4bfb8f1219abd7f5e231bf54100c35604c0a655d6ff50925a472afdcf6e4bfe9).

![](/assets/images/wax-bp/bp-json/img03.png)

## Permiso personalizado

Para mayor seguridad o si a menudo tienes que publicar el bp.json, recomendamos encarecidamente usar una llave dedicada para publicar el bp.json. Esto evita que la llave (o cualquier script o persona que se haga con ella) ejecute otras acciones.

Las siguientes imágenes te mostrarán qué información debes completar para configurar el permiso de producerjson.

![](/assets/images/wax-bp/bp-json/img04.png)
![](/assets/images/wax-bp/bp-json/img05.png)

**Importante**: No olvides actualizar tu [chains.json](/operate/wax-bp/chains-json) para que contenga el nombre de tu bp.json y el chainId correspondiente.

## Enlaces útiles

- Repositorio oficial: [https://github.com/eosrio/bp-info-standard](https://github.com/eosrio/bp-info-standard)
- Herramienta para validar tu bp.json: [Metadatos de productores en HerdCheck](https://herdcheck.blocdraig.com/wax/producers)
