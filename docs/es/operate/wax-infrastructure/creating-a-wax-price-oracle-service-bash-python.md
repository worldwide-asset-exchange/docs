---
title: Creación de un Servicio de Oráculo de Precios WAX mediante Script Bash o Python
original: https://bountyblok.medium.com/creating-a-wax-price-oracle-service-via-bash-or-python-script-fd0ab41ea255
---

# Creación de un Servicio de Oráculo de Precios WAX mediante Script Bash o Python

## Introducción
En bountyblok, hemos abordado el desafío de crear un servicio confiable de Oráculo de Precios WAX, y queremos compartir nuestro viaje contigo. En este artículo, te guiaremos a través de cómo utilizamos scripts Bash y Python para obtener precios de criptomonedas y enviarlos a la blockchain de WAX. Comenzaremos con una solución rápida y sencilla, luego profundizaremos en características avanzadas como el manejo seguro de contraseñas de wallet, alertas de fallos y redundancia de API. Asegurar que estos precios se publiquen con precisión en la cadena es crucial para las aplicaciones y los intercambios, y te mostraremos cómo lo logramos.

## Parte 1: La Solución Rápida y Sencilla

### Script Bash para Obtener Precios y Enviar Transacciones

Aquí tienes un script Bash básico para empezar:

```bash
#!/bin/bash

# Variables
ENDPOINT_URL="https://wax.eu.eosamsterdam.net"
ACTOR="tu_nombre_de_actor"         # ej: bountyblokbp
PERMISSION="tu_permiso"    # ej: oracle
WALLET_PASSWORD="tu_contraseña_de_wallet"  # contraseña de la wallet cleos, para soluciones más seguras desplázate hacia abajo
API_URL="https://min-api.cryptocompare.com/data/price?fsym=WAXP&tsyms=BTC,USD,ETH,EOS,USDT,USDC"

# Comprueba si la wallet está bloqueada
# Cleos enviará un error indicando que la wallet está desbloqueada y molestará en los logs, así que solo desbloquea si no hay forma de listar las claves
WALLET_STATUS=$(cleos wallet list | grep -c '\*')
if [[ $WALLET_STATUS -eq 0 ]]; then
  # Desbloquear la wallet
  UNLOCK_RESULT=$(cleos wallet unlock --password $WALLET_PASSWORD 2>&1)
  if [[ "$UNLOCK_RESULT" == *"Error"* && "$UNLOCK_RESULT" != *"Already unlocked"* ]]; then
    echo "Fallo al desbloquear la wallet: $UNLOCK_RESULT"
    exit 1
  fi
fi

# Obtener precios de la API
RESPONSE=$(curl -s $API_URL)
echo "Respuesta de la API: $RESPONSE"

# Analizar la respuesta JSON y calcular valores
WAXPUSD=$(echo $RESPONSE | jq -r '.USD')
WAXPBTC=$(echo $RESPONSE | jq -r '.BTC')
WAXPETH=$(echo $RESPONSE | jq -r '.ETH')
WAXPEOS=$(echo $RESPONSE | jq -r '.EOS')
USDT=$(echo $RESPONSE | jq -r '.USDT')
USDC=$(echo $RESPONSE | jq -r '.USDC')

# Comprobar si los valores son válidos
if [[ -z "$WAXPUSD" || -z "$WAXPBTC" || -z "$WAXPETH" || -z "$WAXPEOS" || -z "$USDT" || -z "$USDC" ]]; then
  echo "Error: Uno o más valores obtenidos están vacíos"
  exit 1
fi

# Convertir notación científica a decimal
WAXPBTC_DEC=$(printf "%.10f" $WAXPBTC)
WAXPETH_DEC=$(printf "%.10f" $WAXPETH)

# Calcular valores adicionales con más precisión
WAXPUSD_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPUSD * 10000" | bc))
WAXPBTC_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPBTC_DEC * 100000000" | bc))
WAXPETH_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPETH_DEC * 100000000" | bc))
WAXPEOS_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPEOS * 1000000" | bc))
USDTUSD_VALUE=$(printf "%.0f" $(echo "scale=10; $USDT / $WAXPUSD * 10000" | bc))
USDCUSD_VALUE=$(printf "%.0f" $(echo "scale=10; $USDC / $WAXPUSD * 10000" | bc))

# Depuración: imprimir valores calculados
echo "Valores Calculados: WAXPUSD_VALUE=$WAXPUSD_VALUE WAXPBTC_VALUE=$WAXPBTC_VALUE WAXPBTC_DEC=$WAXPBTC_DEC WAXPETH_VALUE=$WAXPETH_VALUE WAXPETH_DEC=$WAXPETH_DEC WAXPEOS_VALUE=$WAXPEOS_VALUE USDTUSD=$USDTUSD USDCUSD=$USDCUSD"

# Crear array de cotizaciones (quotes)
QUOTES=$(jq -c -n \
  --argjson waxpusd "$WAXPUSD_VALUE" \
  --argjson waxpbtc "$WAXPBTC_VALUE" \
  --argjson waxpeth "$WAXPETH_VALUE" \
  --argjson waxpeos "$WAXPEOS_VALUE" \
  --argjson usdtusd "$USDTUSD_VALUE" \
  --argjson usdcusd "$USDCUSD_VALUE" \
  '[
    {"pair": "waxpusd", "value": $waxpusd},
    {"pair": "waxpbtc", "value": $waxpbtc},
    {"pair": "waxpeth", "value": $waxpeth},
    {"pair": "waxpeos", "value": $waxpeos},
    {"pair": "usdtusd", "value": $usdtusd},
    {"pair": "usdcusd", "value": $usdcusd}
  ]')

# Crear JSON de la transacción
TX_JSON=$(jq -c -n \
  --arg actor "$ACTOR" \
  --arg permission "$PERMISSION" \
  --argjson quotes "$QUOTES" \
  '{
    "actions": [{
      "account": "delphioracle",
      "name": "write",
      "authorization": [{
        "actor": $actor,
        "permission": $permission
      }],
      "data": {
        "owner": $actor,
        "quotes": $quotes
      }
    }]
  }')

# Escribir el JSON en un archivo
echo "$TX_JSON" > tx.json

# Imprimir el JSON en la consola para depuración
echo "JSON de la Transacción: $(cat tx.json)"

# Enviar la transacción usando cleos
cleos -u $ENDPOINT_URL push transaction tx.json -p $ACTOR@$PERMISSION

# Limpiar
rm tx.json
```

