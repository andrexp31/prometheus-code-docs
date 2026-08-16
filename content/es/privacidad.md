---
title: Política de privacidad
updated: 2026-08-15
version: 1.0
---
# Política de privacidad

**Versión 1.0 — 15 de agosto de 2026**

## Sin telemetría

Prometheus Code no envía datos de uso, errores ni informes de fallos a servidores de 2-Heads Software Solutions. La telemetría del producto se encuentra **desactivada por defecto** en todas las instalaciones y no puede reactivarse sin acción explícita del usuario.

## Datos que permanecen en tu equipo

Los siguientes datos se almacenan **localmente** en tu dispositivo y nunca se transmiten a 2-Heads Software Solutions:

- Historial de chat y memoria de conversación
- Historial de sesiones de agentes de IA
- Preferencias y configuraciones del usuario
- Claves API (almacenadas en el almacenamiento seguro del sistema operativo / keyring)

Los **modelos locales** (por ejemplo, llama.cpp) se ejecutan íntegramente en tu máquina. El contenido de tus conversaciones no se envía a ningún servidor.

## Modelos remotos

Si elegís usar modelos remotos (OpenAI, Anthropic, Google Gemini), tus prompts y respuestas se transmiten a los servidores del proveedor seleccionado y están sujetos a su política de privacidad:

| Proveedor | Política de privacidad |
|-----------|----------------------|
| OpenAI | https://openai.com/privacy |
| Anthropic | https://www.anthropic.com/legal/privacy |
| Google Gemini | https://policies.google.com/privacy |

Prometheus Code muestra un **aviso de consentimiento** la primera vez que configuras un modelo remoto, informándote que los datos saldrán de tu dispositivo. 2-Heads Software Solutions no retiene ni procesa esos mensajes.

## Claves API

Las claves de API se guardan en el almacenamiento seguro del sistema (keyring/secret storage). Prometheus Code no transmite tus claves fuera de tu dispositivo, excepto para autenticar la llamada correspondiente al proveedor elegido.

## Activación de licencia

Para activar Prometheus Code se utiliza autenticación con GitHub y un **Hardware ID** derivado del dispositivo.

### Hardware ID

El Hardware ID es un **hash criptográfico no reversible** generado a partir de identificadores de hardware no personales (modelo de CPU, número de serie de placa base). Se utiliza únicamente para:

- Activación de licencia
- Prevención de fraude (una licencia = un dispositivo)

**No se recopila ni almacena**: datos biométricos, información de identificación personal (PII), datos de comportamiento, ni información sobre tus archivos o proyectos.

### Datos transmitidos durante la activación

Los únicos datos que se transmiten a los servidores de 2-Heads Software Solutions durante la activación son:

- Hardware ID (hash no reversible — sin PII)
- Token OAuth de GitHub (ID de usuario y email público, utilizados únicamente para verificación de licencia)

## Subprocesadores

| Proveedor | Servicio | Datos que accede |
|-----------|----------|------------------|
| OpenAI | Modelos remotos (GPT) | Prompts y respuestas |
| Anthropic | Modelos remotos (Claude) | Prompts y respuestas |
| Google | Modelos remotos (Gemini) | Prompts y respuestas |
| GitHub | OAuth para licencia | GitHub user ID, email público |
| Cloudflare | Hosting del sitio y docs | IP, logs de acceso |

## Sitio web

El sitio de documentación solo almacena una preferencia de idioma. No utiliza analíticas, cookies de terceros ni mecanismos de rastreo.

## Derechos del usuario

Podés ejercer tus derechos de privacidad (acceso, rectificación, supresión, portabilidad, oposición) contactando a **2-heads.comsoftware@gmail.com**. En particular, podés solicitar:

- La eliminación de tu registro de activación de licencia de nuestros servidores (derecho al olvido)
- Información sobre qué datos personales tenemos almacenados sobre ti
- La corrección de datos inexactos

## Menores de edad

Prometheus Code no está dirigido a menores de 13 años. No recopilamos conscientemente información de menores.

## Cambios en esta política

2-Heads Software Solutions puede modificar esta política en cualquier momento. Se notificará a los usuarios sobre cambios materiales a través del Software o del sitio web oficial. La fecha de vigencia y versión se actualizan al final del documento.

## Contacto

Para consultas sobre privacidad: **2-heads.comsoftware@gmail.com**

---

## Historial de cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-08-15 | Versión formal con Hardware ID, subprocesadores, derechos ARCO y menores |
