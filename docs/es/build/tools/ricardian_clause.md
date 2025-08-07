---
title: Cláusulas Ricardianas
order: 112
---

# Cláusulas Ricardianas

Similar a un [Contrato Ricardiano](/es/build/tools/ricardian_contract), una cláusula ricardiana es un documento digital que especifica los términos de todo tu contrato inteligente - no solo por acción.

Para asociar una cláusula ricardiana con tu contrato inteligente, necesitarás crear un archivo markdown.

* Este archivo debe tener el mismo nombre que tu contrato inteligente. Por ejemplo, si tu contrato inteligente se llama **wax.cpp**, tu archivo markdown ricardiano debe llamarse: wax.clauses.md.
* Cada etiqueta **```<h1>```** debe tener la clase "clause": ```<h1 class="clause">```.

También es importante dónde almacenas tu archivo markdown ricardiano (en relación con tu archivo C++ del contrato inteligente). Esto depende de cómo estés compilando tu contrato.

## Usar WAX-CDT

Si usas **cdt-init** para crear una plantilla de contrato inteligente, se crea automáticamente una carpeta para ti bajo el directorio de tu proyecto (ej., wax/ricardian). Por defecto, esta carpeta no contiene una cláusula ricardiana. Necesitarás crear una, como wax.clauses.md.

Los scripts de CMake incluirán automáticamente los archivos listados en el directorio **ricardian**.

Consulta [Crear un Contrato Inteligente](/es/build/dapp-development/smart-contract-quickstart/) para más información.

## Usar cdt-cpp

Si usas cdt-cpp, tu cláusula ricardiana debe estar en el mismo directorio que wax.cpp y debe tener el mismo nombre: wax.clauses.md.

```shell
cdt-cpp -abigen wax.cpp -o wax.wasm
```

## Ejemplo de Cláusula Ricardiana

Para incluir una cláusula ricardiana:

1. Crea un archivo llamado **tu-contrato.clauses.md** (ej., wax.clauses.md).
2. Incluye la clase "clause" en la etiqueta ```<h1>```.
3. Pega el markdown a continuación en tu archivo de cláusulas.

```html
<hr style="height:1px; border:none; color:#000; background-color:#000; width:100%; text-align:left; margin: 0 auto 0 0;">

<h1 class="clause">Garantía</h1>

El invocador de la acción del contrato deberá cumplir con sus Obligaciones bajo este Contrato de manera oportuna y profesional, usando conocimiento y recomendaciones para realizar los servicios que cumplan con estándares generalmente aceptables establecidos por los Productores de Bloques de WAX.IO Blockchain.

<h1 class="clause">Incumplimiento</h1>

La ocurrencia de cualquiera de los siguientes constituirá un incumplimiento material bajo este Contrato:

<h1 class="clause">Recursos</h1>

Además de todos los demás derechos que una parte pueda tener disponibles según la ley, si una parte incumple al no realizar sustancialmente cualquier disposición, término o condición de este Contrato, la otra parte puede terminar el Contrato proporcionando notificación escrita a la parte incumplidora. Esta notificación deberá describir con suficiente detalle la naturaleza del incumplimiento. La parte que reciba dicha notificación será removida prontamente de ser un Productor de Bloques y este Contrato será terminado automáticamente.

<h1 class="clause">FuerzaMayor</h1>

Si el cumplimiento de este Contrato o cualquier obligación bajo este Contrato es prevenido, restringido o interferido por causas más allá del control razonable de cualquier parte ("Fuerza Mayor"), y si la parte incapaz de cumplir sus obligaciones da a la otra parte notificación escrita inmediata de dicho evento, entonces las obligaciones de la parte que invoca esta disposición serán suspendidas en la medida necesaria por dicho evento. El término Fuerza Mayor incluirá, sin limitación, actos de Dios, fuego, explosión, vandalismo, tormenta u otra ocurrencia similar, órdenes o actos de autoridad militar o civil, o por emergencias nacionales, insurrecciones, disturbios o guerras, o huelgas, cierres patronales, paros de trabajo o fallas de proveedores. La parte excusada deberá usar esfuerzos razonables bajo las circunstancias para evitar o remover dichas causas de no cumplimiento y procederá a cumplir con despacho razonable cuando dichas causas sean removidas o cesen. Un acto u omisión se considerará dentro del control razonable de una parte si es cometido, omitido o causado por dicha parte, o sus empleados, oficiales, agentes o afiliados.

<h1 class="clause">ResoluciónDeDisputas</h1>

Cualquier controversia o disputa que surja de o se relacione con este Contrato será resuelta por arbitraje vinculante bajo las reglas por defecto establecidas por WAX.IO Blockchain. El laudo del árbitro será final, y se puede dictar sentencia sobre él por cualquier tribunal que tenga jurisdicción apropiada.

<h1 class="clause">Acuerdo</h1>

Este Contrato contiene todo el acuerdo de las partes, y no hay otras promesas o condiciones en cualquier otro acuerdo ya sea oral o escrito concerniente al tema de este Contrato. Este Contrato reemplaza cualquier acuerdo previo escrito u oral entre las partes.

<h1 class="clause">Separabilidad</h1>

Si cualquier disposición de este Contrato se considera inválida o inaplicable por cualquier razón, las disposiciones restantes continuarán siendo válidas y aplicables. Si un tribunal encuentra que cualquier disposición de este Contrato es inválida o inaplicable, pero que al limitar dicha disposición se volvería válida y aplicable, entonces dicha disposición se considerará escrita, interpretada y aplicada como así limitada.

<h1 class="clause">Enmienda</h1>

Este Contrato puede ser modificado o enmendado por escrito por acuerdo mutuo entre las partes, si el escrito es firmado por la parte obligada bajo la enmienda.

<h1 class="clause">LeyAplicable</h1>

Este Contrato será interpretado de acuerdo con las Máximas de Equidad.

<h1 class="clause">Notificación</h1>

Cualquier notificación o comunicación requerida o permitida bajo este Contrato será suficientemente dada si se entrega a una dirección de correo electrónico verificable o a otra dirección de correo electrónico que una parte pueda haber proporcionado públicamente por escrito, o publicado en un contrato de difusión proporcionado por esta blockchain para propósitos de proporcionar notificaciones de este tipo.

<h1 class="clause">RenunciaDeDerechoContractual</h1>

El fallo de cualquier parte para hacer cumplir cualquier disposición de este Contrato no será interpretado como una renuncia o limitación del derecho de esa parte para posteriormente hacer cumplir y compeler el cumplimiento estricto de cada disposición de este Contrato.

<h1 class="clause">HonorariosDeÁrbitrosAParteVencedora</h1>

En cualquier acción que surja aquí o cualquier acción separada perteneciente a la validez de este Acuerdo, ambas partes pagarán la mitad del costo inicial de arbitraje, y la parte vencedora será adjudicada honorarios razonables de árbitros y costos.

<h1 class="clause">ConstrucciónEInterpretación</h1>

La regla que requiere construcción o interpretación contra el redactor es renunciada. El documento será considerado como si fuera redactado por ambas partes en un esfuerzo mutuo.

<h1 class="clause">EnTestimonioDeLoCual</h1>

En testimonio de lo cual, las partes aquí presentes han causado que este Acuerdo sea ejecutado por ellas mismas o sus representantes debidamente autorizados a la fecha de ejecución, y autorizado como se prueba por la firma criptográfica en la transacción que invoca este contrato.

```