## Configuración del Cron Job

Para programar el script usando cron, simplemente abre el editor de crontab con este comando: `crontab -e` y añade el script a un cron job para que se ejecute cada minuto:

```cron
* * * * * /home/ubuntu/oracleemailwaxfinal.sh 2>&1 | while IFS= read -r line; do echo "$(date): $line"; done >> /home/ubuntu/oracleemailwaxfinal.sh.log
```

También puedes usar `awk` para añadir marcas de tiempo en los logs a través de crontab, pero tuvimos algunos problemas con él, así que usamos un enfoque más directo.

## Parte 2: Las Características Extra "Avanzadas"

### Manejo Seguro de Contraseñas de Wallet

En lugar de codificar directamente la contraseña de la wallet, usa un archivo encriptado para almacenar la contraseña y descífrala cuando sea necesario. Esto asegura que la contraseña no se almacene en texto plano dentro del script o del cron job.

### Encriptación de la Contraseña de la Wallet

Encripta la contraseña y guárdala en un archivo:

```bash
echo "tu_contraseña_de_wallet" | openssl enc -aes-256-cbc -salt -pbkdf2 -out wallet_password.enc
```

Se te pedirá que introduzcas una contraseña de encriptación. Esta contraseña se usará para descifrar la contraseña de la wallet.

El código completo a continuación demostrará cómo la contraseña encriptada se descifrará y se usará dentro de los scripts bash y python.

