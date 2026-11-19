---
title: Autenticación del lado del servidor
order: 100
---

# Autenticación del lado del servidor

La autenticación del lado del servidor en WAX consiste en validar en el backend la identidad y las firmas generadas por la billetera, sin debilitar el modelo de firma del cliente.

## Cuándo la necesitas

- Sesiones del backend vinculadas a una cuenta.
- APIs protegidas.
- Backends de juegos y servicios de inventario.
- Pruebas de identidad que deben seguir siendo válidas más allá de una acción en el navegador.

## Regla de diseño

La verificación en el backend complementa la firma de la billetera, que se sigue realizando en el cliente.

## Verificación mediante pruebas

El patrón de verificación mediante pruebas muestra cómo validar en el servidor los datos de prueba que emite una billetera.
