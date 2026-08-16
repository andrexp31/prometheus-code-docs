---
title: Licencia
updated: 2026-08-15
version: 1.0
---
# Licencia

**Versión 1.0 — 15 de agosto de 2026**

## Modelo de licenciamiento dual

Prometheus Code utiliza un modelo de licenciamiento dual:

- **Código fuente**: licenciado bajo la [licencia MIT](https://github.com/andrexp31/prometheus-code-desktop/blob/main/LICENSE.txt) en GitHub.
- **Binario comercial**: distribuido bajo el Acuerdo de Licencia de Usuario Final (EULA) de 2-Heads Software Solutions.

## Licencia del producto

Prometheus Code es software de **pago único**. Al adquirir una licencia obtenés el derecho a usar Prometheus Code en **un dispositivo** de forma perpetua. No hay suscripciones, no hay funciones bloqueadas y no se requiere cuenta para usarlo una vez activado.

## Qué incluye la licencia

- Instalación y uso de Prometheus Code en un dispositivo.
- Acceso a actualizaciones incluidas con la compra.
- Reinstalación en el mismo dispositivo: la activación anterior se reemplaza automáticamente.

## Restricciones

- No se permite distribuir el binario compilado.
- No se permite compartir la misma licencia entre múltiples dispositivos.
- No se permite revender, alquilar o sublicenciar el producto.
- No se permite realizar ingeniería inversa de los componentes propietarios.
- No se permite usar la marca "Prometheus Code", logotipos ni identidad visual en bifurcaciones (forks) del código MIT.

## Bifurcación (forking)

El código fuente bajo MIT puede ser libremente bifurcado, modificado y redistribuido. Sin embargo, las bifurcaciones:

- No deben usar el nombre "Prometheus Code", logotipos, marcas registradas ni elementos de identidad de marca.
- No deben incluir ni redistribuir los componentes propietarios (activos de marca, módulo de validación de licencias).
- No deben acceder a los servidores de activación de licencias de Prometheus Code.
- No tienen derecho a soporte técnico ni actualizaciones automáticas.

## Componentes propietarios

Los siguientes archivos NO están licenciados bajo MIT y se rigen exclusivamente por el EULA comercial:

1. **Identidad de marca**: `product.json`, `resources/**` (logos, iconos, pantallas de inicio)
2. **Módulo de validación de licencias** (cuando se implemente): `src/vs/platform/prometheusLicense/**`
3. **Pipeline de compilación comercial** (cuando se implemente): `build/prometheus/**`

Todos los demás archivos — incluyendo todo el código fuente, las utilidades del catálogo de agentes, la gestión de plantillas y la integración de IA — permanecen licenciados bajo MIT.

## Catálogo de agentes

Los 423 agentes especializados disponibles en Prometheus Code se obtienen del repositorio público de GitHub [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) y **no son propiedad** de 2-Heads Software Solutions. La curación, integración y experiencia de usuario dentro de Prometheus Code es una función comercial, pero las definiciones de los agentes permanecen bajo su licencia original.

## MIT

El texto completo de la licencia MIT del código fuente se encuentra en el [repositorio del proyecto](https://github.com/andrexp31/prometheus-code-desktop/blob/main/LICENSE.txt).

## EULA completo

El texto completo del Acuerdo de Licencia de Usuario Final está disponible en:

- [EULA.es.md (español)](https://github.com/andrexp31/prometheus-code-desktop/blob/main/EULA.es.md)
- [EULA.md (inglés)](https://github.com/andrexp31/prometheus-code-desktop/blob/main/EULA.md)
- [COMMERCIAL_LICENSE.es.md](https://github.com/andrexp31/prometheus-code-desktop/blob/main/COMMERCIAL_LICENSE.es.md)

## Contacto

Para consultas sobre licencias: **2-heads.comsoftware@gmail.com**

---

## Historial de cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-08-15 | Versión inicial con EULA formal, modelo dual y lista precisa de componentes propietarios |