### Añadir Alertas para Fallos

Para configurar alertas para varios fallos, puedes usar Twilio para SMS y SendGrid o AWS SES para alertas por correo electrónico.

### Configuración de Alertas Twilio SMS, SendGrid Email y AWS SES

Instala cualquiera de los 3 paquetes que planees usar:

```bash
pip install twilio
pip install sendgrid
pip install boto3
```

### Script Bash con Contraseña Encriptada, Endpoints Redundantes y Alertas

Aquí está el script Bash actualizado con alertas por SMS de Twilio y correo electrónico de SendGrid:

```bash
#!/bin/bash

# Variables

# Varios endpoints - puedes añadir o cambiar estos
ENDPOINTS=("https://wax.eu.eosamsterdam.net" "https://api.waxsweden.org" "https://wax.eosusa.io" "https://wax.eosphere.io")
ACTOR="tu_nombre_de_actor"         # ej: bountyblokbp

PERMISSION="tu_permiso"    # ej: oracle
PASSWORD_FILE="ruta/a/wallet_password.enc"
ENCRYPTION_PASSWORD="tu_contraseña_de_encriptación"  # Establece la contraseña de encriptación

API_URL="https://min-api.cryptocompare.com/data/price?fsym=WAXP&tsyms=BTC,USD,ETH,EOS,USDT,USDC"

TWILIO_SID="tu_twilio_sid"  # Establece tu Twilio SID
TWILIO_AUTH="tu_token_auth_de_twilio"  # Establece tu Token de Autenticación de Twilio
TWILIO_FROM="tu_numero_de_telefono_twilio"  # Establece tu número de teléfono Twilio
TWILIO_TO="tu_numero_de_telefono"  # Establece el número de teléfono del destinatario

SENDGRID_API_KEY="tu_clave_api_de_sendgrid"  # Establece tu clave API de SendGrid
SENDGRID_FROM="tu_correo@ejemplo.com"  # Establece la dirección de correo electrónico del remitente
SENDGRID_TO="correo_destinatario@ejemplo.com"  # Establece la dirección de correo electrónico del destinatario

# Función para enviar alerta SMS
send_sms_alert() {
  MESSAGE=$1
  curl -X POST https://api.twilio.com/2010-04-01/Accounts/$TWILIO_SID/Messages.json \
  --data-urlencode "Body=$MESSAGE" \
  --data-urlencode "From=$TWILIO_FROM" \
  --data-urlencode "To=$TWILIO_TO" \
  -u $TWILIO_SID:$TWILIO_AUTH
}

# Función para enviar alerta por correo electrónico vía SendGrid
send_email_alert_sendgrid() {
  MESSAGE=$1
  curl -X POST https://api.sendgrid.com/v3/mail/send \
    -H "Authorization: Bearer $SENDGRID_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "personalizations": [{
        "to": [{"email": "'$SENDGRID_TO'"}],
        "subject": "Alerta Oráculo WAX"
      }],
      "from": {"email": "'$SENDGRID_FROM'"},
      "content": [{
        "type": "text/plain",
        "value": "'"$MESSAGE"'"
      }]
    }'
}

# Función para enviar alerta por correo electrónico vía AWS SES
send_email_alert_ses() {
  MESSAGE=$1
  aws ses send-email \
    --from "$SENDGRID_FROM" \
    --destination "ToAddresses=$SENDGRID_TO" \
    --message "Subject={Data=Alerta Oráculo WAX},Body={Text={Data=$MESSAGE}}"
}

# Descifrar la contraseña de la wallet
WALLET_PASSWORD=$(openssl enc -aes-256-cbc -d -pbkdf2 -in $PASSWORD_FILE -pass pass:$ENCRYPTION_PASSWORD)

if [[ -z "$WALLET_PASSWORD" ]]; then
  send_sms_alert "Error: Fallo al descifrar la contraseña de la wallet"
  send_email_alert_sendgrid "Error: Fallo al descifrar la contraseña de la wallet"
  exit 1
fi

# Comprobar si la wallet está bloqueada
WALLET_STATUS=$(cleos wallet list | grep -c '\*')
if [[ $WALLET_STATUS -eq 0 ]]; then
  # Desbloquear la wallet
  UNLOCK_RESULT=$(cleos wallet unlock --password $WALLET_PASSWORD 2>&1)
  if [[ "$UNLOCK_RESULT" == *"Error"* && "$UNLOCK_RESULT" != *"Already unlocked"* ]]; then
    send_sms_alert "Fallo al desbloquear la wallet: $UNLOCK_RESULT"
    send_email_alert_sendgrid "Fallo al desbloquear la wallet: $UNLOCK_RESULT"
    exit 1
  fi
fi

# Obtener precios de la API
# Enviar una alerta si la API tuvo un problema
# TODO: Añadir APIs de Precios adicionales para más redundancia
RESPONSE=$(curl -s $API_URL)
if [[ -z "$RESPONSE" ]]; then
  send_sms_alert "Error: Fallo al obtener precios de la API"
  send_email_alert_sendgrid "Error: Fallo al obtener precios de la API"
  exit 1
fi

echo "Respuesta de la API: $RESPONSE"

# Analizar la respuesta JSON y calcular valores
WAXPUSD=$(echo $RESPONSE | jq -r '.USD')
WAXPBTC=$(echo $RESPONSE | jq -r '.BTC')
WAXPETH=$(echo $RESPONSE | jq -r '.ETH')
WAXPEOS=$(echo $RESPONSE | jq -r '.EOS')
USDT=$(echo $RESPONSE | jq -r '.USDT')
USDC=$(echo $RESPONSE | jq -r '.USDC')

# Comprobar si los valores son válidos
if [[ -z "$WAXPUSD" || -z "$WAXPBTC" || -z "$WAXPETH" || -z "$WAXPEOS" || -z "$USDT" || -z "$USDC" ]]; then
  send_sms_alert "Error: Uno o más valores obtenidos están vacíos"
  send_email_alert_sendgrid "Error: Uno o más valores obtenidos están vacíos"
  exit 1
fi

# Convertir notación científica a decimal
WAXPBTC_DEC=$(printf "%.10f" $WAXPBTC)
WAXPETH_DEC=$(printf "%.10f" $WAXPETH)

# Calcular valores adicionales con más precisión
WAXPUSD_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPUSD * 10000" | bc))
WAXPBTC_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPBTC_DEC * 100000000" | bc))
WAXPETH_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPETH_DEC * 100000000" | bc))
WAXPEOS_VALUE=$(printf "%.0f" $(echo "scale=10; $WAXPEOS * 1000000" | bc))
USDTUSD=$(printf "%.0f" $(echo "scale=10; $USDT / $WAXPUSD * 10000" | bc))
USDCUSD=$(printf "%.0f" $(echo "scale=10; $USDC / $WAXPUSD * 10000" | bc))

# Depuración: imprimir valores calculados
echo "Valores Calculados: WAXPUSD_VALUE=$WAXPUSD_VALUE WAXPBTC_VALUE=$WAXPBTC_VALUE WAXPBTC_DEC=$WAXPBTC_DEC WAXPETH_VALUE=$WAXPETH_VALUE WAXPETH_DEC=$WAXPETH_DEC WAXPEOS_VALUE=$WAXPEOS_VALUE USDTUSD=$USDTUSD USDCUSD=$USDCUSD"

# Crear array de cotizaciones (quotes)
QUOTES=$(jq -c -n \
  --argjson waxpusd "$WAXPUSD_VALUE" \
  --argjson waxpbtc "$WAXPBTC_VALUE" \
  --argjson waxpeth "$WAXPETH_VALUE" \
  --argjson waxpeos "$WAXPEOS_VALUE" \
  --argjson usdtusd "$USDTUSD" \
  --argjson usdcusd "$USDCUSD" \
  '[
    {"pair": "waxpusd", "value": $waxpusd},
    {"pair": "waxpbtc", "value": $waxpbtc},
    {"pair": "waxpeth", "value": $waxpeth},
    {"pair": "waxpeos", "value": $waxpeos},
    {"pair": "usdtusd", "value": $usdtusd},
    {"pair": "usdcusd", "value": $usdcusd}
  ]')

# Crear JSON de la transacción
TX_JSON=$(jq -c -n \
  --arg actor "$ACTOR" \
  --arg permission "$PERMISSION" \
  --argjson quotes "$QUOTES" \
  '{
    "actions": [{
      "account": "delphioracle",
      "name": "write",
      "authorization": [{
        "actor": $actor,
        "permission": $permission
      }],
      "data": {
        "owner": $actor,
        "quotes": $quotes
      }
    }]
  }')

# Escribir el JSON en un archivo
echo "$TX_JSON" > tx.json

# Imprimir el JSON en la consola para depuración
echo "JSON de la Transacción: $(cat tx.json)"

# Intentar enviar la transacción usando cada endpoint hasta que tenga éxito
for ENDPOINT in "${ENDPOINTS[@]}"; do
  cleos -u $ENDPOINT push transaction tx.json -p $ACTOR@$PERMISSION && break
done

# Limpiar
rm tx.json
```

