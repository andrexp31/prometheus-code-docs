---
title: Política de privacidad
---
# Política de privacidad

## Sin telemetría

Prometheus Code no envía datos de uso, errores ni informes de fallos a servidores de Prometheus. La telemetría del producto se encuentra **desactivada por defecto** en todas las instalaciones.

## Datos que permanecen en tu equipo

- El historial de chat, la memoria persistente y la configuración se almacenan localmente en tu dispositivo.
- Los modelos locales se ejecutan en tu máquina. El contenido de tus conversaciones no se envía a ningún servidor de Prometheus ni de terceros.
- El catálogo de agentes y las herramientas se cargan desde archivos locales.

## Modelos remotos

Si elegís usar una sesión remota, tus mensajes se envían al proveedor que selecciones (OpenCode Free, OpenAI, Anthropic o Google Gemini), sujeto a la política de privacidad de ese proveedor. Prometheus Code no retiene ni procesa esos mensajes.

## Claves API

Las claves de API se guardan en el almacenamiento seguro del sistema (keyring) o, en el caso de OpenCode, en el archivo de autenticación del CLI local. Prometheus Code no transmite tus claves fuera de tu dispositivo, excepto para autenticar la llamada correspondiente al proveedor elegido.

## Activación de licencia

Para activar Prometheus Code se utiliza autenticación con GitHub y un identificador de hardware derivado del dispositivo. Esto permite validar que la licencia corresponde a un único dispositivo. No accedemos a tu código, conversaciones ni archivos.

## Sitio web

El sitio de documentación solo almacena una preferencia de idioma. No utiliza analíticas, cookies de terceros ni mecanismos de rastreo.

## Contacto

Si tenés preguntas sobre esta política, podés abrir una issue en [GitHub](https://github.com/andrexp31/prometheus-code-desktop/issues).