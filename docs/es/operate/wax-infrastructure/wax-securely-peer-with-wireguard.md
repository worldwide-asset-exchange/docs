---
title: Emparejamiento Seguro en la Red WAX con Wireguard
---

Operar un WAX Guild exitoso a menudo implicará cooperar con otros Guilds para garantizar la salud holística de la red a nivel técnico. Un caso de esto será desplegar conexiones seguras de baja latencia entre las redes de otros Guilds para asegurar que los bloques se sincronicen y las transacciones fluyan sin contención hacia los productores de bloques relevantes.

La WAX Mainnet tiene una red backend facilitada mediante el uso de una VPN interna de Wireguard compartida entre Guilds.

[Wireguard](https://www.wireguard.com/) es una solución VPN de uso gratuito que encapsula paquetes IP en tramas UDP que permiten a los WAX Guilds compartir una red común segura y de baja latencia entre los nodos relevantes del software WAX.

Wireguard también se puede utilizar para el emparejamiento interno de tu propio Guild; dependiendo de tu topología, es posible que necesites atravesar de forma segura una red pública.

Esta guía te mostrará el proceso para instalar y configurar Wireguard en un nodo WAX y luego conectarte a la VPN interna de WAX Guild.

# Emparejamiento Seguro en la Red WAX con Wireguard

Antes de iniciar el proceso de construcción e instalación, debes señalar la intención de tu Guild de unirse a la VPN interna de WAX Guild.

Esto se puede hacer simplemente enviando un mensaje en el equipo de Keybase **wax_guilds** (Todos los Guilds ya deberían ser miembros). Uno de los Guilds existentes te asignará una dirección IP privada para usar en la red VPN interna; esta IP suele ser asignada por [WAX Sweden](https://waxsweden.org/) y se registra en el archivo compartido de Wireguard en Keybase.

Esta dirección IP se utilizará en tu configuración de Wireguard.

# Instalación, Configuración y Conexión a la VPN Interna de WAX Guild

En esta guía, se explicarán los siguientes pasos utilizando Ubuntu 22.04:

- Instalar Wireguard
- Generar una clave privada y pública de Wireguard
- Configurar la interfaz de red de Wireguard
- Configurar los peers de Wireguard
- Habilitar la interfaz de red de Wireguard
- Configurar los peers del software WAX

## Instalar Wireguard

Wireguard se incluye por defecto desde Ubuntu Server 20.04, sin embargo, tu experiencia puede variar, instálalo como se indica a continuación:

```bash
$ sudo apt-get update

$ sudo apt install wireguard

# En versiones anteriores de Ubuntu, instálalo como se indica a continuación:

$ sudo add-apt-repository ppa:wireguard/wireguard

$ sudo apt-get update

$ sudo apt-get install wireguard-dkms wireguard-tools
```

## Generar una Clave Privada y Pública de Wireguard

Tu clave pública deberá compartirse con otros Guilds a los que te conectarás y, de manera similar, necesitarás las suyas. Mantén tu clave privada... privada.

```bash
# Cambiar umask solo en el Shell actual
$ sudo umask 077

# Generar y Ver Clave Privada
$ wg genkey > privatekey

$ cat privatekey
sFIbU8HkegP6sK/35vdqlER9G3aK+Mxp8F1uDybuhnk=

# Derivar y Ver Clave Pública desde Clave Privada
$ wg pubkey < privatekey > publickey

$ cat publickey
oYXYVmIISGLYx+VZ8FWGa1GW4+K9Y0IYcrPeDiwKQHQ=
```

## Configurar la Interfaz de Red de Wireguard

La primera interfaz de Wireguard es `wg0` (sin embargo, se puede nombrar algo más relevante para tu despliegue) y se puede configurar en el archivo `wg0.conf` con tu dirección IP privada asignada, clave privada y un puerto alto aleatorio para escuchar, como se muestra a continuación:

```bash
$ sudo nano /etc/wireguard/wg0.conf

[Interface]
Address = 10.0.0.88/24
PrivateKey = sFIbU8HkegP6sK/35vdqlER9G3aK+Mxp8F1uDybuhnk=
ListenPort = 51337
```

Es importante entender que esta dirección IP de la Interfaz es para la superposición de VPN y no es el punto de anclaje para la VPN subyacente, sin embargo, el ListenPort se utiliza para la conexión subyacente.

Los Peers de Wireguard que se conecten a este nodo se conectarán al endpoint de IP pública (normalmente un nombre DNS) de este nodo en el puerto 51337.

En la mayoría de las ocasiones, habrá un firewall frente a la IP pública, así que asegúrate de permitir conexiones **UDP** al ListenPort, en nuestro caso, el **Puerto UDP 51337**.

## Configurar Peers de Wireguard

Esperemos que a estas alturas ya hayas tenido algunas conversaciones privadas con otros Guilds y hayas acordado emparejarte de forma privada.

Intercambia claves públicas y IPs de punto de anclaje de VPN públicas con el otro Guild y configura como se indica a continuación:

```bash
$ sudo nano /etc/wireguard/wg0.conf

# Awesome Guild X
[Peer]
PublicKey = 1sV1QHDi0RxS4bRe7yC6Qqkha7KQmMObc4tKO7jWej0=
AllowedIPs = 10.0.0.77/32
Endpoint = awesome-guild.org:54671
PersistentKeepalive = 20

# Great Guild Y
[Peer]
PublicKey = dA95tu3wenr9wTJzZDErGQmlPCslTQgyS7ICRZx1hhI=
AllowedIPs = 10.0.0.99/32
Endpoint = great-guild.io:47692
PersistentKeepalive = 20
```

## Habilitar la Interfaz de Red de Wireguard

Con tu lado y el lado del Guild remoto configurados correctamente, `wg0` se puede levantar o bajar usando `wg-quick` como se muestra a continuación:

```bash
# Levantar Interfaz
$ wg-quick up wg0

# Bajar Interfaz
$ wg-quick down wg0

# Habilitar Inicio Automático
$ sudo systemctl enable wg-quick@wg0
```

Comprueba el funcionamiento de la VPN recién creada:

```bash
$ sudo wg show

interface: wg0
  public key: sFIbU8HkegP6sK/35vdqlER9G3aK+Mxp8F1uDybuhnk=
  private key: (hidden)
  listening port: 51337

peer: 1sV1QHDi0RxS4bRe7yC6Qqkha7KQmMObc4tKO7jWej0=
  endpoint: 84.143.66.24:54671
  allowed ips: 10.0.0.77/32
  latest handshake: 1 minute, 46 seconds ago
  transfer: 1.73 GiB received, 1.43 GiB sent
  persistent keepalive: every 20 seconds

peer: dA95tu3wenr9wTJzZDErGQmlPCslTQgyS7ICRZx1hhI=
  endpoint: 64.146.78.101:47692
  allowed ips: 10.0.0.99/32
  latest handshake: 1 minute, 54 seconds ago
  transfer: 1.76 GiB received, 1.81 GiB sent
  persistent keepalive: every 20 seconds

$ sudo wg show wg0 latest-handshakes

1sV1QHDi0RxS4bRe7yC6Qqkha7KQmMObc4tKO7jWej0=    16856
dA95tu3wenr9wTJzZDErGQmlPCslTQgyS7ICRZx1hhI=    17589
```

También deberías poder hacer ping a la IP privada remota si está permitido; sin embargo, verifica que haya tráfico de transferencia y recepción, lo cual es una buena señal, y que los handshakes se estén realizando.

## Configurar Peers del Software WAX

Ahora que se confirma que la VPN subyacente funciona correctamente, todo lo que queda es configurar las direcciones de peer del software WAX `nodeos` que utilizan la nueva red VPN privada de WAX Guild.

```ini
$ nano config.ini

# Awesome Guild X
p2p-peer-address = 10.0.0.77:9876

# Great Guild Y
p2p-peer-address = 10.0.0.99:9876
```

Reinicia nodeos y comprueba que haya un emparejamiento exitoso de nodo a nodo `nodeos`:

```bash
$ netstat -an | grep 10.0.0.

tcp        0      0 10.0.0.88:9876        10.0.0.77:46348      ESTABLISHED
tcp        0  19765 10.0.0.88:9876        10.0.0.99:56892      ESTABLISHED
```

---

Estas **Guías Técnicas para Desarrolladores de WAX** se crean utilizando material fuente de la [Serie de Guías Técnicas de WAX de EOSphere](https://medium.com/eosphere/wax-technical-how-to/home)

Asegúrate de hacer cualquier pregunta en el [Telegram de EOSphere](https://t.me/eosphere_io) 