### Script Python con Contraseña Encriptada, Endpoints Redundantes y Alertas

Aquí está el script Python actualizado con alertas por SMS de Twilio y correo electrónico de SendGrid:

```python
import os
import subprocess
import requests
import json
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import boto3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Función para descifrar la contraseña de la wallet
def decrypt_wallet_password(encrypted_file, encryption_password):
    try:
        result = subprocess.run(
            ['openssl', 'enc', '-aes-256-cbc', '-d', '-pbkdf2', '-in', encrypted_file, '-pass', f'pass:{encryption_password}'],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Fallo al descifrar la contraseña de la wallet: {e.stderr}")
        send_alert("Fallo al descifrar la contraseña de la wallet.")
        exit(1)

# Función para enviar alerta SMS vía Twilio
def send_sms_alert(message):
    client = Client(os.getenv('TWILIO_SID'), os.getenv('TWILIO_AUTH'))
    client.messages.create(
        body=message,
        from_=os.getenv('TWILIO_FROM'),
        to=os.getenv('TWILIO_TO')
    )

# Función para enviar alerta por correo electrónico vía SendGrid
def send_email_alert_sendgrid(message):
    email = Mail(
        from_email=os.getenv('SENDGRID_FROM'),
        to_emails=os.getenv('SENDGRID_TO'),
        subject='Alerta Oráculo WAX',
        plain_text_content=message)
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        sg.send(email)
    except Exception as e:
        print(f"Fallo al enviar alerta por correo electrónico vía SendGrid: {e}")

# Función para enviar alerta por correo electrónico vía AWS SES
def send_email_alert_ses(message):
    client = boto3.client('ses')
    try:
        client.send_email(
            Source=os.getenv('SENDGRID_FROM'),
            Destination={'ToAddresses': [os.getenv('SENDGRID_TO')]},
            Message={
                'Subject': {'Data': 'Alerta Oráculo WAX'},
                'Body': {'Text': {'Data': message}}
            }
        )
    except Exception as e:
        print(f"Fallo al enviar alerta por correo electrónico vía SES: {e}")



# Función para enviar alerta (elige el método que prefieras)
def send_alert(message):
    send_sms_alert(message)
    send_email_alert_sendgrid(message)
    send_email_alert_ses(message)

# Configuración
ENDPOINTS = ["https://wax.eu.eosamsterdam.net", "https://api.waxsweden.org", "https://wax.eosusa.io", "https://wax.eosphere.io"]
ACTOR = "tu_nombre_de_actor"
PERMISSION = "tu_permiso"
API_URL = "https://min-api.cryptocompare.com/data/price?fsym=WAXP&tsyms=BTC,USD,ETH,EOS,USDT,USDC"
ENCRYPTED_PASSWORD_FILE = "ruta/a/tu/wallet_password.enc"
ENCRYPTION_PASSWORD = os.getenv('ENCRYPTION_PASSWORD')

if ENCRYPTION_PASSWORD is None:
    print("Error: La variable de entorno ENCRYPTION_PASSWORD no está establecida")
    send_alert("La variable de entorno ENCRYPTION_PASSWORD no está establecida")
    exit(1)

WALLET_PASSWORD = decrypt_wallet_password(ENCRYPTED_PASSWORD_FILE, ENCRYPTION_PASSWORD)

# Comprobar si la wallet está bloqueada
try:
    wallet_list = subprocess.run(['cleos', 'wallet', 'list'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    if '*' not in wallet_list.stdout:
        # Desbloquear la wallet
        result = subprocess.run(['cleos', 'wallet', 'unlock', '--password', WALLET_PASSWORD], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
except subprocess.CalledProcessError as e:
    if "Already unlocked" not in e.stderr:
        print(f"Fallo al desbloquear la wallet: {e.stderr}")
        send_alert(f"Fallo al desbloquear la wallet: {e.stderr}")
        exit(1)

# Obtener precios de la API
try:
    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()
except requests.RequestException as e:
    print(f"Fallo al obtener precios de la API: {e}")
    send_alert("La API está caída o no devuelve datos.")
    exit(1)

print(f"Respuesta de la API: {data}")

# Analizar la respuesta JSON y calcular valores
try:
    WAXPUSD = data['USD']
    WAXPBTC = data['BTC']
    WAXPETH = data['ETH']
    WAXPEOS = data['EOS']
    USDT = data['USDT']
    USDC = data['USDC']
except KeyError as e:
    print(f"Clave faltante en la respuesta de la API: {e}")
    send_alert("Clave faltante en la respuesta de la API.")
    exit(1)

print(f"Valores Obtenidos: WAXPUSD={WAXPUSD} WAXPBTC={WAXPBTC} WAXPETH={WAXPETH} WAXPEOS={WAXPEOS} USDT={USDT} USDC={USDC}")

# Comprobar si los valores son válidos
if not all([WAXPUSD, WAXPBTC, WAXPETH, WAXPEOS, USDT, USDC]):
    print("Error: Uno o más valores obtenidos están vacíos")
    send_alert("Uno o más valores obtenidos están vacíos.")
    exit(1)

# Convertir notación científica a decimal
WAXPBTC_DEC = float(WAXPBTC)
WAXPETH_DEC = float(WAXPETH)

# Calcular valores adicionales
WAXPUSD_VALUE = int(WAXPUSD * 10000)
WAXPBTC_VALUE = int(WAXPBTC_DEC * 100000000)
WAXPETH_VALUE = int(WAXPETH_DEC * 100000000)
WAXPEOS_VALUE = int(WAXPEOS * 1000000)
USDTUSD = int((USDT / WAXPUSD) * 10000)
USDCUSD = int((USDC / WAXPUSD) * 10000)

print(f"Valores Calculados: WAXPUSD_VALUE={WAXPUSD_VALUE} WAXPBTC_VALUE={WAXPBTC_VALUE} WAXPBTC_DEC={WAXPBTC_DEC} WAXPETH_VALUE={WAXPETH_VALUE} WAXPETH_DEC={WAXPETH_DEC} WAXPEOS_VALUE={WAXPEOS_VALUE} USDTUSD={USDTUSD} USDCUSD={USDCUSD}")

# Crear array de cotizaciones (quotes)
quotes = [
    {"pair": "waxpusd", "value": WAXPUSD_VALUE},
    {"pair": "waxpbtc", "value": WAXPBTC_VALUE},
    {"pair": "waxpeth", "value": WAXPETH_VALUE},
    {"pair": "waxpeos", "value": WAXPEOS_VALUE},
    {"pair": "usdtusd", "value": USDTUSD},
    {"pair": "usdcusd", "value": USDCUSD},
]

# Crear JSON de la transacción
tx_json = {
    "actions": [{
        "account": "delphioracle",
        "name": "write",
        "authorization": [{
            "actor": ACTOR,
            "permission": PERMISSION
        }],
        "data": {
            "owner": ACTOR,
            "quotes": quotes
        }
    }]
}

# Escribir el JSON en un archivo
with open('tx.json', 'w') as f:
    json.dump(tx_json, f, separators=(',', ':'))

# Imprimir el JSON en la consola para depuración
print("JSON de la Transacción: ", json.dumps(tx_json, separators=(',', ':')))

# Intentar enviar la transacción usando cada endpoint hasta que tenga éxito
for endpoint in ENDPOINTS:
    try:
        subprocess.run(['cleos', '-u', endpoint, 'push', 'transaction', 'tx.json', '-p', f'{ACTOR}@{PERMISSION}'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        break
    except subprocess.CalledProcessError as e:
        print(f"Fallo al enviar la transacción usando el endpoint {endpoint}: {e.stderr}")
        continue

# Limpiar
os.remove('tx.json')
```

