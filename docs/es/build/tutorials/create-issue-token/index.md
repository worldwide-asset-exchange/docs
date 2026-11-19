---
title: Crear y emitir un token fungible
order: 10
---

# Crear y emitir un token fungible en WAX

Esta guía muestra cómo compilar, desplegar y gestionar un contrato de token fungible en WAX.

- [Repositorio de ejemplo](https://github.com/worldwide-asset-exchange/fungible-token-tutorial)

## Requisitos

- [WAX-CDT](https://github.com/worldwide-asset-exchange/wax-cdt) para compilar el contrato.
- [Software de WAX](https://github.com/worldwide-asset-exchange/wax-blockchain), que incluye la herramienta `cleos`.

## Compilar el contrato

El repositorio de ejemplo incluye una copia del [contrato eosio.token de WAX](https://github.com/worldwide-asset-exchange/wax-system-contracts/tree/develop/contracts/eosio.token/) y [archivos compilados](https://github.com/worldwide-asset-exchange/fungible-token-tutorial/tree/master/build). Para generar los archivos WASM y ABI desde el código fuente, ejecuta lo siguiente desde la raíz del repositorio:

```bash
$ cdt-cpp -abigen -R eosio.token/ricardian eosio.token/src/eosio.token.cpp -o ./build/eosio.token.wasm -I eosio.token/include --no-missing-ricardian-clause
```

## Desplegar el contrato

### 1. Crear la cuenta del contrato

Reserva al menos 160 KB de RAM para almacenar el contrato y sus tablas. Sustituye los nombres y las claves públicas del ejemplo por los de tus propias cuentas.

```bash
$ cleos system newaccount eosio tokenexample EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV --stake-net "10.00000000 WAX" --stake-cpu "10.00000000 WAX" --buy-ram-kbytes 160 --transfer
```

### 2. Desplegar el contrato

```bash
$ cleos set contract tokenexample . build/eosio.token.wasm build/eosio.token.abi -p tokenexample
```

### 3. Verificar el despliegue

Consulta el hash del contrato para comprobar el despliegue.

```bash
$ cleos get code tokenexample
code hash: 64ac1483b2ff62a4d36173882dca2a278c50e11136b70370123da6775e63659b
```

## Configurar el token

### 1. Crear el token

La acción `create` requiere los permisos de la cuenta del contrato. Define la cuenta emisora y el suministro máximo. Comprueba la cantidad antes de enviar la acción, porque el suministro máximo queda fijado.

```bash
$ cleos push action tokenexample create '["tokenissuer", "1000000000.0000 EXP"]' -p tokenexample
```

### 2. Emitir tokens

La acción `issue` requiere los permisos de la cuenta emisora. Especifica el destinatario, la cantidad y la nota.

```bash
$ cleos push action tokenexample issue '["tokenissuer", "1000000.0000 EXP", "first issue"]' -p tokenissuer
```

Consulta la tabla `stat` para revisar el suministro emitido.

```bash
$ cleos get table tokenexample EXP stat
{
  "rows": [{
      "supply": "1000000.0000 EXP",
      "max_supply": "1000000000.0000 EXP",
      "issuer": "tokenexample"
    }
  ],
  "more": false,
  "next_key": ""
}
```

Consulta la tabla `accounts` para revisar el saldo.

```bash
$ cleos get table tokenexample tokenissuer accounts
{
  "rows": [{
      "balance": "1000000.0000 EXP"
    }
  ],
  "more": false,
  "next_key": ""
}
```

### 3. Retirar tokens

La acción `retire` requiere los permisos de la cuenta emisora y un saldo suficiente para retirar la cantidad indicada.

```bash
$ cleos push action tokenexample retire '["1.0000 EXP", "first burn"]' -p tokenissuer
```

Vuelve a consultar `stat` para comprobar el suministro restante.

```bash
$ cleos get table tokenexample EXP stat
{
  "rows": [{
      "supply": "999999.0000 EXP",
      "max_supply": "1000000000.0000 EXP",
      "issuer": "tokenexample"
    }
  ],
  "more": false,
  "next_key": ""
}
```
