---
title: Cómo explorar la Blockchain de WAX
order: 97
---

# Cómo explorar la Blockchain de WAX bloque por bloque a bajo nivel (Node.JS)

## Introducción

Una de las ventajas clave de la blockchain es que toda la información se almacena en los bloques de forma inalterable y fiable para que pueda ser consultada en cualquier momento. Sin embargo, realizar estas consultas a menudo no es fácil. Por esta razón, se han desarrollado servicios de almacenamiento de datos históricos para facilitar esta tarea, como las APIs SHIP o Hyperion. Algunos de estos servicios se limitan a las acciones de un contrato inteligente o a un grupo específico y reducido de ellos, como la API de AtomicAssets.

La mayoría de estos servicios de consulta constan de dos componentes distintos.
- Filler: Encargado de explorar la blockchain para extraer la información, procesarla y almacenarla en la base de datos.
- API: Responsable de gestionar las consultas de datos de usuarios o aplicaciones. Estas consultas se realizan sobre la base de datos ya generada y diseñada específicamente para el tipo de consulta deseado.

En este tutorial vamos a desarrollar el núcleo de un "filler". Veremos un diseño que, aunque funcional, tendrá que ser adaptado para cada uso específico. El tipo de datos a obtener y cómo gestionarlos está fuera del alcance de este tutorial.

El motor "Filler" debe conectarse a un nodo SHIP de la blockchain para recibir los bloques que evaluará posteriormente. Esta conexión se realizará utilizando la biblioteca "eosio-statereceiver" creada por EOSDAC.

https://github.com/eosdac/eosio-statereceiver

:::warning
 Para este tutorial, la biblioteca ha sido modificada para actualizarla a "enf-eosjs", la nueva biblioteca JavaScript para blockchains Antelope que reemplaza a la obsoleta "eosjs". Por esa razón, en el repositorio de ejemplo, los archivos "connection.js" y "statereceiver.js" de esa biblioteca se han incluido directamente como parte del código.
:::

## Estructura

El motor constará de dos componentes:
- Procesador de trazas (Traces processor): Recibe del statereceiver las trazas contenidas en cada bloque recibido del SHIP. Podremos hacer un primer filtrado antes de traducir la información serializada de las acciones y añadir esta información a la pila de datos que será procesada por el siguiente componente.
- Procesador de acciones (Action processor): Este componente opera de forma independiente y su función será procesar las acciones ya deserializadas. Desde aquí podemos enviar la información filtrada y procesada a la base de datos o utilizarla para la función que sea objeto del proyecto que estamos diseñando.

## Iniciando el motor

El programa comenzará desde una función que creará la conexión al *statereceiver* y registrará nuestro procesador de datos para recibir la información obtenida de la blockchain.

```js
const run = async () => {

  /**
   * Configurar stateReceiver
  */
 const sr = new StateReceiver({
   startBlock: 0,  
   endBlock: 0xffffffff,
   mode: 0,
   config: {
     eos: {
       wsEndpoint: process.env.WS,
      },
    },
  irreversibleOnly: false,
  verbose: false,
  });

  /**
   * Crear manejadores (handlers)
   */
  const trace_handler = new TraceHandler();
  // const block_handler = new BlockHandler();
  // const delta_handler = new DeltaHandler();
  // [...]

  /**
   * Registrar manejadores
   */
  sr.registerTraceHandler(trace_handler);
  // sr.registerBlockHandler(block_handler);
  // sr.registerDeltaHandler(delta_handler);
  // [...]

  /**
   * Iniciar stateReceiver
   */
  sr.start();
};
```
El objeto "trace_handler" contiene nuestro motor de relleno. Con esta sentencia vinculamos el módulo "statereceiver" a la función "trace_handler.processTrace" de nuestro motor.

```js
sr.registerTraceHandler(trace_handler);
```

:::warning
 StateReceiver nos permite crear otros tipos de manejadores para recibir datos. Podemos crear manejadores para procesar bloques, trazas o deltas, por ejemplo.
:::

## processTrace

Para capturar los datos del statereceiver debemos crear y registrar esta función. Su declaración tendrá la forma:

```js
async processTrace(block_num, traces, block_timestamp) {...}
```

Recibe el número del bloque a gestionar, un objeto con las trazas del bloque y la marca de tiempo (timestamp) del bloque. Nuestro trabajo ahora es recorrer las trazas para extraer y deserializar las que nos interesen.

```js
async processTrace(block_num, traces, block_timestamp) {
  // Analizar trazas
  for (const trace of traces) {
    if (trace[0] === "transaction_trace_v0") {
      const tx_id = trace[1].id;
      for (const action of trace[1].action_traces) {
        if (action[0] === "action_trace_v0") {
          try {
            const actionDeser = await apiRpc.deserializeActions([
              action[1].act,
            ]);
            // Añadir datos deserializados al buffer de acciones
            this.queue.push({
              data: actionDeser,
              block_num: block_num,
              block_timestamp: block_timestamp,
              tx_id: tx_id,
              retries: 0,
            });
          } catch (error) {
            console.log("Error de deserialización.", error);
          }
        }
      }
    }
  }
}
```

En este ejemplo no hemos hecho ningún filtro. Todas las acciones contenidas en el bloque se deserializan y se añaden a la cola para ser gestionadas por nuestra función "processQueue".

```js
async processQueue() {
  // ¿No hay acciones o esto todavía está procesando? Salir
  if (!this.queue.length || this.processingQueue) {
    return;
  }

  this.processingQueue = true;
  const itemProcess = this.queue.pop();
  const action = itemProcess.data[0];
  let retries = itemProcess.retries;

  // ¿Demasiados reintentos? Descartar acción y salir
  if (retries > 20) {
    console.log("¡Se excedieron los reintentos!");
    return;
  }

  try {

    /**
     * procesar datos aquí
     */
    // **************************************************
    console.log('Action', JSON.stringify(action), '\n')
    // ***************************************************

    this.processingQueue = false;
  } catch (error) {
    // ¿Error? Reintentar
    console.log(error);
    setTimeout(() => {
      retries++;
      this.queue.push(item);
    }, 1000 * retries);
  }
}
```

Esta función se ejecutará cíclicamente. Extrae datos de la cola, siempre que existan, y los procesa. Aquí es donde podemos realizar las acciones finales con la información recibida. Por ejemplo, capturamos las transacciones de más de 10000 WAX para mostrarlas en la consola, o enviarlas a la base de datos (ver ejemplo de código adjunto).

La rutina se ejecuta en un bucle constante, por lo que debemos bloquearla mientras está procesando datos. Para forzar el procesamiento cíclico podemos usar una declaración *setInterval*.

```
This.processingQueue = true
```

Al inicio de cada ciclo comprobamos si la Cola (Queue) tiene datos para procesar o si el procesador está disponible.

## Código de ejemplo

Un ejemplo completo está disponible en Github:

[https://github.com/3dkrender/WAXCrawler](https://github.com/3dkrender/WAXCrawler)

En este ejemplo rastrearemos la blockchain para localizar aquellas transacciones superiores a 10000 WAX. Usamos una base de datos para almacenar el número del primer bloque desde donde queremos comenzar a rastrear la blockchain y para almacenar las transacciones que cumplen la condición.