Nota: Puedes simplificar tu configuración moviendo las variables a un archivo `.env`. Este enfoque no solo mantiene tu código más limpio, sino que también permite que otros servicios reutilicen estas variables fácilmente. Para tu script Python, puedes usar el paquete `python-dotenv` para cargar las variables desde el archivo `.env` sin esfuerzo.

```bash
pip install python-dotenv
```

```python
import os
from dotenv import load_dotenv

# Cargar el archivo .env
load_dotenv()

# Recuperar variables de entorno
endpoints = os.getenv('ENDPOINTS').split(',')
actor = os.getenv('ACTOR')
permission = os.getenv('PERMISSION')
password_file = os.getenv('PASSWORD_FILE')
encryption_password = os.getenv('ENCRYPTION_PASSWORD')
api_url = os.getenv('API_URL')
twilio_sid = os.getenv('TWILIO_SID')
twilio_auth = os.getenv('TWILIO_AUTH')
twilio_from = os.getenv('TWILIO_FROM')
twilio_to = os.getenv('TWILIO_TO')
sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
sendgrid_from = os.getenv('SENDGRID_FROM')
sendgrid_to = os.getenv('SENDGRID_TO')

# Ejemplo de uso
print(f"Enviando desde: {twilio_from} a {twilio_to}")
```

