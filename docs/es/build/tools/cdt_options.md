---
title: Opciones de WAX-CDT
order: 110
---

# Opciones de WAX-CDT

A continuación se muestra una lista de herramientas y parámetros comunes de WAX-CDT. Puedes usar estas herramientas para generar archivos WASM y ABI para tus contratos inteligentes.

## cdt-abidiff
Compara las diferencias entre dos archivos ABI. Un reporte se imprime en la consola.

```shell
USAGE: cdt-abidiff [options] [input file1] ... [input file2] ...
EXAMPLE: cdt-abidiff hello.abi old_hello.abi   

OPTIONS:

Generic Options:

  -help      - Mostrar opciones disponibles (-help-hidden para más)
  -help-list - Mostrar lista de opciones disponibles (-help-list-hidden para más)
  -version   - Mostrar la versión de este programa
```

## cdt-cpp
Genera archivos WASM y ABI para tus contratos inteligentes.

```shell
USAGE: cdt-cpp [options] [input file] ...
EXAMPLE: cdt-cpp -abigen wax.cpp -o wax.wasm

OPTIONS:
  -C                       - Incluir comentarios en la salida preprocesada
  -CC                      - Incluir comentarios de dentro de macros en la salida preprocesada
  -D=[string]              - Definir [macro] a [valor] (o 1 si se omite [valor])
  -E                       - Solo ejecutar el preprocesador
  -I=[string]              - Agregar directorio a la ruta de búsqueda de includes
  -L=[string]              - Agregar directorio a la ruta de búsqueda de librerías
  -O=[string]              - Nivel de optimización s, 0-3
  -S                       - Solo ejecutar pasos de preprocesamiento y compilación
  -U=[string]              - Indefinir macro [macro]
  -W=[string]              - Habilitar la advertencia especificada
  -c                       - Solo ejecutar pasos de preprocesamiento, compilación y ensamblado
  -dD                      - Imprimir definiciones de macros en modo -E además de la salida normal
  -dI                      - Imprimir directivas include en modo -E además de la salida normal
  -dM                      - Imprimir definiciones de macros en modo -E en lugar de la salida normal
  -emit-ast                - Emitir archivos AST de Clang para entradas de código fuente
  -emit-llvm               - Usar la representación LLVM para archivos de ensamblador y objeto
  -faligned-allocation     - Habilitar funciones de asignación alineada de C++17
  -fcoroutine-ts           - Habilitar soporte para C++ Coroutines TS
  -finline-functions       - Hacer inline a funciones adecuadas
  -finline-hint-functions  - Hacer inline a funciones que están marcadas inline (explícita o implícitamente)
  -fmerge-all-constants    - Permitir fusión de constantes
  -fno-cfl-aa              - Deshabilitar Análisis de Alias CFL
  -fno-elide-constructors  - Deshabilitar elisión de constructor de copia de C++
  -fno-lto                 - Deshabilitar LTO
  -fstack-protector        - Habilitar protectores de pila para funciones potencialmente vulnerables a stack smashing
  -fstack-protector-all    - Forzar el uso de protectores de pila para todas las funciones
  -fstack-protector-strong - Usar una heurística fuerte para aplicar protectores de pila a funciones
  -fstrict-enums           - Habilitar optimizaciones basadas en la definición estricta del rango de valores de un enum
  -fstrict-return          - Siempre tratar las rutas de flujo de control que caen del final de una función no-void como inalcanzables
  -fstrict-vtable-pointers - Habilitar optimizaciones basadas en las reglas estrictas para sobrescribir objetos polimórficos de C++
  -include=[string]        - Incluir archivo antes del análisis sintáctico
  -isysroot=[string]       - Establecer el directorio raíz del sistema (usualmente /)
  -l=[string]              - Nombre raíz de la librería a enlazar
  -lto-opt=[string]        - Nivel de optimización LTO (O0-O3)
  -o=[string]              - Escribir salida a [archivo]
  -std=[string]            - Estándar de lenguaje para compilar
  -v                       - Mostrar comandos a ejecutar y usar salida detallada
  -w                       - Suprimir todas las advertencias

Generic Options:

  -help                    - Mostrar opciones disponibles (-help-hidden para más)
  -help-list               - Mostrar lista de opciones disponibles (-help-list-hidden para más)
  -version                 - Mostrar la versión de este programa
```

## cdt-init
Crea una plantilla de contrato inteligente y estructura de directorios. Incluye scripts de construcción CMake por defecto.

```shell
USAGE: cdt-init [options]
EXAMPLE: cdt-init -project wax

OPTIONS:

Generic Options:

  -help             - Mostrar opciones disponibles (-help-hidden para más)
  -help-list        - Mostrar lista de opciones disponibles (-help-list-hidden para más)
  -version          - Mostrar la versión de este programa

cdt-init:
genera un proyecto de contrato inteligente eosio

  -bare             - produce solo un esqueleto de contrato inteligente sin soporte CMake
  -path=[string]    - directorio donde colocar el proyecto
  -project=[string] - nombre del proyecto de salida
```

## cdt-ld
Enlazador WebAssembly.

```shell
USAGE: cdt-ld [options] [input file] ...

OPTIONS:

Generic Options:

  -help             - Mostrar opciones disponibles (-help-hidden para más)
  -help-list        - Mostrar lista de opciones disponibles (-help-list-hidden para más)
  -version          - Mostrar la versión de este programa

cdt.ld options:

  -L=[string]       - Agregar directorio a la ruta de búsqueda de librerías
  -fno-cfl-aa       - Deshabilitar Análisis de Alias CFL
  -fno-lto          - Deshabilitar LTO
  -fno-post-pass    - No ejecutar el pase de post-procesamiento
  -fno-stack-first  - No establecer la pila primero en memoria
  -l=[string]       - Nombre raíz de la librería a enlazar
  -lto-opt=[string] - Nivel de optimización LTO (O0-O3)
  -o=[string]       - Escribir salida a [archivo]
```

<!--### cdt-abigen

```bash
USAGE: cdt-abigen [options] <source0> [... <sourceN>]

OPTIONS:

Generic Options:

  -help                      - Mostrar opciones disponibles (-help-hidden para más)
  -help-list                 - Mostrar lista de opciones disponibles (-help-list-hidden para más)
  -version                   - Mostrar la versión de este programa

cdt-abigen:
genera un ABI desde entrada de proyecto C++

  -extra-arg=<string>        - Argumento adicional a agregar al final de la línea de comandos del compilador
  -extra-arg-before=<string> - Argumento adicional a anteponer a la línea de comandos del compilador
  -output=<string>           - Establecer el nombre de archivo de salida y ruta completa
  -p=<string>                - Ruta de construcción
```-->