---
title: Contratos Ricardianos
order: 111
---

# Contratos Ricardianos

Un contrato ricardiano es un acuerdo digital legible tanto por máquina como por humano entre dos partes (ej., tu aplicación y tu cliente). Similar a un documento legal estándar, incluye las acciones, intenciones, términos y condiciones de tus contratos inteligentes.

Los contratos ricardianos se definen por acción. Cada vez que la acción de tu contrato inteligente se ejecuta en la Blockchain de WAX, este acuerdo es firmado criptográficamente y verificado con un HASH (por acción).

Para asociar un contrato ricardiano con cada una de tus acciones, necesitarás crear un archivo markdown.

* Este archivo debe tener el mismo nombre que tu contrato inteligente. Por ejemplo, si tu contrato inteligente se llama **wax.cpp**, tu archivo markdown ricardiano debe llamarse: wax.contracts.md.
* Cada etiqueta **```<h1>```** debe tener la clase "contract": ```<h1 class="contract"></h1>```.
* Para asociar una acción con tu archivo markdown, el contenido de la etiqueta **```<h1>```** debe coincidir con el nombre de la acción: ```<h1 class="contract">hi</h1>```.

También es importante dónde almacenas tu archivo markdown ricardiano (en relación con tu archivo C++ del contrato inteligente). Esto depende de cómo estés compilando tu contrato.

## Usar WAX-CDT

Si usas **cdt-init** para crear una plantilla de contrato inteligente, se crea automáticamente una carpeta para ti bajo el directorio de tu proyecto (ej., wax/ricardian). Por defecto, esta carpeta contiene un contrato ricardiano de muestra: wax.contracts.md.

Los scripts de CMake incluirán automáticamente los archivos listados en el directorio **ricardian**.

Consulta [Crear un Contrato Inteligente](/es/build/dapp-development/smart-contract-quickstart/dapp_hello_world) para más información.

## Usar cdt-cpp

Si usas [cdt-cpp](/es/build/dapp-development/wax-cdt/) para compilar tu contrato, tu archivo markdown ricardiano debe estar en el mismo directorio que wax.cpp y debe tener el mismo nombre: wax.contracts.md.

```shell
cdt-cpp -abigen wax.cpp -o wax.wasm
```

## Ejemplo de Contrato Ricardiano

A continuación se muestra un contrato inteligente, con una acción llamada: **hi**.

```cpp
ACTION wax::hi( name nm ) {
   /* fill in action body */
   print_f("Name : %\n",nm);
}
```

Para asociar un contrato ricardiano con esta acción:

1. Crea un archivo llamado **tu-contrato.contracts.md** (ej., wax.contracts.md).
2. Pega el markdown a continuación en tu archivo de contratos.

:::tip
Para cada una de tus acciones, usa la etiqueta ```<h1>``` con la clase "contract", y establece su contenido interno al nombre de la acción.
:::

```html
<h1 class="contract"> hi </h1> 
```

Esqueleto para el contrato ricardiano de la acción hi