### Configuración del Cron Job

Añade el script bash `.sh` a un cron job para que se ejecute cada minuto:

```cron
* * * * * ENCRYPTION_PASSWORD="tu_contraseña_de_encriptación" /ruta/a/tu/script.sh 2>&1 | while IFS= read -r line; do echo "$(date): $line"; done >> /ruta/a/tu/archivo_de_log.log
```

### Cron Job del Script Python

Añade el script Python a un cron job para que se ejecute cada minuto:

```cron
* * * * * ENCRYPTION_PASSWORD="tu_contraseña_de_encriptación" /usr/bin/python3 /ruta/a/tu/script.py 2>&1 | while IFS= read -r line; do echo "$(date): $line"; done >> /ruta/a/tu/archivo_de_log.log
```

Siguiendo estos pasos, puedes manejar de forma segura la contraseña de la wallet sin codificarla directamente en el script o en el cron job, y asegurar que solo se descifre en tiempo de ejecución. Además, los scripts manejan endpoints redundantes para asegurar que la transacción se envíe incluso si uno de los endpoints está caído.

## PERO, ¿MI ORÁCULO ESTÁ FUNCIONANDO?

### Añadir Verificación de Integridad para el Oráculo en WAX Mainnet

Para asegurar aún más la integridad de tu oráculo y verificar que las acciones `write` se están publicando correctamente en la WAX Mainnet, puedes usar un script que consulte directamente la blockchain. Este enfoque ayuda a confirmar que el oráculo funciona como se espera y no se ha colgado, comprobando las transacciones recientes directamente en la cadena.

Aquí tienes un ejemplo de script que usa WAX hyperion v2 para obtener y verificar acciones para un contrato inteligente y una acción específicos. Este script es particularmente útil para monitorizar el contrato `delphioracle` para asegurar que las acciones `write` del BP están ocurriendo dentro del plazo esperado.

En este ejemplo, queremos saber si ha habido alguna acción `write` en los últimos 30 minutos.

```bash
#!/bin/bash

# Definir variables
ACTOR="tu_cuenta" # ej. bountyblokbp
CONTRACT="delphioracle"
ACTION="write"
WAX_API_ENDPOINT="https://api.wax.alohaeos.com/v2/history/get_actions"
TIME_WINDOW=1800 # Ventana de tiempo en segundos (30 minutos)

# Obtener la marca de tiempo actual en segundos
CURRENT_TIMESTAMP=$(date +%s)

# Obtener las últimas acciones para el contrato delphioracle
RESPONSE=$(curl -s -G --data-urlencode "account=$ACTOR" --data-urlencode "filter=$CONTRACT:$ACTION" --data-urlencode "sort=desc" --data-urlencode "limit=1000" $WAX_API_ENDPOINT)

# Imprimir acciones obtenidas para depuración
echo "Acciones obtenidas: $RESPONSE"

# Comprobar si la acción write se realizó en los últimos 30 minutos
ACTION_FOUND=$(echo $RESPONSE | jq -r --argjson CURRENT_TIMESTAMP "$CURRENT_TIMESTAMP" '
  .actions[] | select(.act.account == "'$CONTRACT'" and .act.name == "'$ACTION'") |
  select((($CURRENT_TIMESTAMP - (.timestamp | sub("\\..*"; "") | strptime("%Y-%m-%dT%H:%M:%S") | mktime)) <= 1800)) |
  .trx_id
')

# Imprimir la marca de tiempo actual para depuración
echo "Marca de tiempo actual: $CURRENT_TIMESTAMP"

# Resultado de salida
if [ -n "$ACTION_FOUND" ]; then
  echo "Acción write encontrada: $ACTION_FOUND"
else
  echo "No se encontró ninguna acción write por $ACTOR en los últimos 30 minutos"
  # send_email()
  # send_sms()
fi
```

### Beneficios

- **Verificación Directa en Cadena**: Este script proporciona una forma directa de verificar que las acciones `write` se están publicando en la cadena, asegurando que el oráculo funciona correctamente.
- **Ventana de Tiempo Extendida**: Al comprobar en los últimos 30 minutos, el script asegura que incluso si hay muchas transacciones, capturará las relevantes.
- **Integridad Añadida**: Este método añade una capa adicional de integridad a tu configuración de oráculo al proporcionar verificación en tiempo real directamente desde la blockchain.

## Conclusión

Siguiendo esta guía, has creado un servicio de Oráculo de Precios WAX utilizando un script Bash o Python. El servicio obtiene precios de criptomonedas, maneja de forma segura las contraseñas de wallet, envía transacciones a la blockchain de WAX y configura alertas para cualquier fallo. Programar estos scripts usando cron jobs asegura que tu servicio funcione sin problemas y de manera confiable.

Además, para asegurar aún más la integridad de tu oráculo y verificar que las acciones `write` se están publicando correctamente en la WAX Mainnet, puedes usar el script proporcionado que consulta directamente la blockchain. Este enfoque ayuda a confirmar que el oráculo funciona como se espera y no se ha colgado, comprobando las transacciones recientes directamente en la cadena. Este script utiliza la API de historial de WAX para obtener y verificar acciones para el contrato inteligente `delphioracle`, apuntando específicamente a las acciones `write` del actor `bountyblokbp` en los últimos 30 minutos. Este método añade una capa adicional de integridad a tu configuración de oráculo al proporcionar verificación en tiempo real directamente desde la blockchain. 